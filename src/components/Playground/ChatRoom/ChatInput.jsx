import { createEffect, createSignal } from "solid-js"
import { room, sendMessage } from "../../../stores/room"
import { user, setUser } from "../../../stores/user"
import { isMessageValid, sanitizeText } from "./ChatInput.helper"
import { useI18n } from "@solid-primitives/i18n"
import playSound from "../../../helpers/playSound"

export default function ChatInput() {
  const [t] = useI18n()
  const [message, setMessage] = createSignal('')
  const [charCount, setCharCount] = createSignal(0)
  const [enable, setEnable] = createSignal(false)
  const playerTurn = room.players.findIndex(p => p.id === user.id)
  const charLimit = 70;

  createEffect(() => {
    let isPlayerTurn = room.messages.length % room.playersLimit === playerTurn
    setUser('allowedToWrite', isPlayerTurn)
    playSound(isPlayerTurn)
  })

  const handleInput = (e) => {
    const input = e.target.value
    setMessage(input)
    setCharCount(input.length)

    if (input.length > charLimit || input.length === 0) {
      setEnable(false)
    } else {
      setEnable(true)
    }
  }

  const isDisabled = () => {
    return user.allowedToWrite && enable() ? false : true
  }

  const handleSend = (e) => {
    e.preventDefault()
    const sanitizedText = sanitizeText(message())

    if (isMessageValid(sanitizedText)) {
      sendMessage(sanitizedText)
    }

    setMessage('')
    setCharCount(0)
  }

  return (
    <form class="[ flex-column ] [ gap-xs ]">
      <Show when={user.allowedToWrite}>
        <span class="fw-bold color-success">{t('chatRoom.yourTurn')}</span>
      </Show>
      <div class="[ flex-row ] [ gap-xs ]">
        <textarea
          class="flex-grow"
          rows={3}
          value={message()}
          disabled={!user.allowedToWrite}
          onInput={handleInput}
        />

        <div class="[ flex-column ] [ justify-content-between gap-xs ]">
          <button
            class="button"
            data-type="success"
            type="submit"
            onClick={handleSend}
            disabled={isDisabled()}
          >
            {t('chatRoom.send')}
          </button>
          <span
            class={isDisabled() ? 'color-primary' : 'color-success'}
          >
            {charCount()}/{charLimit}
          </span>
        </div>
      </div>
    </form>
  )
}