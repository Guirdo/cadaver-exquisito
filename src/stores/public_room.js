import { createStore, unwrap } from 'solid-js/store'
import { supabase } from '../supabase'

const public_rooms_table = import.meta.env.VITE_PUBLIC_ROOMS_TABLE
const PUBLIC_ROOMS_LIMIT = 14

const initialState = {
  id: '',
  created_at: '',
  players: [],
  messages: [],
  finished: false,
  expirates_at: ''
}

export const [publicRoom, setPublicRoom] = createStore(initialState)

async function createPublicRoom() {
  try {
    const currentdDate = new Date()
    const expiratesAt = new Date(currentdDate.setDate(currentdDate.getDate() + 7))

    const { data, error } = await supabase
      .from(public_rooms_table)
      .insert({
        expirates_at: expiratesAt,
        players: [],
        messages: []
      })
      .select()

    if (error) throw new Error(error.message)

    return data[0].id
  } catch (error) {
    console.error(error)
  }
}

export async function fetchPublicRoom(id) {
  try {
    const { data, error } = await supabase
      .from(public_rooms_table)
      .select('id, finished, players, messages,expirates_at')
      .eq('id', id)

    if (error) throw new Error(error.message)

    let { messages } = data[0]
    messages = messages ?? []

    setPublicRoom({ ...data[0], messages })
    !publicRoom.finished && subscribeToPublicRoomChanges()
  } catch (error) {
    console.log(error)
  }
}

async function subscribeToPublicRoomChanges() {
  try {
    await supabase
      .channel('publicRoomChanges')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: public_rooms_table,
          filter: `id=eq.${publicRoom.id}`
        },
        (payload) => {
          const { finished, players } = payload.new
          let { messages } = payload.new
          messages = messages ?? []

          setPublicRoom({ finished, players, messages })
        })
      .subscribe()

  } catch (error) {
    console.error(error)
  }
}

export async function sendMessage(id, message, nickname) {
  try {
    let players = unwrap(publicRoom.players).map(e => ({ id: e.id, nickname: e.nickname }))
    let messages = unwrap(publicRoom.messages).map(e => e)
    const finished = messages.length === PUBLIC_ROOMS_LIMIT
    
    messages.push({ userId: id, message })
    nickname && players.push({ id, nickname })

    if (finished) {
      players = players.map(p => p.nickname)
      messages = messages.map(p => p.message)
    }

    await supabase
      .from(public_rooms_table)
      .update({
        players,
        messages,
        finished
      })
      .eq('id', publicRoom.id)
  } catch (error) {
    console.error(error)
  }
}

export async function findPublicRoom() {
  const { data } = await supabase
    .from(public_rooms_table)
    .select('id')
    .eq('finished', false)

  return data.length !== 0
    ? data[0].id
    : createPublicRoom()
}
