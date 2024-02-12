import { room, setRoom, startGame, updateRoom } from "../../../stores/room"
import InvitationLink from "./InvitationLink"
import PlayersList from "./PlayersList"
import { setErrorMessage } from "../../../stores/error"
import { For } from "solid-js"
import { t } from '../../../i18n'

function RoomSettings() {
  const handleSubmit = (e) => {
    e.preventDefault()

    if (room.players.length < 3) {
      setErrorMessage('minimumPlayers')
    } else {
      startGame()
    }
  }

  const handleChange = (e) => {
    try {
      const value = e.target.value
      setRoom(e.target.name, value)
      updateRoom(e.target.name, value)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      class="flex-column gap-md"
      onSubmit={handleSubmit}
    >
      <fieldset class="flex-column gap-sm p-sm">
        <legend>{t('waitingRoom.setMatch')}</legend>

        <div class="[ flex-column ] [ gap-sm ]">
          <label>{t('waitingRoom.numberRounds')}</label>
          <select
            name="rounds"
            onInput={handleChange}
          >
            <For each={[3, 4, 5, 6, 7]}>
              {
                (value) => (<option value={value}>{value}</option>)
              }
            </For>
          </select>
        </div>

        <div class="[ flex-column ] [ gap-sm ]">
          <label>{t('waitingRoom.playersLimit')}</label>
          <select
            name="playersLimit"
            onInput={handleChange}
          >
            <For each={[3, 4, 5, 6, 7]}>
              {
                (value) => (<option value={value}>{value}</option>)
              }
            </For>
          </select>
        </div>
      </fieldset>

      <button
        class="button"
        data-type="success"
        type="submit"
      >
        {t('waitingRoom.startGame')}
      </button>
    </form>
  )
}

export default function OwnerWaitingRoom() {
  return (
    <>
      <p>{t('waitingRoom.waitingForEveryoneElse')}</p>

      <PlayersList />

      <InvitationLink />

      <RoomSettings />
    </>
  )
}
