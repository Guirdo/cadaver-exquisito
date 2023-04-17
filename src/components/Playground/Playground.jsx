import { Match, Switch } from "solid-js";
import { useParams } from "@solidjs/router";
import WaitingRoom from "./WaitingRoom/WaitingRoom";
import { room, fetchRoom, subscribeToRoomChanges } from "../../stores/room";
import ChatRoom from "./ChatRoom/ChatRoom";
import Result from "./Result/Result";

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
  const params = useParams();
  fetchRoom(params.id)

  if (room.status < 2) {
    subscribeToRoomChanges()
  }

  return (
    <div class="[ flex-column ] [ gap-lg p-md align-items-center ]">
      <StatusSwitcher />
    </div>
  )
}