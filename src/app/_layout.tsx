import { Slot } from "expo-router";
import { NativeBaseProvider, extendTheme } from "native-base";
import { LogBox } from 'react-native';
import Toast from 'react-native-toast-message';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

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
      <Toast />
    </NativeBaseProvider>
  );
}
