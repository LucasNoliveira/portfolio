import { en } from './en';
import { es } from './es';
import { ja } from './ja';
import { pt } from './pt';
import type { Dictionary } from './types';
import type { Locale } from './locales';

export const dictionaries: Record<Locale, Dictionary> = { en, pt, es, ja };
