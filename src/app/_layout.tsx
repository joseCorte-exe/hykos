import crashlytics from '@react-native-firebase/crashlytics';
import { Slot } from "expo-router";
import { NativeBaseProvider, extendTheme } from "native-base";
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import * as Sentry from 'sentry-expo';

async function onSignIn() {
  crashlytics().log('User signed in.');
  await Promise.all([
    crashlytics()
  ]);
}

Sentry.init({
  dsn: 'https://57b0f188109a5be19e7f71845ee8ddac@o4505998556266496.ingest.sentry.io/4505998559870976',
  // enableInExpoDevelopment: true,
  debug: true,
});

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

  useEffect(() => {
    onSignIn()
    crashlytics().log('App mounted.');
  }, [])

  return (
    <NativeBaseProvider theme={theme}>
      <Slot />
      <Toast />
    </NativeBaseProvider>
  );
}
