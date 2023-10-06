import { createLocalStore } from "../utils/createLocalStore";

const initialState = {
  muteSound: false,
  theme: 'light'
}

export const [settings,setSettings] = createLocalStore('settings',initialState)