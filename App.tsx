import crashlytics from '@react-native-firebase/crashlytics';
import { useEffect } from "react";
import { View } from 'react-native';

async function onSignIn() {
  crashlytics().log('User signed in.');
  await Promise.all([
    crashlytics()
  ]);
}

export default function App() {
  useEffect(() => {
    onSignIn()
    crashlytics().log('App mounted.');
  }, [])

  return (
    <View>
    </View>
  );
}