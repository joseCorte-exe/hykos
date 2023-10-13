import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#1E3A8A',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center'
      }}
    >
      <Stack.Screen name="Home" />
      <Stack.Screen name="[strategy]" getId={(params) => String({ name: 'tome' })} />
      <Stack.Screen name="[strategyInfo]" getId={(params) => String({ name: 'tome' })} />
    </Stack>
  );
}
