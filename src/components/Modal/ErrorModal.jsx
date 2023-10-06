import Modal from './Modal'
import { clearError, error } from '../../stores/error'
import { useI18n } from '@solid-primitives/i18n'

export default function ErrorModal() {
  const [t] = useI18n()

  return (
    <Modal>
      <p>
        {t(`error.${error.code}`)}
      </p>
      <button
        class="button"
        data-type="info"
        onClick={() => clearError()}
      >
        Ok
      </button>
    </Modal>
  )
}