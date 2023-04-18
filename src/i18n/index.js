import { createI18nContext } from "@solid-primitives/i18n";
import es from './locale/es'
import en from './locale/en'
import { locale } from "../stores/locale";

const dict = {
  es, en
}

export const i18nContext = createI18nContext(dict, locale.lang)
