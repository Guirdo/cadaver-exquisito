import { supabase } from "../../../supabase"
const rooms_table = import.meta.env.VITE_ROOMS_TABLE

export async function fetchResult(id) {
  try {
    const { data, error } = await supabase
      .from(rooms_table)
      .select('players, messages')
      .eq('id', id)

    if (error) throw new Error(error.message)

    return data[0]
  } catch (error) {
    console.log(error)
  }
}