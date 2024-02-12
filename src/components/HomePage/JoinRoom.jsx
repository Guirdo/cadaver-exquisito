import { useNavigate } from "@solidjs/router"
import { createRoom } from "../../stores/room"
import { findPublicRoom } from "../../stores/public_room"
import { t } from '../../i18n'
import { user,setUser } from "../../stores/user"
import isNicknameValid from "../../helpers/isNicknameValid"

export default function JoinRoom() {
  const navigate = useNavigate()
  const ASSIGNING_USER = {
    createRoom: async () => {
      const roomId = await createRoom(user)
      setUser('isOwner', true)
      navigate(`/${roomId}`)
    },
    joinPublicRoom: async () => {
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
    <form
      class="[ flex-column ] [ justify-content-center align-items-center gap-sm ]"
      onSubmit={handleSubmit}
    >
      <div class="flex-column">
        <label
          class="fw-bold fs-sm p-block-e-xxs"
          for="nickname"
        >
          {t('common.enterNickname')}
        </label>
        <input
          id="nickname"
          class="w-100 fs-sm"
          name="nickname"
          value={user.nickname}
          onInput={(e) => setUser('nickname', e.target.value)}
        />
      </div>

      <figure class="w-4rem">
        <img src="/icons/skull.webp" />
      </figure>

      <div class="flex-column w-100">
        <button
          class="button"
          data-type="success"
          type="submit"
          value="joinPublicRoom"
        >
          {t('homePage.joinPublicRoom')}
        </button>

        <button
          class="button fs-xs fw-normal"
          data-type="info"
          type="submit"
          value="createRoom"
        >
          {t('homePage.createRoom')}
        </button>
      </div>
    </form>
  )
}