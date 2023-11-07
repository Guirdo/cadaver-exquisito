import { lazy } from "solid-js"
import { Route, Routes } from "@solidjs/router"
import isUUID from 'validator/es/lib/isUUID'
import Playground from "../components/Playground"

const HomePage = lazy(() => import('../components/HomePage'))
const NotFoundPage = lazy(() => import('../components/NotFoundPage'))

const playgroundRouteFilter = {
  id: (id) => isUUID(id,4)
}

export default function Router() {
  return (
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
        element={NotFoundPage}
      />
    </Routes>
  )
}
