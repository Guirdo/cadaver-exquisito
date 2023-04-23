import { useI18n } from "@solid-primitives/i18n";
import { room } from "../../../stores/room";

export default function Result() {
  const [t] = useI18n()

  return (
    <>
      <div class="[ wrapper ] [ w-100 ]">
        <For each={room.messages}>
          {(message) => <p class="ow-break-word text-align-center">{message}</p>}
        </For>
      </div>

      <p class="fw-bold">{t('result.writtenBy')}</p>
      <div class="[ flex-row ] [ flex-wrap justify-content-center gap-sm ]">
        <For each={room.players}>
          {
            (player) => (
              <div class="[ flex-column ] [ align-items-center ]">
                <img
                  src="/icons/skull.webp"
                  width="48"
                />

                <small class="fw-bold">{player}</small>
              </div>
            )
          }
        </For>
      </div>
    </>
  )
}
