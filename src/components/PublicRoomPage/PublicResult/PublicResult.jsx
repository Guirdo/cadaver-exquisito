import { useParams } from "@solidjs/router"
import download from "downloadjs"
import { toPng } from "html-to-image"
import { createResource, createSignal, lazy } from "solid-js"
import { setErrorMessage } from "../../../stores/error"
import { Show } from "solid-js"
import { fetchPublicResult } from "./PublicResult.helper"
import Preview from '../../Common/Preview'
import { t } from '../../../i18n'

const PlayerList = lazy(() => import('../../Common/PlayerList'))
const MessageList = lazy(() => import('../../Common/MessageList'))

export default function PublicResult(){
  const [isWaiting, setIsWaiting] = createSignal(false)
  const params = useParams()
  const [room] = createResource(params.id, fetchPublicResult)

  const handleSave = () => {
    const preview = document.getElementById('preview')
    preview.style.display = 'block'
    preview.style.height = 'auto'

    toPng(preview)
      .then(function (dataUrl) {
        preview.style.display = 'none'
        download(dataUrl, 'cadaver-exquisito.png');
      });
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location)
      .then(() => {
        setIsWaiting(true)

        setTimeout(() => {
          setIsWaiting(false)
        }, 1200)
      })
      .catch(() => {
        setErrorMessage('copyFails')
      })
  }

  return (
    <div class="[ flex-column ] [ flex-grow gap-lg p-sm align-items-center ]">
      <Show
        when={room.state === 'ready'}
        fallback={<span>Loading...</span>}
      >
        <MessageList messages={room().messages} />

        <PlayerList players={room().players} />

        <div
          class="flex-row gap-xxs"
        >
          <button
            class="button fs-xs"
            data-type="success"
            onClick={handleShare}
          >
            {isWaiting() ? t('waitingRoom.copied') : t('result.share')}
          </button>
          
          <button
            class="button fs-xs"
            data-type="info"
            onClick={handleSave}
          >
            {t('result.saveAsImage')}
          </button>
        </div>

        <Preview
          messages={room().messages}
          players={room().players}
        />
      </Show>
    </div>
  )
}