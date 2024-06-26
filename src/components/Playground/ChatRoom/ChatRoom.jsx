import { createEffect } from "solid-js";
import { clearRoom, finishGame, room } from "../../../stores/room";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import { user } from "../../../stores/user";
import { t } from '../../../i18n'

export default function ChatRoom() {
  if (!room.players.find(p => p.id === user.id)) {
    clearRoom()
    return <p>{t('error.gameInProgress')}</p>
  }

  createEffect(() => {
    const lastRound = room.messages.length / room.rounds >= room.players.length

    if (lastRound && user.isOwner) {
      finishGame()
    }
  })

  return (
    <div class="[ flex-column ] [ pos-relative gap-xs flex-grow ]">
      <MessageList />

      <ChatInput />
    </div>
  )
}