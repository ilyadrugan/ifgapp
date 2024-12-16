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
import { LogBox } from 'react-native';
import { Toast } from './app/core/components/toast/toast';
import { SafeAreaProvider } from 'react-native-safe-area-context';

LogBox.ignoreLogs(['Require cycle:']);

const App = () => {
  // AsyncStorage.clear();
  return (<>
  <Provider {...stores}>
    <GestureHandlerRootView style={{ flex: 1 }}>
       <SafeAreaProvider>
          <MainNavigation/>
          <Toast/>
      </SafeAreaProvider>
    </GestureHandlerRootView>
    </Provider>
  </>);
};

export default App;
