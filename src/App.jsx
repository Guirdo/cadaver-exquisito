import { Show } from "solid-js";
import { Route, Routes } from "@solidjs/router";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar";
import Playground from "./components/Playground/Playground";
import Footer from "./components/Footer";
import ErrorModal from './components/ErrorModal'
import { error } from "./stores/error";
import { validate } from "uuid";
import { room } from "./stores/room";

const playgroundRouteFilter = {
  id: (id) => validate(id)
}

export default function App() {
  return (
    <div class="[ flex-column ] [ min-hv-100 ]">
      <header>
        <Navbar />
      </header>
      <main class="[ flex-column ] [ align-items-center flex-grow-2 ]">
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
            element={<p class="text-align-center mblock-auto">Esta página no existe </p>}
          />
        </Routes>
      </main>
      <Show when={room.status !== 1}>
        <Footer />
      </Show>
      <Show when={error.isDisplayed}>
        <ErrorModal />
      </Show>
    </div>
  )
}
