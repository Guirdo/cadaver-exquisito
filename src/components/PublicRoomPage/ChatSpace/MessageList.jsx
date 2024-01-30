import { For, createEffect } from "solid-js"
import { publicRoom } from "../../../stores/public_room"
import MessageBox from "./MessageBox"
import { t } from '../../../i18n'

export default function MessageList() {
  createEffect(() => publicRoom.messages.length && window.scrollTo(0, document.body.scrollHeight))

  return (
    <div class="[ flex-column ] [ gap-xs flex-grow-2 ]">
      <For each={publicRoom.messages} fallback={<p>Write the first message</p>}>
        {(message, index) => (
          <MessageBox index={index()} userId={message.userId} message={message.message} />
        )}
      </For>
    </div>
  )
}