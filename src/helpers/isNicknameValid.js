import isEmpty from "validator/es/lib/isEmpty"
import isAlphanumeric from "validator/es/lib/isAlphanumeric"
import { setErrorMessage } from '../stores/error'
import { user } from "../stores/user"

export default function isNicknameValid() {
  if (isEmpty(user.nickname)) {
    setErrorMessage('emptyNickname')
    return false
  } else if (!isAlphanumeric(user.nickname)) {
    setErrorMessage('alphanumNickname')
    return false
  }

  return true
}