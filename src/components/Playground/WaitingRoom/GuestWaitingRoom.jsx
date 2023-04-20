import { Match, Switch, createSignal } from "solid-js";
import { joinGuest, room } from "../../../stores/room";
import { user, setUser } from "../../../stores/user";
import PlayersList from "./PlayersList";
import InvitationLink from "./InvitationLink";
import isNicknameValid from "../../../helpers/isNicknameValid";
import { useI18n } from "@solid-primitives/i18n";

function RoomInfo() {
  const [ t ] = useI18n()
  return (
    <div class="flex-column gap-xs">
      <small className="text-align-center">
        <b>{t('waitingRoom.players')}</b> {room.players.length}/{room.playersLimit}
      </small>

      <small class="text-align-center">
        <b>{t('waitingRoom.rounds')}</b> {room.rounds}
      </small>
    </div>
  )
}

export default function GuestWaitingRoom() {
  const [t] = useI18n()
  const [ready, setReady] = createSignal(false)

  if (room.players.find(p => p.id === user.id)) setReady(true)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isNicknameValid()) {
      joinGuest(user.id, user.nickname)
      setReady(true)
    }
  }

  return (
    <>
      <Switch>
        <Match when={!ready()}>
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

        <Match when={ready()}>
          <p>{t('waitingRoom.waitForStarting')}</p>

          <PlayersList />

          <RoomInfo />

          <InvitationLink />
        </Match>
      </Switch>

    </>
  )
}
