import { setUser, user } from "../../../stores/user"
import { onMount } from "solid-js"

export default function SoundButton() {
  let soundIcon

  onMount(() => {
    user.allowSound ?
      soundIcon.src = '/icons/sound_on.png' :
      soundIcon.src = '/icons/sound_off.png'
  })

  const handleSound = () => {
    if(user.allowSound) {
      soundIcon.src = '/icons/sound_off.png'
    } else {
      soundIcon.src = '/icons/sound_on.png'
    }

    setUser('allowSound', !user.allowSound)
  }

  return (
    <button
      onClick={handleSound}
      class="button"
      data-type="info-outline"
    >
      <img
        ref={soundIcon}
        class="w-2rem"
        src="/icons/sound_on.png"
      />
    </button>
  )
}