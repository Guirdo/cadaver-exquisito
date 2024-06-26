import { For, createEffect, createMemo } from "solid-js"
import { room } from "../../../stores/room"
import { t } from '../../../i18n'
import MessageBox from "./MessageBox"

export default function MessageList() {
  const currentRound = createMemo(() => {
    return Math.floor(room.messages.length / room.players.length) + 1
  })

  createEffect(() => room.messages.length && window.scrollTo(0,document.body.scrollHeight))

  return (
    <div class="[ flex-column ] [ gap-xs flex-grow-2 ]">
      <div class="[ flex-row ] [ justify-content-between bg-theme align-items-center pos-sticky inset-0 p-xs ]">
        <h3>
          {t('chatRoom.roundXOfY', { current: currentRound(), total: room.rounds })}
        </h3>
      </div>
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