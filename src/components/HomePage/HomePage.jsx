import { useNavigate } from "@solidjs/router"
import { user, setUser } from "../../stores/user"
import isNicknameValid from "../../helpers/isNicknameValid"
import { onMount } from "solid-js"
import { clearRoom, createRoom } from "../../stores/room"
import { findPublicRoom } from "../../stores/public_room"
import InfoSection from "./InfoSection"
import { t } from '../../i18n'

export default function HomePage() {
  const navigate = useNavigate()

  onMount(() =>{
    setUser('isOwner', false)
    clearRoom()
  })

  const ASSIGNING_USER = {
    createRoom: async () => {
      const roomId = await createRoom(user)
      setUser('isOwner', true)
      navigate(`/${roomId}`)
    },
    joinPublicRoom: async() => {
      const publicRoomId = await findPublicRoom()
      navigate(`/p/${publicRoomId}`)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isNicknameValid()) {
      let submitter = e.submitter.value

      ASSIGNING_USER[submitter]()
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
          value="createRoom"
        >
          {t('homePage.createRoom')}
        </button>

        <button
          class="button"
          data-type="info"
          type="submit"
          value="joinPublicRoom"
        >
          {t('homePage.joinPublicRoom')}
        </button>
      </form>

      <InfoSection />
    </div>
  )
}
