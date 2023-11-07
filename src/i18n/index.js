import { createI18nContext } from "@solid-primitives/i18n";
import es from './locale/es'
import en from './locale/en'
import { settings } from "../stores/settings";

const dict = {
  es, en
}

export const i18nContext = createI18nContext(dict, settings.lang)
