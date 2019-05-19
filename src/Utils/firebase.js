import firebase from "react-native-firebase";

export async function getFireBasetoken() {
  const fb = firebase.messaging();
  fb.requestPermission();
  return await fb.getToken().then(token => token);
}
