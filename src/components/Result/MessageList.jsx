export default function MessageList(props) {
  return (
    <div>
      <For each={props.messages}>
        {(message) => <p class="ow-break-word text-align-center">{message}</p>}
      </For>
    </div>
  )
}