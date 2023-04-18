import { For } from "solid-js"
import { room } from "../../../stores/room"
import { user } from "../../../stores/user"

function MessageBox(props) {
  const playerTurn = room.players.findIndex(p => p.id === user.id)
  const isUserMessage = () => {
    return props.index % room.players.length === playerTurn
  }

  return (
    <div
      class={
        `${isUserMessage() ? 'flex-row-reverse' : 'flex-row'}
          gap-xs align-items-center`
      }
    >
      <img
        src="/skull.webp"
        width="40"
        height="40"
      />

      <div
        class={`
          ${isUserMessage() ? 'bg-blue' : 'bg-gray'}
          flex-grow p-xs
        `}
      >
        {props.index + 1 === room.messages.length && user.allowedToWrite ?
          props.message :
          '...'
        }
      </div>
    </div>
  )
}

export default function MessageList() {
  return (
    <div class="flex-column gap-xs flex-grow-2">
      <For each={room.messages}>
        {(message, index) => (<MessageBox index={index()} message={message} />)}
      </For>
    </div>
  )
}