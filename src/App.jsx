import { Show, createEffect, onMount } from "solid-js";
import { error } from "./stores/error";
import { lazy } from "solid-js";
import { room } from "./stores/room";
import { ui } from "./stores/ui";
import { settings } from "./stores/settings";
import Router from "./router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const ErrorModal = lazy(() => import('./components/Modal/ErrorModal'))
const SettingsModal = lazy(() => import('./components/Modal/SettingsModal'))

export default function App() {
  onMount(() => {
    document.documentElement.setAttribute("lang", settings.lang)
    document.documentElement.className = settings.theme
  })

  createEffect(() => document.documentElement.className = settings.theme)

  return (
    <div class="[ flex-column ] [ min-hv-100 ]">
      <header>
        <Navbar />
      </header>
      <main class={`[ flex-column ] [ align-items-center flex-grow-2 ${settings.theme} ]`}>
        <Router />
      </main>
      <Show when={room.status !== 1}>
        <Footer />
      </Show>
      <Show when={error.isDisplayed}>
        <ErrorModal />
      </Show>
      <Show when={ui.openSettings}>
        <SettingsModal />
      </Show>
    </div>
  )
}
