import { useI18n } from "@solid-primitives/i18n"
import { room } from "../../stores/room"

export default function PlayerList(props) {
  const [t] = useI18n()
  return (
    <>
      <p class="fw-bold">{t('result.writtenBy')}</p>
      <div class="[ flex-row ] [ flex-wrap justify-content-center gap-sm ]">
        <For each={props.players}>
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