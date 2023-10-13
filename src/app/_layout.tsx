import { Slot } from "expo-router";
import { NativeBaseProvider, extendTheme } from "native-base";

// Root (Native Base Provider, _App.tsx, Global Layout)
export default function Root() {
  const theme = extendTheme({
    colors: {
      primary: {
        100: '#1E40AF',
      },
    },
    config: {
      initialColorMode: 'light'
    }
  });

  return (
    <NativeBaseProvider theme={theme}>
      <Slot />
    </NativeBaseProvider>
  );
}
