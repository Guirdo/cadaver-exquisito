import { A } from "@solidjs/router";
import { For, createResource, createSignal, onMount } from "solid-js";
import { getMostRecentPublicRooms, getRandomPublicRoom } from "../../stores/public_room";
import cutOffText from "../../utils/cutOffText";
import { t } from "../../i18n";

export default function RandomPublicRoomBoard() {
  const [randomCadaver, setRandomCadaver] = createSignal('')
  const [mostRecentPublicRooms] = createResource(getMostRecentPublicRooms)

  onMount(() => {
    getRandomPublicRoom()
      .then(setRandomCadaver)
  })

  return (
    <div class="flex-column">
      <h2>{t('publicRoom.seeWhatOthersWrote')}</h2>
      <A class="p-block-s-xs fw-bold" href={`/p/${randomCadaver()}`}>
        {t('publicRoom.randomCadaver')}
      </A>
      <h3 class="p-block-s-sm ">{t('publicRoom.threeMostRecent')}</h3>
      <ul>
        <For each={mostRecentPublicRooms()} fallback={<li>{t('common.loading')}</li>}>
          {(item) => (
            <li>
              <A href={`/p/${item.id}`}>
                {cutOffText(item.title)}
              </A>
            </li>
          )}
        </For>
      </ul>
    </div >
  )
}