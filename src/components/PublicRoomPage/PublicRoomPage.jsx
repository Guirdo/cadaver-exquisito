import { useParams } from "@solidjs/router"
import { fetchPublicRoom, publicRoom } from "../../stores/public_room"
import { Match, Switch } from "solid-js"
import PublicResult from "./PublicResult"
import ChatSpace from "./ChatSpace"


export default function PublicRoomPage() {
  const params = useParams()
  fetchPublicRoom(params.id)

  return (
    <div class="[ flex-column ] [ gap-xs flex-grow ]">
      <Switch>
        <Match when={!publicRoom.finished}>
          <ChatSpace />
        </Match>
        <Match when={publicRoom.finished}>
          <PublicResult />
        </Match>
      </Switch>
    </div>
  )
}