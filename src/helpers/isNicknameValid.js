import validator from "validator"
import { setErrorMessage } from '../stores/error'
import { user } from "../stores/user"

export default function isNicknameValid() {
  if (validator.isEmpty(user.nickname)) {
    setErrorMessage('emptyNickname')
    return false
  } else if (!validator.isAlphanumeric(user.nickname)) {
    setErrorMessage('alphanumNickname')
    return false
  }

  return true
}