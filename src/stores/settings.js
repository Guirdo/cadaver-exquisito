import { createLocalStore } from "../utils/createLocalStore";

const initialState = {
  muteSound: false,
  theme: 'light',
  lang: 'es'
}

export const [settings,setSettings] = createLocalStore('settings',initialState)