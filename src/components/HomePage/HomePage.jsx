import { createSignal } from "solid-js"

export default function HomePage() {
  const [nickname, setNickname] = createSignal('')

  return (
    <div class="[ flex-column ] [ gap-lg p-md align-items-center ]">
      <figure class="w-6rem">
        <img src="/skull.webp" />
      </figure>

      <form class="[ flex-column ] [ gap-sm ]">
        <label
          class="fw-bold "
          for="nickname"
        >
          Ingresa tu apodo
        </label>
        <input
          id="nickname"
          value={nickname()}
          onInput={(e) => setNickname(e.target.value)}
        />

        <button
          class="button"
          data-type="primary"
          type="submit"
        >
          Crear sala
        </button>
      </form>

    </div>
  )
}
