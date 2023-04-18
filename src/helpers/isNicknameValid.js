import validator from "validator"
import { setErrorMessage } from '../stores/error'
import { user } from "../stores/user"

export default function isNicknameValid() {
  if (validator.isEmpty(user.nickname)) {
    setErrorMessage('No ingresaste un apodo para jugar')
    return false
  } else if (!validator.isAlphanumeric(user.nickname)) {
    setErrorMessage('Tu apodo solo debe tener caracteres alfanuméricos')
    return false
  }

  return true
}