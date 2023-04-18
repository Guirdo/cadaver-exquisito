import { useNavigate } from "@solidjs/router"
import { user, setUser } from "../../stores/user"
import { supabase } from "../../supabase"
import isNicknameValid from "../../helpers/isNicknameValid"

export default function HomePage() {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isNicknameValid()) {
      try {
        const { data } = await supabase
          .from('rooms')
          .insert({ players: [{ id: user.id, nickname: user.nickname, isOwner: true }] })
          .select()

        setUser('isOwner', true)

        navigate(`/${data[0].id}`)
      } catch (error) {
        console.error(error)
      }
    } else {

    }
  }

  return (
    <div class="[ flex-column ] [ gap-lg p-md align-items-center ]">
      <figure class="w-6rem">
        <img src="/skull.webp" />
      </figure>

      <form
        class="[ flex-column ] [ gap-sm ]"
        onSubmit={handleSubmit}
      >
        <label
          class="fw-bold "
          for="nickname"
        >
          Ingresa tu apodo
        </label>
        <input
          id="nickname"
          name="nickname"
          value={user.nickname}
          onInput={(e) => setUser('nickname', e.target.value)}
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
