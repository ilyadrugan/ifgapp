import React from 'react';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { NavigationContainer } from '@react-navigation/native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import { MainNavigation } from './app/screens/main-navigation';
import { Provider } from 'mobx-react';
import stores from './store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  // AsyncStorage.clear();
  return (<>
  <Provider {...stores}>
    {/* <GestureHandlerRootView style={{ flex: 1 }}> */}
       {/* <SafeAreaProvider> */}

          <MainNavigation/>
      {/* </SafeAreaProvider> */}
    {/* </GestureHandlerRootView> */}
    </Provider>
  </>);
};

export default App;
