import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Onboarding } from './onboarding/onboarding';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Login } from './login/login';
import { Registration } from './registration/registration';

const Stack = createNativeStackNavigator();

export const MainNavigation: FC = () => {

  return (<>
  <StatusBar hidden={true} />
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Registration"
        component={Registration}
        options={{ headerShown: false }}
      />
  </Stack.Navigator>
  </NavigationContainer>
  </>);
};
