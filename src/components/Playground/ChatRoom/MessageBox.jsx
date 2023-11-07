import { room } from "../../../stores/room"
import { user } from "../../../stores/user"

export default function MessageBox(props) {
  const playerTurn = room.players.findIndex(p => p.id === user.id)
  const isUserMessage = () => {
    return props.index % room.players.length === playerTurn
  }

  return (
    <div
      class={
        `[ ${isUserMessage() ? 'flex-row-reverse' : 'flex-row'} ]
          [ gap-xs align-items-center ]`
      }
    >
      <img
        src="/icons/skull.webp"
        width="40"
        height="40"
      />

      <div
        class={`
          ${isUserMessage() ? 'bg-info color-white' : 'bg-secondary'}
          flex-grow p-xs no-theme-color
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