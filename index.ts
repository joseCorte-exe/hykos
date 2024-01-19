import crashlytics from '@react-native-firebase/crashlytics';
import "expo-router/entry";

async function onSignIn() {
  crashlytics().log('User signed in.');
  await Promise.all([
    crashlytics()
  ]);
}
onSignIn()