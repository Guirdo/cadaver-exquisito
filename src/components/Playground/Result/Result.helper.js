import { supabase } from "../../../supabase"

export async function fetchResult(id) {
  try {
    const { data, error } = await supabase
      .from('rooms')
      .select('players, messages')
      .eq('id', id)

    if (error) throw new Error(error.message)

    return data[0]
  } catch (error) {
    console.log(error)
  }
}