import { publicRoom } from "../../../stores/public_room"
import { user } from "../../../stores/user"

export default function MessageBox(props) {
  const isUserMessage = () => {
    return props.userId === user.id
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
        {props.index + 1 === publicRoom.messages.length && user.allowedToWrite ?
          props.message :
          '...'
        }
      </div>
    </div>
  )
}