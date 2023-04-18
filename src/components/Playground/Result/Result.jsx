import { useI18n } from "@solid-primitives/i18n";
import { room } from "../../../stores/room";

export default function Result() {
  const [ t ] = useI18n()
  const nicknames = room.players.map(p => p.nickname)
  return (
    <>
      <div>
        <For each={room.messages}>
          {(message) => <p>{message}</p>}
        </For>
      </div>

      <p>{t('result.writtenBy')} {nicknames.join(', ')}</p>
    </>
  )
}
