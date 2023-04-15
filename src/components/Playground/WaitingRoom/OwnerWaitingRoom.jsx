import { room, setRoom, updateRoom } from "../../../stores/room"
import InvitationLink from "./InvitationLink"
import PlayersList from "./PlayersList"

function RoomSettings() {
  const handleSubmit = (e) => {
    e.preventDefault()

    updateRoom('status', 1)
  }

  const handleChange = (e) => {
    try{
      setRoom(e.target.name, e.target.value)
      updateRoom(e.target.name, e.target.value)
    }catch(error){
      console.log(error)
    }
  }

  return (
    <form
      class="flex-column gap-md"
      onSubmit={handleSubmit}
    >
      <fieldset class="flex-column gap-sm p-sm">
        <legend>Configura la partida</legend>

        <div class="[ flex-column ] [ gap-sm ]">
          <label>Número de rondas</label>
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
          <label>Limite de jugadores</label>
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
        type="submit"
      >
        Empezar juego
      </button>
    </form>
  )
}

export default function OwnerWaitingRoom() {
  return (
    <>
      <p>Esperando a los demás a unirse...</p>

      <PlayersList />

      <InvitationLink />

      <RoomSettings />
    </>
  )
}
