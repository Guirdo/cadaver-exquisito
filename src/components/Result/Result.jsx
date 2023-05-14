import { useParams } from "@solidjs/router";
import { Show, createResource, lazy } from "solid-js";
import { fetchResult } from "./Result.helper";

const PlayerList = lazy(() => import('./PlayerList'))
const MessageList = lazy(() => import('./MessageList'))

export default function Result() {
  const params = useParams()
  const [room] = createResource(params.id, fetchResult)

  return (
    <div class="[ playground ] [ flex-column ] [ flex-grow gap-lg p-sm align-items-center ]">
      <Show
        when={room.state === 'ready'}
        fallback={<span>Loading...</span>}
      >
        <MessageList messages={room().messages} />

        <PlayerList players={room().players}/>
      </Show>
    </div>
  )
}
