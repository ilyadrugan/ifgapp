import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Onboarding } from './onboarding/onboarding';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Login } from './login/login';
import { Registration } from './registration/registration';
import { AboutTest } from './testing/aboutTest';
import { Testing } from './testing/testing';
import { ResultTest } from './testing/testResults';
import { SuccessfulReg } from './successfullReg/successfullReg';
import { Main } from './main/main';
import { IndividualProgramm } from './individualProgramm/individualProgramm';
import authStore from '../../store/state/authStore/authStore';
import { ContestView } from './contests/contest';

const Stack = createNativeStackNavigator();

export const MainNavigation: FC = () => {
  console.log(authStore.isAuthenticated);
  return (<>
  <StatusBar hidden={true} />
  <NavigationContainer>
    <Stack.Navigator initialRouteName={'Main'}>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
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
      <Stack.Screen
        name="AboutTest"
        component={AboutTest}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Testing"
        component={Testing}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResultTest"
        component={ResultTest}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SuccessfulReg"
        component={SuccessfulReg}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="IndividualProgramm"
        component={IndividualProgramm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContestView"
        component={ContestView}
        options={{ headerShown: false }}
      />
  </Stack.Navigator>
  </NavigationContainer>
  </>);
};
