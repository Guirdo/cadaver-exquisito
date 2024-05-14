import { createStore, unwrap } from 'solid-js/store'
import { supabase } from '../supabase'

const rooms_table = import.meta.env.VITE_ROOMS_TABLE

const initialState = {
  id: '',
  status: 0,
  rounds: 3,
  playersLimit: 3,
  players: [],
  messages: []
}

export const [room, setRoom] = createStore(initialState)

export function clearRoom() {
  setRoom(initialState)
}

export async function createRoom(user) {
  try {
    const { data } = await supabase
      .from(rooms_table)
      .insert({ players: [{ id: user.id, nickname: user.nickname, isOwner: true }] })
      .select()

      return data[0].id
  } catch (error) {
    console.error(error)
  }
}

export async function fetchRoom(id) {
  try {
    const { data, error } = await supabase
      .from(rooms_table)
      .select('id, status, rounds, playersLimit, players, messages')
      .eq('id', id)

    if (error) throw new Error(error.message)

    let { messages } = data[0]
    messages = messages ?? []

    setRoom({ ...data[0], messages })
    room.status !== 2 && subscribeToRoomChanges()
  } catch (error) {
    console.log(error)
  }
}

async function subscribeToRoomChanges() {
  await supabase
    .channel('roomChanges')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: rooms_table,
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
      const players = unwrap(room.players).map(e => ({ id: e.id, nickname: e.nickname, isOwner: e.isOwner }))

      await supabase
        .from(rooms_table)
        .update({ players: [...players, { id, nickname, isOwner: false }] })
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
      .from(rooms_table)
      .update({ [column]: value })
      .eq('id', room.id)
  } catch (error) {
    console.log(error)
  }
}

export async function startGame() {
  try {
    await supabase
        .from(rooms_table)
        .update({
          playersLimit: room.players.length,
          status: 1
        })
        .eq('id',room.id)
  } catch (error) {
    console.error(error)
  }
}

export async function sendMessage(message) {
  try {
    const messages = unwrap(room.messages).map(e => e)

    await supabase
      .from(rooms_table)
      .update({ messages: [...messages, message] })
      .eq('id', room.id)

  } catch (error) {
    console.log(error)
  }
}

export async function finishGame() {
  try{
    const cleanPlayersList = room.players.map(p => p.nickname)

    const { error } = await supabase
        .from(rooms_table)
        .update({
          status: 2,
          players: cleanPlayersList
        })
        .eq('id', room.id)

    if(error) throw new Error(error.message)
  }catch(error) {
    console.error(error)
  }
}
