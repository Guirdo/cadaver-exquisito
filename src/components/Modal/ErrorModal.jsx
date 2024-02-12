import Modal from './Modal'
import { clearError, error } from '../../stores/error'
import { t } from '../../i18n'

export default function ErrorModal() {
  return (
    <Modal>
      <h3 class="color-danger">Error</h3>
      <p class="m-b-xs fs-sm">
        {t(`error.${error.code}`)}
      </p>
      <button
        class="button w-100"
        data-type="info"
        onClick={() => clearError()}
      >
        Ok
      </button>
    </Modal>
  )
}