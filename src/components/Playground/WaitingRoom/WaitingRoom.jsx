import OwnerWaitingRoom from "./OwnerWaitingRoom";
import GuestWaitingRoom from "./GuestWaitingRoom"
import { room } from "../../../stores/room";
import { user } from '../../../stores/user'

function isOwner() {
  return room.players.findIndex(p => p.id === user.id) === 0
}

export default function WaitingRoom() {
  return (
    <Switch fallback={<p>Cargando...</p>}>
      <Match when={isOwner()}>
        <OwnerWaitingRoom />
      </Match>
      <Match when={!isOwner()}>
        <GuestWaitingRoom />
      </Match>
    </Switch>
  )
}
