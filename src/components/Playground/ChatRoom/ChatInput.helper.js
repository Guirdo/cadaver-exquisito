import DOMPurify from 'dompurify'
import isEmpty from "validator/es/lib/isEmpty"
import { setErrorMessage } from '../../../stores/error'

export function isMessageValid(message) {
  if(isEmpty(message)) {
    setErrorMessage('invalidMessage')
    return false
  }
  
  return true
}

export function sanitizeText(text) {
  return DOMPurify.sanitize(text,{
    ALLOWED_TAGS: []
  })
}