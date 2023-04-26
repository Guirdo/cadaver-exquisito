import { useNavigate } from "@solidjs/router"
import { user, setUser } from "../../stores/user"
import isNicknameValid from "../../helpers/isNicknameValid"
import { onMount } from "solid-js"
import { useI18n } from "@solid-primitives/i18n"
import { clearRoom, createRoom } from "../../stores/room"
import InfoSection from "./InfoSection"

export default function HomePage() {
  const navigate = useNavigate()
  const [ t ] = useI18n()

  onMount(() =>{
    setUser('isOwner', false)
    clearRoom()
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isNicknameValid()) {
      const roomId = await createRoom(user)
      setUser('isOwner', true)
      navigate(`/${roomId}`)
    }
  }

  return (
    <div class="[ flex-column ] [ w-100 gap-lg p-md align-items-center ]">
      <figure class="w-6rem">
        <img src="/icons/skull.webp" />
      </figure>

      <form
        class="[ flex-column ] [ gap-sm ]"
        onSubmit={handleSubmit}
      >
        <label
          class="fw-bold "
          for="nickname"
        >
          {t('common.enterNickname')}
        </label>
        <input
          id="nickname"
          name="nickname"
          value={user.nickname}
          onInput={(e) => setUser('nickname', e.target.value)}
        />

        <button
          class="button"
          data-type="success"
          type="submit"
        >
          {t('homePage.createRoom')}
        </button>
      </form>

      <InfoSection />
    </div>
  )
}
