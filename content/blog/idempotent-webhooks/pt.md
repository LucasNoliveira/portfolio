---
title: Como tornar handlers de webhook idempotentes no Django [post teste]
description: Provedores reenviam webhooks, então seu handler vai receber o mesmo evento duas vezes. Uma constraint única, uma transação curta e uma task em background resolvem isso.
date: 2026-11-18
tags: [django, webhooks, python]
---

Quase todo provedor de webhook promete entrega "pelo menos uma vez". Se o seu endpoint demora, devolve um 500 ou estoura o tempo limite, o provedor manda o mesmo evento de novo. O seu handler vai receber duplicatas, e se ele criar um pedido ou enviar um e-mail a cada chamada, os usuários vão perceber.

A solução é tornar o handler **idempotente**: tratar o mesmo evento duas vezes tem o mesmo efeito de tratá-lo uma vez. Aqui está um padrão pequeno que funciona bem no Django.

## Guarde o evento primeiro, com uma chave única

A maioria dos provedores envia um id de evento estável. Salve-o antes de fazer qualquer trabalho e deixe o banco recusar duplicatas.

```python
from django.db import models


class WebhookEvent(models.Model):
    provider = models.CharField(max_length=50)
    event_id = models.CharField(max_length=255)
    payload = models.JSONField()
    received_at = models.DateTimeField(auto_now_add=True)
    processed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["provider", "event_id"],
                name="uniq_webhook_provider_event",
            )
        ]
```

A constraint única é a ferramenta certa aqui. Checar com `exists()` e depois inserir é uma condição de corrida: duas entregas simultâneas podem passar pela checagem ao mesmo tempo.

## Confirme rápido, trabalhe depois

A view só valida, guarda e enfileira. A parte lenta roda em uma task em background, então o provedor recebe a resposta logo e para de reenviar.

```python
import json

from django.db import IntegrityError, transaction
from django.http import HttpResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from .models import WebhookEvent
from .tasks import handle_event


@csrf_exempt
@require_POST
def crm_webhook(request):
    # Verifique a assinatura do provedor aqui, antes de confiar em qualquer dado.
    try:
        payload = json.loads(request.body)
        event_id = str(payload["id"])
    except (ValueError, KeyError):
        return HttpResponseBadRequest("invalid payload")

    try:
        with transaction.atomic():
            event = WebhookEvent.objects.create(
                provider="crm", event_id=event_id, payload=payload
            )
            transaction.on_commit(lambda: handle_event.delay(event.pk))
    except IntegrityError:
        return HttpResponse(status=200)  # duplicata: já recebemos

    return HttpResponse(status=202)
```

Dois detalhes importam. O `IntegrityError` é capturado **fora** do bloco `atomic()`, para o insert que falhou ser desfeito sem sujeira. E a task é enfileirada com `on_commit`, para o worker nunca procurar uma linha que ainda não foi confirmada.

Uma duplicata recebe `200`, não um erro: do ponto de vista do provedor a entrega deu certo, e um erro só causaria mais reenvios.

## Faça a task segura para repetir

Workers também podem cair ou tentar de novo, então a task confere o próprio estado com um lock na linha.

```python
from celery import shared_task
from django.db import transaction
from django.utils import timezone

from .models import WebhookEvent


@shared_task(bind=True, max_retries=5)
def handle_event(self, event_pk):
    with transaction.atomic():
        event = WebhookEvent.objects.select_for_update().get(pk=event_pk)
        if event.processed_at:
            return  # uma execução anterior já terminou
        apply_business_logic(event.payload)
        event.processed_at = timezone.now()
        event.save(update_fields=["processed_at"])
```

Se `apply_business_logic` lançar uma exceção, a transação é desfeita, `processed_at` continua vazio e a nova tentativa começa de um estado limpo.

## Teste a duplicata

O comportamento que importa cabe em poucas linhas:

```python
import pytest

from .models import WebhookEvent


@pytest.mark.django_db
def test_duplicate_delivery_is_ignored(client):
    body = {"id": "evt_1", "type": "lead.created"}

    first = client.post("/webhooks/crm/", body, content_type="application/json")
    second = client.post("/webhooks/crm/", body, content_type="application/json")

    assert first.status_code == 202
    assert second.status_code == 200
    assert WebhookEvent.objects.count() == 1
```

## O que isso não cobre

- **Ordem.** Provedores raramente garantem a ordem. Se um "updated" puder chegar antes do "created", compare timestamps ou versões dentro do handler.
- **Eventos travados.** Se a fila perder uma task, a linha fica sem processar. Um job periódico que reenfileira eventos mais antigos que alguns minutos fecha essa brecha.
- **Retenção.** Linhas antigas podem ser apagadas depois que a janela de reenvio do provedor passar.

Guardar o evento antes de qualquer outra coisa dá três benefícios de uma vez: eliminação de duplicatas, uma trilha de auditoria e a possibilidade de reprocessar uma entrega que falhou.
