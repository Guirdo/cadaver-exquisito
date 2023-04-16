import { createStore, unwrap } from 'solid-js/store'
import { supabase } from '../supabase'

const initialState = {
  id: '',
  status: 0,
  rounds: 3,
  playersLimit: 3,
  players: [],
  messages: []
}

export const [room, setRoom] = createStore(initialState)

export async function fetchRoom(id) {
  try {
    const { data, error } = await supabase
      .from('rooms')
      .select('id, status, rounds, playersLimit, players, messages')
      .eq('id', id)

    if (error) throw new Error(error.message)

    let { messages } = data[0]
    messages = messages ?? []

    setRoom({ ...data[0], messages })
  } catch (error) {
    console.log(error)
  }
}

export async function subscribeToRoomChanges() {
  await supabase
    .channel('any')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'rooms',
        filter: `id=eq.${room.id}`
      },
      (payload) => {
        const { status, rounds, playersLimit, players } = payload.new
        let { messages } = payload.new
        messages = messages ?? []
        
        setRoom({ status, rounds, playersLimit, players, messages })
      })
    .subscribe()
}

export async function joinGuest(id, nickname) {
  try {
    if (room.playersLimit !== room.players.length) {
      const players = unwrap(room.players).map(e => ({ id: e.id, nickname: e.nickname }))

      await supabase
        .from('rooms')
        .update({ players: [...players, { id, nickname }] })
        .eq('id', room.id)
    } else {
      throw new Error('Casa llena! No puedes unirte')
    }
  } catch (error) {
    console.log(error)
  }
}

export async function updateRoom(column, value) {
  try {
    await supabase
      .from('rooms')
      .update({ [column]: value })
      .eq('id', room.id)
  } catch (error) {
    console.log(error)
  }
}

export async function sendMessage(message) {
  try {
    const messages = unwrap(room.messages).map(e => e)

    await supabase
      .from('rooms')
      .update({ messages: [...messages, message] })
      .eq('id', room.id)

  } catch (error) {
    console.log(error)
  }
}
