import { createEffect, createSignal } from "solid-js"
import { room, sendMessage } from "../../../stores/room"
import { user, setUser } from "../../../stores/user"
import { settings } from "../../../stores/settings"
import playSound from "../../../helpers/playSound"
import { t } from '../../../i18n'
import { isMessageValid, sanitizeText } from "../../../helpers/sanitizeText"

export default function ChatInput() {
  const [message, setMessage] = createSignal('')
  const [charCount, setCharCount] = createSignal(0)
  const [enable, setEnable] = createSignal(false)
  const playerTurn = room.players.findIndex(p => p.id === user.id)
  const charLimit = 70;

  createEffect(() => {
    let isPlayerTurn = room.messages.length % room.playersLimit === playerTurn
    setUser('allowedToWrite', isPlayerTurn)
    !settings.muteSound && playSound(isPlayerTurn)
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
            class={`${isDisabled() ? 'color-danger' : 'color-success'} fw-bold`}
          >
            {charCount()}/{charLimit}
          </span>
        </div>
      </div>
    </form>
  )
}