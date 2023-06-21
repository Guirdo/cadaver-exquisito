import { createLocalStore } from "../utils/createLocalStore";

const initialState = {
  id: crypto.randomUUID(),
  nickname: 'FlacoLopez',
  allowedToWrite: false,
  isOwner: false,
  allowSound: true
}

export const [user,setUser] = createLocalStore('user',initialState)
