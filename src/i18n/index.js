import { flatten, translator } from "@solid-primitives/i18n";
import es from './locale/es'
import en from './locale/en'
import { settings } from "../stores/settings";
import { createMemo } from "solid-js";

const dictionaries = {
  es, en
}

const dict = createMemo(() => flatten(dictionaries[settings.lang]))

export const t = translator(dict)
