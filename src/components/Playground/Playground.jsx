import { Match, Switch } from "solid-js";
import { useParams } from "@solidjs/router";
import WaitingRoom from "./WaitingRoom/WaitingRoom";
import { room, fetchRoom, subscribeToRoomChanges } from "../../stores/room";

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
          <p>El juego a comenzado</p>
        </Match>
      </Switch>
    </>
  )
}

export default function Playground() {
  const params = useParams();
  fetchRoom(params.id)
  subscribeToRoomChanges()

  return (
    <div class="[ flex-column ] [ gap-lg p-md align-items-center ]">
      <StatusSwitcher />
    </div>
  )
}