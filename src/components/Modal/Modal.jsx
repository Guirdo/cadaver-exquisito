import { Portal } from 'solid-js/web'

export default function ErrorModal(props) {
  return (
    <Portal>
      <div class="modal">
        <div class="modal-content">
          {props.children}
        </div>
      </div>
    </Portal>
  )
}