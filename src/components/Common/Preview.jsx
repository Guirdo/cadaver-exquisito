import MessageList from "./MessageList";
import PlayerList from "./PlayerList";

export default function Preview(props) {

  return (
    <div
      id="preview"
      class="[ flex-column ] [ bg-white align-items-center ]"
      style={{ width: '30rem', display: 'none' }}
    >
      <div className="[ flex-row ] [ w-100 justify-content-center align-items-center p-xxs gap-xxs bg-primary ]">
        <figure class="w-2rem">
          <img
            src="/icons/skull.webp"
          />
        </figure>
        <h1 className="text-align-center xs-fs-lg color-white">
          Cadáver exquisito
        </h1>
        <figure class="w-2rem">
          <img
            src="/icons/wine.webp"
          />
        </figure>
      </div>

      <div class="[ flex-column ] [ p-lg justify-content-center align-items-center gap-lg ]">
        <MessageList messages={props.messages} />
        <PlayerList players={props.players} />

        <div>
          <span class="color-secondary fw-bold">
            cadaverexquisito.xyz
          </span>
        </div>
      </div>

    </div>
  )
}