import React from 'react';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { NavigationContainer } from '@react-navigation/native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import { MainNavigation } from './app/screens/main-navigation';

const App = () => {
  return (<>
    {/* <GestureHandlerRootView style={{ flex: 1 }}> */}
       {/* <SafeAreaProvider> */}

          <MainNavigation/>
      {/* </SafeAreaProvider> */}
    {/* </GestureHandlerRootView> */}

  </>);
};

export default App;
