---
title: Making webhook handlers idempotent in Django [test post]
description: Providers retry webhooks, so your handler will see the same event twice. A unique constraint, a short transaction and a background task make that harmless.
date: 2026-11-18
tags: [django, webhooks, python]
---

Almost every webhook provider promises "at least once" delivery. If your endpoint is slow, returns a 500 or times out, the provider sends the same event again. Your handler will see duplicates, and if it creates an order or sends an e-mail each time, your users will notice.

The fix is to make the handler **idempotent**: handling the same event twice has the same effect as handling it once. Here is a small pattern that works well in Django.

## Store the event first, with a unique key

Most providers send a stable event id. Save it before doing any work, and let the database refuse duplicates.

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

A unique constraint is the right tool here. Checking with `exists()` and then inserting is a race: 2 deliveries arriving together can both pass the check.

## Acknowledge fast, work later

The view only validates, stores and enqueues. The slow part runs in a background task, so the provider gets its answer quickly and stops retrying.

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
    # Verify the provider's signature here, before trusting anything.
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
        return HttpResponse(status=200)  # duplicate: already received

    return HttpResponse(status=202)
```

2 details matter. The `IntegrityError` is caught **outside** the `atomic()` block, so the failed insert rolls back cleanly. And the task is queued with `on_commit`, so a worker never looks for a row that is not committed yet.

A duplicate gets a `200`, not an error: from the provider's point of view the delivery succeeded, and an error would only trigger more retries.

## Make the task safe to repeat

Workers can crash or retry too, so the task checks its own state under a row lock.

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
            return  # a previous run already finished
        apply_business_logic(event.payload)
        event.processed_at = timezone.now()
        event.save(update_fields=["processed_at"])
```

If `apply_business_logic` raises, the transaction rolls back, `processed_at` stays empty and the retry starts from a clean state.

## Test the duplicate

The behaviour you care about fits in a few lines:

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

## What this does not cover

- **Ordering.** Providers rarely guarantee order. If "updated" can arrive before "created", compare timestamps or versions inside the handler.
- **Stuck events.** If the queue loses a task, a row stays unprocessed. A periodic job that re-queues events older than a few minutes closes that gap.
- **Retention.** Old rows can be deleted once the provider's retry window has passed.

Storing the event before touching anything else gives you 3 things at once: de-duplication, an audit trail and a way to replay a failed delivery.
