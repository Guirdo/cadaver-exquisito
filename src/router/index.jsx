import { lazy } from "solid-js"
import { Route } from "@solidjs/router"
import isUUID from 'validator/es/lib/isUUID'
import Playground from "../components/Playground"

const HomePage = lazy(() => import('../components/HomePage'))
const NotFoundPage = lazy(() => import('../components/NotFoundPage'))
const PublicRoomPage = lazy(() => import('../components/PublicRoomPage'))

const playgroundRouteFilter = {
  id: (id) => isUUID(id,4)
}

export default function AppRouter() {
  return (
    <>
      <Route
        path="/"
        component={HomePage}
      />
      <Route
        path="/:id"
        component={Playground}
        matchFilters={playgroundRouteFilter}
      />
      <Route
        path="/p/:id"
        component={PublicRoomPage}
        matchFilters={playgroundRouteFilter}
      />
      <Route
        path="*404"
        component={NotFoundPage}
      />
    </>
  )
}
