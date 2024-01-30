import { createStore, unwrap } from 'solid-js/store'
import { supabase } from '../supabase'

const PUBLIC_ROOMS_TABLE = import.meta.env.VITE_PUBLIC_ROOMS_TABLE
const PUBLIC_ROOMS_MESSAGE_LIMIT = 12
const PUBLIC_ROOMS_EXPIRATION_INVERTAL = 1

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
    const expiratesAt = new Date(currentdDate.setDate(currentdDate.getDate() + PUBLIC_ROOMS_EXPIRATION_INVERTAL))

    const { data, error } = await supabase
      .from(PUBLIC_ROOMS_TABLE)
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
      .from(PUBLIC_ROOMS_TABLE)
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
          table: PUBLIC_ROOMS_TABLE,
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
    const finished = messages.length === PUBLIC_ROOMS_MESSAGE_LIMIT
    
    messages.push({ userId: id, message })
    nickname && players.push({ id, nickname })

    if (finished) {
      players = players.map(p => p.nickname)
      messages = messages.map(p => p.message)
    }

    await supabase
      .from(PUBLIC_ROOMS_TABLE)
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
    .from(PUBLIC_ROOMS_TABLE)
    .select('id')
    .eq('finished', false)

  return data.length !== 0
    ? data[0].id
    : createPublicRoom()
}

export async function getRandomPublicRoom(){
  try{
    const { data } = await supabase
      .from('random_'+PUBLIC_ROOMS_TABLE)
      .select('id')
      .limit(1)
      .single()

    return data.id
  }catch(error) {
    console.error(error)
  }
}

export async function getMostRecentPublicRooms() {
  try{
    const { data } = await supabase
      .from('most_recent_'+PUBLIC_ROOMS_TABLE)
      .select('*')

      return data
  }catch(error) {
    console.error(error)
  }
}
