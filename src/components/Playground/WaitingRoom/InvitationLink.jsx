import { useI18n } from "@solid-primitives/i18n";
import { useLocation } from "@solidjs/router"
import { setErrorMessage } from "../../../stores/error";

export default function InvitationLink() {
  const [ t ] = useI18n()

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location)
      .then(() => {
        setErrorMessage('copied')
      })
      .catch(err => {
        setErrorMessage('copyFails')
      })
  }
  return (
    <div class="flex-column gap-xs">
      <p class="text-align-center">{t('waitingRoom.inviteFriends')}</p>

      <div class="flex-column">

        <input
          class="p-xs fs-sm"
          readOnly
          value={window.location}
        />
        <button
          class="button"
          onClick={handleCopy}
        >
          {t('waitingRoom.copy')}
        </button>
      </div>
    </div>
  )
}
