import { createLocalStore } from "../components/utils/createLocalStore";

const initialState = {
  nickname: 'MuertadoLopez'
}

export const [user,setUser] = createLocalStore('user',initialState)

