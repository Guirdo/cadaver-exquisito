import { publicRoom } from "../../../stores/public_room"
import { ChatInput } from "./ChatInput"
import MessageList from "./MessageList"
import { Match, Switch, createEffect } from "solid-js"
import { setUser, user } from "../../../stores/user"
import { createSignal } from "solid-js"
import isNicknameValid from "../../../helpers/isNicknameValid"
import { t } from '../../../i18n'

export default function ChatSpace() {
  const [ready, setReady] = createSignal(false)
  const [userFound, setUserFound] = createSignal(false)

  createEffect(() => {
    if(publicRoom.players?.findIndex(p => p.id === user.id) !== -1) {
      setUserFound(true)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isNicknameValid()) {
      setReady(true)
    }
  }

  return (
    <>
      <MessageList />
      <Switch>
        <Match when={userFound() || ready()}>
          <ChatInput />
        </Match>
        <Match when={!userFound() && !ready()}>
          <p>{t('waitingRoom.readyToStart')}</p>
          <form
            class="[ flex-column ] [ gap-sm ]"
            onSubmit={handleSubmit}
          >
            <label
              class="fw-bold "
              for="nickname"
            >
              {t('common.enterNickname')}
            </label>
            <input
              id="nickname"
              name="nickname"
              value={user.nickname}
              onInput={(e) => setUser('nickname', e.target.value)}
            />

            <button
              class="button"
              data-type="success"
              type="submit"
            >
              {t('waitingRoom.iAmReady')}
            </button>
          </form>
        </Match>
      </Switch>
    </>
  )
}