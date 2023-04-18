import { Portal } from 'solid-js/web'
import { clearError, error } from '../../stores/error'

export default function ErrorModal() {
  return (
    <Portal>
      <div class="modal">
        <div class="modal-content">
          <p>
            {error.message}
          </p>
          <button
            onClick={() => clearError()}
          >
            Ok
          </button>
        </div>
      </div>
    </Portal>
  )
}