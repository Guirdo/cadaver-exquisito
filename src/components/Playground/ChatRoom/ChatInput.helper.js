import DOMPurify from 'dompurify'
import isEmpty from "validator/es/lib/isEmpty"
import { setErrorMessage } from '../../../stores/error'

export default function isMessageValid(message) {
  const sanitizedText = sanitizeText(message)

  if(isEmpty(sanitizedText)) {
    setErrorMessage('Has dejado el campo vació o has ingresado un mensaje invalido')
    return false
  }
  
  return true
}

function sanitizeText(text) {
  return DOMPurify.sanitize(text,{
    ALLOWED_TAGS: []
  })
}