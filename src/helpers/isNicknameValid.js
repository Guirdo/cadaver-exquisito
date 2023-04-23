import isEmpty from "validator/es/lib/isEmpty"
import isAlphanumeric from "validator/es/lib/isAlphanumeric"
import isLength from "validator/es/lib/isLength"
import { setErrorMessage } from '../stores/error'
import { user } from "../stores/user"

export default function isNicknameValid() {
  if (isEmpty(user.nickname)) {
    setErrorMessage('emptyNickname')
    return false
  } else if (!isAlphanumeric(user.nickname)) {
    setErrorMessage('alphanumNickname')
    return false
  } else if (!isLength(user.nickname, {min:2, max:20})){
    setErrorMessage('lengthNickname')
    return false
  }

  return true
}