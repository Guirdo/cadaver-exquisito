import { createI18nContext } from "@solid-primitives/i18n";
import es from './locale/es'
import en from './locale/en'

const dict = {
  es, en
}

export const i18nContext = createI18nContext(dict, 'es')
