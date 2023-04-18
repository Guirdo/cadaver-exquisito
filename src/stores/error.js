import { createStore } from "solid-js/store";

const initialState = {
  code: '',
  isDisplayed: false
}

export const [ error, setError ] = createStore(initialState)

export function setErrorMessage(code) {
  setError({
    code: code,
    isDisplayed: true
  })
}

export function clearError() {
  setError({
    code: '',
    isDisplayed: false
  })
}