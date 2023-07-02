import DOMPurify from 'dompurify'
import isEmpty from "validator/es/lib/isEmpty"
import { setErrorMessage } from '../../../stores/error'

const urlRegex = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/g

function contains(text) {
  const matches = urlRegex.exec(text)
  return matches && matches.length > 0
}

export function isMessageValid(message) {
  if (isEmpty(message)) {
    setErrorMessage('invalidMessage')
    return false
  } else if (contains(message)) {
    setErrorMessage('invalidMessage')
    return false
  }

  return true
}

export function sanitizeText(text) {
  return DOMPurify.sanitize(text, {
    ALLOWED_TAGS: []
  })
}