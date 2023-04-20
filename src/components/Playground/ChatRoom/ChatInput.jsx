import { createEffect, createSignal } from "solid-js"
import { room, sendMessage } from "../../../stores/room"
import { user, setUser } from "../../../stores/user"
import isMessageValid from "./ChatInput.helper"
import { useI18n } from "@solid-primitives/i18n"

export default function ChatInput() {
  const [ t ] = useI18n()
  const [message, setMessage] = createSignal('')
  const playerTurn = room.players.findIndex(p => p.id === user.id)
  
  createEffect(() => {
    setUser('allowedToWrite',room.messages.length % room.playersLimit === playerTurn)
  })

  const handleSend = (e) => {
    e.preventDefault()

    if(isMessageValid(message())){
      sendMessage(message())
      setMessage('')
    }
  }

  return(
    <form class="flex-row gap-xs">
      <textarea
        rows={3}
        value={message()}
        disabled={!user.allowedToWrite}
        onInput={(e) => setMessage(e.target.value)}
      />

      <button
        class="button"
        data-type="success"
        type="submit"
        onClick={handleSend}
        disabled={!user.allowedToWrite}
      >
        {t('chatRoom.send')}
      </button>
    </form>
  )
}