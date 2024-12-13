import { Button } from "@components/form";
import { AntDesign } from "@expo/vector-icons";
import { supabase } from "@lib/supabase";
import { Stack, router } from "expo-router";
import { Image } from "native-base";

export default function Layout() {
  function handleLogout() {
    supabase.auth.signOut()
    router.push('/')
  }

  function handleNavigateToCredits() {
    router.push('/credits/')
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
        ),

        headerRight: () => props.route.name === 'home' && (
          <Button onPress={handleNavigateToCredits} backgroundColor='blue.900' >
            <Image source={{ uri: 'https://www.iconsdb.com/icons/preview/white/document-xxl.png' }} w={5} h={5} color={'white'} />
          </Button>
        )
      })}
    >
      <Stack.Screen name="Home" />
      <Stack.Screen name="[service]" />
      <Stack.Screen name="[serviceInfo]" />
    </Stack>
  );
}
