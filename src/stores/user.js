import { createLocalStore } from "../utils/createLocalStore";

const initialState = {
  id: crypto.randomUUID(),
  nickname: 'MuertadoLopez',
  allowedToWrite: false,
  isOwner: false
}

export const [user,setUser] = createLocalStore('user',initialState)
