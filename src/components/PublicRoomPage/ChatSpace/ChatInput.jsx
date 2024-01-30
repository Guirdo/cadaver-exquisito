import { Match, Switch, createSignal } from "solid-js";
import { setUser, user } from "../../../stores/user";
import { publicRoom, sendMessage } from "../../../stores/public_room";
import { createEffect } from "solid-js";
import { settings } from "../../../stores/settings";
import { isMessageValid, sanitizeText } from "../../Playground/ChatRoom/ChatInput.helper";
import playSound from "../../../helpers/playSound";
import { t } from '../../../i18n'
import InvitationLink from "./InvitationLink";

export function ChatInput() {
  const [message, setMessage] = createSignal('')
  const [charCount, setCharCount] = createSignal(0)
  const [enable, setEnable] = createSignal(false)
  const [userFound, setUserFound] = createSignal(false)
  const charLimit = 70;

  createEffect(() => {
    publicRoom.players.findIndex(p => p.id === user.id) !== -1
      ? setUserFound(true)
      : setUserFound(false)
  })

  createEffect(() => {
    const playerTurn = publicRoom.players.findIndex(p => p.id === user.id)
    let isPlayerTurn = false

    if (!userFound()) {
      isPlayerTurn = true
    } else {
      if (publicRoom.messages?.length === 1 && publicRoom.players.length === 1) {
        isPlayerTurn = false
      } else {
        isPlayerTurn = publicRoom.messages.length % publicRoom.players.length === playerTurn
      }
    }

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
      if (!userFound()) {
        sendMessage(user.id, sanitizedText, user.nickname)
      } else {
        sendMessage(user.id, sanitizedText)
      }
    }

    setMessage('')
    setCharCount(0)
  }

  return (
    <>
      <Switch>
        <Match when={user.allowedToWrite}>
          <form class="[ flex-column ] [ gap-xs ]">
            <span class="fw-bold color-success">{t('chatRoom.yourTurn')}</span>
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

        </Match>
        <Match when={!user.allowedToWrite}>
          <InvitationLink />
        </Match>
      </Switch>

    </>
  )
}