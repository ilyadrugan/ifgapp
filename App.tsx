import React from 'react';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { NavigationContainer } from '@react-navigation/native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import { MainNavigation } from './app/screens/main-navigation';
import { Provider } from 'mobx-react';
import stores from './store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LogBox, StatusBar } from 'react-native';
import { Toast } from './app/core/components/toast/toast';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FirebaseComponent } from './app/core/components/firebase-component/firebase-component';
import { NavigationContainer } from '@react-navigation/native';
import { requestNotificationPermission } from './app/core/firebase/firebase';
LogBox.ignoreLogs(['Require cycle:']);
requestNotificationPermission();

const App = () => {
  // AsyncStorage.clear();
  return (<>
  <Provider {...stores}>
    <GestureHandlerRootView style={{ flex: 1 }}>
    <StatusBar hidden={true} />
    <NavigationContainer>
       <SafeAreaProvider>
          <FirebaseComponent/>
          <MainNavigation/>
          <Toast/>
      </SafeAreaProvider>
    </NavigationContainer>
    </GestureHandlerRootView>
    </Provider>
  </>);
};

export default App;
