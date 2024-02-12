import { supabase } from "../../../supabase"

const public_rooms_table = import.meta.env.VITE_PUBLIC_ROOMS_TABLE

export async function fetchPublicResult(id) {
  try {
    const { data, error } = await supabase
      .from(public_rooms_table)
      .select('players, messages')
      .eq('id', id)

    if (error) throw new Error(error.message)

    return data[0]
  } catch (error) {
    console.log(error)
  }
}