import { useI18n } from "@solid-primitives/i18n";
import { room } from "../../../stores/room";

export default function Result() {
  const [ t ] = useI18n()
  
  return (
    <>
      <div class="wrapper w-100">
        <For each={room.messages}>
          {(message) => <p class="ow-break-word text-align-center">{message}</p>}
        </For>
      </div>

      <p>{t('result.writtenBy')} {room.players.join(', ')}</p>
    </>
  )
}
