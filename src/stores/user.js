import { createLocalStore } from "../utils/createLocalStore";
import { v4 as uuidv4 } from 'uuid'

const initialState = {
  id: uuidv4(),
  nickname: 'MuertadoLopez',
  allowedToWrite: false,
  isOwner: false
}

export const [user,setUser] = createLocalStore('user',initialState)
