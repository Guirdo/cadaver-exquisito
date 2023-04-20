import { Portal } from 'solid-js/web'
import { clearError, error } from '../../stores/error'
import { useI18n } from '@solid-primitives/i18n'

export default function ErrorModal() {
  const [ t ] = useI18n()
  
  return (
    <Portal>
      <div class="modal">
        <div class="modal-content">
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
        </div>
      </div>
    </Portal>
  )
}