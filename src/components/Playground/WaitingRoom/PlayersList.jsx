import { useI18n } from "@solid-primitives/i18n";
import { room } from "../../../stores/room";
import { user } from "../../../stores/user";

export default function PlayersList() {
  const [ t ] = useI18n()

  return (
    <div class="[ flex-row ] [ gap-sm ]">
        <For each={room.players}>
          {
            (player) => (
              <div class="[ flex-column ] [ align-items-center ]">
                <img
                  src="/icons/skull.webp"
                  width="64"
                />

                <small class="fw-bold">
                  {player.nickname} {`${player.id === user.id ? t('waitingRoom.you') : ''}`}
                </small>
              </div>
            )
          }
        </For>
      </div>
  )
}
