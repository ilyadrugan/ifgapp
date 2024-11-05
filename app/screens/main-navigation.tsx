import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Onboarding } from './onboarding/onboarding';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export const MainNavigation: FC = () => {

  return (<>
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{ headerShown: false }}
      />
  </Stack.Navigator>
  </NavigationContainer>
  </>);
};
