import { setUser } from "../../stores/user"
import { onMount } from "solid-js"
import { clearRoom } from "../../stores/room"
import InfoSection from "./InfoSection"
import JoinRoom from "./JoinRoom"
import RandomPublicRoomBoard from "./RandomPublicRoomBoard"

export default function HomePage() {
  onMount(() => {
    setUser('isOwner', false)
    clearRoom()
  })

  return (
    <div id="home-page" class="[ flex-column ] [ w-100 gap-lg p-md align-items-center ]">
      <div class="[ flex-row ] [ align-items-center gap-lg flex-wrap w-100 justify-content-evenly ]">
        <JoinRoom />
        <RandomPublicRoomBoard />
      </div>

      <InfoSection />
    </div>
  )
}
