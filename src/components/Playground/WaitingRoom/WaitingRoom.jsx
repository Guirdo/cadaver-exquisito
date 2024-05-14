import { lazy } from 'solid-js'
import { room } from "../../../stores/room";
import { user } from '../../../stores/user'
import { t } from "../../../i18n";

const OwnerWaitingRoom = lazy(() => import('./OwnerWaitingRoom'))
const GuestWaitingRoom = lazy(() => import('./GuestWaitingRoom'))

function isOwner() {
  return room.players.findIndex(p => p.id === user.id) === 0
}

export default function WaitingRoom() {
  return (
    <Switch fallback={<p>{t('common.loading')}</p>}>
      <Match when={isOwner()}>
        <OwnerWaitingRoom />
      </Match>
      <Match when={!isOwner()}>
        <GuestWaitingRoom />
      </Match>
    </Switch>
  )
}
