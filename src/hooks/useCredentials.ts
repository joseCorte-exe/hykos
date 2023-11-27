import { supabase } from "@lib/supabase"
import { useState } from "react"

export function useCredentials() {
  const [data, setDate] = useState('')

  function handleCredentials(e: any) {
    console.log(e)
  }
  
  supabase
    .channel('todos')
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'test' }, handleCredentials)
    .subscribe()

  return {
    data
  }
}
