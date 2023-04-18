import { useI18n } from "@solid-primitives/i18n";
import { room } from "../../../stores/room";

export default function Result() {
  const [ t ] = useI18n()
  
  return (
    <>
      <div>
        <For each={room.messages}>
          {(message) => <p>{message}</p>}
        </For>
      </div>

      <p>{t('result.writtenBy')} {room.players.join(', ')}</p>
    </>
  )
}
