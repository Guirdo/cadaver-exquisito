import { createStore } from "solid-js/store"
import { createEffect } from "solid-js"

export function createLocalStore( name, init ){
  const localState = localStorage.getItem(name)
  const [state, setState] = createStore(
    localState ? JSON.parse(localState) : init
  )
  createEffect(() => localStorage.setItem(name, JSON.stringify(state)))
  return [state, setState]
}
