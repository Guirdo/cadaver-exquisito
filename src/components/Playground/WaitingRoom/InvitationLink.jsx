import { useI18n } from "@solid-primitives/i18n";
import { setErrorMessage } from "../../../stores/error";
import { createSignal } from "solid-js";

export default function InvitationLink() {
  const [isWaiting, setIsWaiting] = createSignal(false)
  const [t] = useI18n()

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location)
      .then(() => {
        setIsWaiting(true)

        setTimeout(() => {
          setIsWaiting(false)
        }, 1200)
      })
      .catch(() => {
        setErrorMessage('copyFails')
      })
  }
  return (
    <div class="flex-column gap-xs">
      <p class="text-align-center">{t('waitingRoom.inviteFriends')}</p>

      <div class="flex-column">

        <input
          class="fs-sm"
          readOnly
          value={window.location}
        />
        <button
          class="button"
          data-type={isWaiting() ? 'info-outline' : 'info'}
          onClick={handleCopy}
        >
          {isWaiting() ? t('waitingRoom.copied') : t('waitingRoom.copy')}
        </button>
      </div>
    </div>
  )
}
