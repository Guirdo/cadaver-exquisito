import { Portal } from 'solid-js/web'

export default function ErrorModal(props) {
  return (
    <Portal>
      <div class="[ flex-row modal ] [ w-100 h-100 justify-content-center align-items-center ]">
        <div class="[ modal-content ] [ p-lg bg-theme color-theme m-inline-lg ]">
          {props.children}
        </div>
      </div>
    </Portal>
  )
}