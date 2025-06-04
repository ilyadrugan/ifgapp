import React from 'react';
import auth, { getAuth, GoogleAuthProvider, signInWithCredential } from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton  } from '@react-native-google-signin/google-signin';
import { TouchableOpacity, StyleSheet, Image, Text} from 'react-native';

const signInWithGoogle = async () => {
  try {
    // Проверяем доступность Play Services
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Получаем учетные данные
    const { idToken } = await GoogleSignin.signIn();

    // Создаем credential для Firebase
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Аутентификация через Firebase
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    console.error('Ошибка входа через Google:', error);
  }
};
async function onGoogleButtonPress() {
    console.log('onGoogleButtonPress');

  // Check if your device supports Google Play
    const res = await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    console.log('res', res);

    // Get the users ID token
    const signInResult = await GoogleSignin.signIn();
    console.log('signInResult', signInResult);
    // Try the new style of google-sign in result, from v13+ of that module
    let idToken = signInResult.data?.idToken;
    //   if (!idToken) {
    //     // if you are using older versions of google-signin, try old style result
    //     idToken = signInResult.data.idToken;
    //   }
    if (!idToken) {
        return new Error('No ID token found');
    }

    // Create a Google credential with the token
    const googleCredential = GoogleAuthProvider.credential(signInResult.data?.idToken);

    // Sign-in the user with the credential
    return signInWithCredential(getAuth(), googleCredential);
}
export const GoogleSignInButton = () => (
  <GoogleSigninButton
   size={GoogleSigninButton.Size.Icon}
   color={GoogleSigninButton.Color.Dark}
   onPress={onGoogleButtonPress}
//    disabled={this.state.isSigninInProgress}
/>
);

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 4,
    padding: 10,
    alignItems: 'center',
    elevation: 2,
  },
  logo: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  text: {
    color: '#000',
    fontWeight: 'bold',
  },
});
