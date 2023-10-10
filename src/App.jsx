import { Show, createEffect, onMount } from "solid-js";
import { Route, Routes } from "@solidjs/router";
import Navbar from "./components/Navbar";
import Playground from "./components/Playground";
import Footer from "./components/Footer";
import { error } from "./stores/error";
import isUUID from 'validator/es/lib/isUUID'
import { room } from "./stores/room";
import { locale } from "./stores/locale";
import { lazy } from "solid-js";
import { useI18n } from "@solid-primitives/i18n";
import { ui } from "./stores/ui";
import { settings } from "./stores/settings";

const HomePage = lazy(() => import('./components/HomePage/HomePage'))
const ErrorModal = lazy(() => import('./components/Modal/ErrorModal'))
const SettingsModal = lazy(() => import('./components/Modal/SettingsModal'))

const playgroundRouteFilter = {
  id: (id) => isUUID(id,4)
}

export default function App() {
  const [t] = useI18n()
  onMount(() => {
    document.documentElement.setAttribute("lang", locale.lang)
    document.documentElement.className = settings.theme
  })

  createEffect(() => document.documentElement.className = settings.theme)

  return (
    <div class="[ flex-column ] [ min-hv-100 ]">
      <header>
        <Navbar />
      </header>
      <main class={`[ flex-column ] [ align-items-center flex-grow-2 ${settings.theme} ]`}>
        <Routes>
          <Route
            path="/"
            element={HomePage}
          />
          <Route
            path="/:id"
            element={Playground}
            matchFilters={playgroundRouteFilter}
          />
          <Route
            path="*"
            element={<p class="text-align-center mblock-auto">{t('error.pageNotFound')}</p>}
          />
        </Routes>
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
