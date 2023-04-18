import { Match, Switch, createSignal } from "solid-js";
import { joinGuest, room } from "../../../stores/room";
import { user, setUser } from "../../../stores/user";
import PlayersList from "./PlayersList";
import InvitationLink from "./InvitationLink";
import isNicknameValid from "../../../helpers/isNicknameValid";

export default function GuestWaitingRoom() {
  const [ready, setReady] = createSignal(false)

  if (room.players.find(p => p.id === user.id)) setReady(true)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isNicknameValid()) {
      joinGuest(user.id, user.nickname)
      setReady(true)
    }
  }

  return (
    <>
      <Switch>
        <Match when={!ready()}>
          <p>¿Estas listo para jugar?</p>
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
              ¡Estoy listo!
            </button>
          </form>
        </Match>

        <Match when={ready()}>
          <p>Espera a que empiece el juego...</p>

          <PlayersList />

          <InvitationLink />
        </Match>
      </Switch>

    </>
  )
}
