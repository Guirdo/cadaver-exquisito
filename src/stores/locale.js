import { createLocalStore } from "../utils/createLocalStore"

const initialState = {
  lang: 'es'
}

export const [locale, setLocale] = createLocalStore('locale',initialState)