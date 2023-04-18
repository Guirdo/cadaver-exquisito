import { createEffect } from "solid-js";
import { finishGame, room } from "../../../stores/room";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import { user } from "../../../stores/user";

export default function ChatRoom() {
  createEffect(() => {
    const lastRound = room.messages.length / room.rounds >= room.players.length

    if (lastRound && user.isOwner) {
      finishGame()
    }
  })

  return (
    <div class="[ flex-column ] [ gap-xs flex-grow ]">
      <MessageList />

      <ChatInput />
    </div>
  )
}