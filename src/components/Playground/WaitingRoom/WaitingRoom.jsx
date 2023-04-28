import { lazy } from 'solid-js'
import { room } from "../../../stores/room";
import { user } from '../../../stores/user'
import { useI18n } from "@solid-primitives/i18n";

const OwnerWaitingRoom = lazy(() => import('./OwnerWaitingRoom'))
const GuestWaitingRoom = lazy(() => import('./GuestWaitingRoom'))

function isOwner() {
  return room.players.findIndex(p => p.id === user.id) === 0
}

export default function WaitingRoom() {
  const [t] = useI18n()

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
