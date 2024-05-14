import { Match, Switch } from "solid-js";
import { useParams } from "@solidjs/router";
import { room, fetchRoom } from "../../stores/room";
import { lazy } from 'solid-js'

const WaitingRoom = lazy(() => import('./WaitingRoom/WaitingRoom'))
const ChatRoom = lazy(() => import('./ChatRoom/ChatRoom'))
const Result = lazy(() => import('./Result'))

function StatusSwitcher() {
  return (
    <>
      <Switch
        fallback={<p>Cargando...</p>}
      >
        <Match when={room.status === 0}>
          <WaitingRoom />
        </Match>

        <Match when={room.status === 1}>
          <ChatRoom />
        </Match>

        <Match when={room.status === 2}>
          <Result />
        </Match>
      </Switch>
    </>
  )
}

export default function Playground() {
  const params = useParams()
  fetchRoom(params.id)

  return (
    <div class="[ playground ] [ flex-column ] [ flex-grow w-100 gap-lg p-sm align-items-center ]">
      <StatusSwitcher />
    </div>
  )
}