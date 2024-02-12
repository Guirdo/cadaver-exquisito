import { createStore, unwrap } from 'solid-js/store'
import { supabase } from '../supabase'
import getFromAndTo from '../utils/getFromAndTo'

const PUBLIC_ROOMS_TABLE = import.meta.env.VITE_PUBLIC_ROOMS_TABLE
const PUBLIC_ROOMS_MESSAGE_LIMIT = 10

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
    const { data, error } = await supabase
      .from(PUBLIC_ROOMS_TABLE)
      .insert({
        players: [],
        messages: []
      })
      .select('id')
      .single()

    if (error) throw new Error(error.message)

    return data.id
  } catch (error) {
    console.error(error)
  }
}

export async function fetchPublicRoom(id) {
  try {
    const { data, error } = await supabase
      .from(PUBLIC_ROOMS_TABLE)
      .select('id, finished, players, messages')
      .eq('id', id)
      .single()

    if (error) throw new Error(error.message)

    let { messages } = data
    messages = messages ?? []

    setPublicRoom({ ...data, messages })
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

    messages.push({ userId: id, message })
    nickname && players.push({ id, nickname })

    const finished = messages.length >= PUBLIC_ROOMS_MESSAGE_LIMIT
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
    .limit(1)
    .maybeSingle()

  return data
    ? data.id
    : createPublicRoom()
}

export async function getRandomPublicRoom() {
  try {
    const { data } = await supabase
      .from('random_' + PUBLIC_ROOMS_TABLE)
      .select('id')
      .limit(1)
      .single()

    return data.id
  } catch (error) {
    console.error(error)
  }
}

export async function getMostRecentPublicRooms() {
  try {
    const { data } = await supabase
      .from('most_recent_' + PUBLIC_ROOMS_TABLE)
      .select('*')

    return data
  } catch (error) {
    console.error(error)
  }
}

export async function getArchive(currentPage) {
  try {
    let { from, to } = getFromAndTo(currentPage)

    const { data } = await supabase
      .from('archived_' + PUBLIC_ROOMS_TABLE)
      .select('*')
      .range(from, to)

    return data
  } catch (error) {
    console.error(error)
  }
}

export async function getArchiveCount() {
  try {
    const { count } = await supabase
      .from('archived_' + PUBLIC_ROOMS_TABLE)
      .select('*', { count: 'exact', head: true })

    return count
  } catch (error) {
    console.error(error)
  }
}
