import { createEffect } from "solid-js";
import { room, updateRoom } from "../../../stores/room";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

export default function ChatRoom() {
  createEffect(() => {
    if(room.messages.length / room.rounds === room.players.length) {
      updateRoom('status', 2)
    }
  })

  return(
    <div class="flex-column gap-xs">
      <MessageList />

      <ChatInput />
    </div>
  )
}