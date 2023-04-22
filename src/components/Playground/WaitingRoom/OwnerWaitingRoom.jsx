import { useI18n } from "@solid-primitives/i18n"
import { room, setRoom, updateRoom } from "../../../stores/room"
import InvitationLink from "./InvitationLink"
import PlayersList from "./PlayersList"
import isEmpty from 'validator/es/lib/isEmpty'
import { clearError, setErrorMessage } from "../../../stores/error"

function RoomSettings() {
  const [t] = useI18n()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (room.players.length < 3) {
      setErrorMessage('minimumPlayers')
    } else {
      updateRoom('status', 1)
      clearError()
    }
  }

  const handleChange = (e) => {
    try {
      const value = e.target.value
      if (!isEmpty(value)) {
        setRoom(e.target.name, value)
        updateRoom(e.target.name, value)
      }
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
          <input
            name="rounds"
            type="number"
            min={3}
            max={7}
            value={room.rounds}
            onInput={handleChange}
          />
        </div>

        <div class="[ flex-column ] [ gap-sm ]">
          <label>{t('waitingRoom.playersLimit')}</label>
          <input
            name="playersLimit"
            type="number"
            min={3}
            max={7}
            value={room.playersLimit}
            onInput={handleChange}
          />
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
  const [t] = useI18n()
  return (
    <>
      <p>{t('waitingRoom.waitingForEveryoneElse')}</p>

      <PlayersList />

      <InvitationLink />

      <RoomSettings />
    </>
  )
}
