import { Match, Switch } from "solid-js";
import { useParams } from "@solidjs/router";
import { room, fetchRoom, subscribeToRoomChanges } from "../../stores/room";
import { lazy } from 'solid-js'

const WaitingRoom = lazy(() => import('./WaitingRoom/WaitingRoom'))
const ChatRoom = lazy(() => import('./ChatRoom/ChatRoom'))

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
      </Switch>
    </>
  )
}

export default function Playground() {
  const params = useParams()
  fetchRoom(params.id)
  subscribeToRoomChanges()

  return (
    <div class="[ playground ] [ flex-column ] [ flex-grow gap-lg p-sm align-items-center ]">
      <StatusSwitcher />
    </div>
  )
}