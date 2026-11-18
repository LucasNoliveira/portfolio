import type { Locale } from './locales';

/** Strings for the 404 page. Kept apart from the main dictionaries so the page, which is a client component, stays small. */
export const NOT_FOUND: Record<Locale, { title: string; text: string; home: string }> = {
  en: { title: 'Page not found', text: 'The page you are looking for does not exist or has moved.', home: 'Back to the home page' },
  pt: { title: 'Página não encontrada', text: 'A página que você procura não existe ou mudou de endereço.', home: 'Voltar para a página inicial' },
  es: { title: 'Página no encontrada', text: 'La página que buscas no existe o ha cambiado de dirección.', home: 'Volver al inicio' },
  ja: { title: 'ページが見つかりません', text: 'お探しのページは存在しないか、移動した可能性があります。', home: 'トップページへ戻る' },
};
