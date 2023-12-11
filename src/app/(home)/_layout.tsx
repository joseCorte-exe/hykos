import { Button } from "@components/form";
import { AntDesign } from "@expo/vector-icons";
import { supabase } from "@lib/supabase";
import { Stack, router } from "expo-router";

export default function Layout() {
  function handleLogout() {
    supabase.auth.signOut()
    router.push('/')
  }

  return (
    <Stack
      screenOptions={(props) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: '#1E3A8A',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',

        headerLeft: () => props.route.name === 'home' && (
          <Button onPress={handleLogout} backgroundColor='blue.900'>
            <AntDesign name="logout" size={16} color='white' />
          </Button>
        )
      })}
    >
      <Stack.Screen name="Home" />
      <Stack.Screen name="[service]" getId={(params) => String({ name: 'tome' })} />
      <Stack.Screen name="[serviceInfo]" getId={(params) => String({ name: 'tome' })} />
    </Stack>
  );
}
