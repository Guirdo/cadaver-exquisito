import { room } from "../../../stores/room";

export default function Result() {
  const nicknames = room.players.map(p => p.nickname)
  return (
    <>
      <div>
        <For each={room.messages}>
          {(message) => <p>{message}</p>}
        </For>
      </div>

      <p>Escrito por: {nicknames.join(', ')}</p>
    </>
  )
}
