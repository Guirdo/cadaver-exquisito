import { useI18n } from "@solid-primitives/i18n";
import { room } from "../../../stores/room";
import { user } from "../../../stores/user";

export default function PlayersList() {
  const [ t ] = useI18n()

  return (
    <div class="flex-column gap-xs">
      <div class="flex-row gap-sm">
        <For each={room.players}>
          {
            (player) => (
              <div class="flex-column align-items-center">
                <img
                  src="/skull.webp"
                  width="64"
                />

                <small class="fw-bold">
                  {player.nickname} {`${player.id === user.id ? '(You)' : ''}`}
                </small>
              </div>
            )
          }
        </For>
      </div>

      <small className="text-align-center">
        <b>{t('waitingRoom.players')}</b> {room.players.length}/{room.playersLimit}
      </small>

      <small class="text-align-center">
          <b>{t('waitingRoom.rounds')}</b> {room.rounds}
      </small>
    </div>
  )
}
