import { For, createEffect, createMemo } from "solid-js"
import { room } from "../../../stores/room"
import { user } from "../../../stores/user"
import { useI18n } from "@solid-primitives/i18n"

function MessageBox(props) {
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
  const [t] = useI18n()

  const currentRound = createMemo(() => {
    return Math.floor(room.messages.length / room.players.length) + 1
  })

  createEffect(() => room.messages.length && window.scrollTo(0,document.body.scrollHeight))

  return (
    <div class="[ flex-column ] [ gap-xs flex-grow-2 ]">
      <h3 class="pos-sticky inset-0 bg-white p-xs">
        {t('chatRoom.roundXOfY', { current: currentRound(), total: room.rounds })}
      </h3>
      <For each={room.messages}>
        {(message, index) => {
          if ((index() + 1) % room.players.length === 0) {
            return (
              <>
                <MessageBox index={index()} message={message} />
                <hr />
              </>
            )
          } else {
            return <MessageBox index={index()} message={message} />
          }

        }}
      </For>
    </div>
  )
}