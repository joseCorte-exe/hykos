import { createClient } from "@supabase/supabase-js"
import 'react-native-url-polyfill/auto'

export const supabase = createClient<Database>(
  'https://bucrdciuylogrmxvuzzl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1Y3JkY2l1eWxvZ3JteHZ1enpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgxMTQxOTMsImV4cCI6MjAxMzY5MDE5M30.1ocMacmmIsI-U_8wsZZcs6qR7CvBh7ewCbTuISAofvo'
)

export interface Database {
  public: {
    Tables: {
      skills: {
        Row: {               // the data expected from .select()
          id: number
          title: string
          description: string
        }
        Insert: {            // the data to be passed to .insert()
          id?: never         // generated columns must not be supplied
          title: string
          description: string
        }
        Update: {            // the data to be passed to .update()
          title: string
          description: string
        }
      },
      strategies: {
        Row: {               // the data expected from .select()
          id: number
          title: string
          description: string
        }
        Insert: {            // the data to be passed to .insert()
          id?: never         // generated columns must not be supplied
          title: string
          description: string
        }
        Update: {            // the data to be passed to .update()
          title: string
          description: string
        }
      },
      strategies_skills: {
        Row: {               // the data expected from .select()
          id: number
          skill_id: string
          strategy_id: string
        }
      }
    }
  }
}