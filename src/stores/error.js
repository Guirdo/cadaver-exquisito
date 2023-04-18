import { createStore } from "solid-js/store";

const initialState = {
  message: '',
  isDisplayed: false
}

export const [ error, setError ] = createStore(initialState)

export function setErrorMessage(message) {
  setError({
    message,
    isDisplayed: true
  })
}

export function clearError() {
  setError({
    message: '',
    isDisplayed: false
  })
}