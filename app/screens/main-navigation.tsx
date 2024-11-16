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

const Stack = createNativeStackNavigator();

export const MainNavigation: FC = () => {

  return (<>
  <StatusBar hidden={true} />
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Onboarding">
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
  </Stack.Navigator>
  </NavigationContainer>
  </>);
};
