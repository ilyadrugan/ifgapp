import React, { FC, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Onboarding } from './onboarding/onboarding';
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
import { ArticleView } from './materials/article';
import { InterviewView } from './materials/interview';
import { Coverage } from './coverage/coverage';
import { PersonalRecommendations } from './personalRecomendations/personalRecommendations';
import { SubscribeEmailConfirm } from './registration/components/subscribeReg/subscribeEmailConfirm';
import { GoalSettings } from './goalSettings/goalSettings';
import { observer } from 'mobx-react';
import userStore from '../../store/state/userStore/userStore';
import { StartPage } from './startPage/startPage';

type RootStackParamList = {
  OnBoarding: undefined;
  Main: undefined;
  Login: undefined;
  SubscribeEmailConfirm: undefined;
  Registration: undefined;
  AboutTest: undefined;
  Testing: undefined;
  ResultTest: undefined;
  IndividualProgramm: {withNoback: boolean };
  ContestView: undefined;
  SuccessfulReg: undefined;
  ArticleView: undefined;
  InterviewView: undefined;
  Coverage: undefined;
  PersonalRecommendations: undefined;
  GoalSettings: undefined;
  StartPage: {withNoback: boolean };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainNavigation = observer(() => {

  return (<>

    <Stack.Navigator
    // initialRouteName="StartPage"
    initialRouteName={authStore.isAuthenticated ? 'Main' :
      authStore.isOnBoarded ? 'Login' : 'OnBoarding'}
      >
    {/* userStore.userInfo?.email_verified_at ? 'Main'
      : 'SubscribeEmailConfirm' */}

      <Stack.Screen
        name="OnBoarding"
        component={Onboarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SubscribeEmailConfirm"
        component={SubscribeEmailConfirm}
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
      <Stack.Screen
        name="ArticleView"
        component={ArticleView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
      name="InterviewView"
      component={InterviewView}
      options={{ headerShown: false }}
      />
      <Stack.Screen
      name="Coverage"
      component={Coverage}
      options={{ headerShown: false }}
      />
      <Stack.Screen
      name="PersonalRecommendations"
      component={PersonalRecommendations}
      options={{ headerShown: false }}
      />
      <Stack.Screen
      name="GoalSettings"
      component={GoalSettings}
      options={{ headerShown: false }}
      />
      <Stack.Screen
      name="StartPage"
      component={StartPage}
      options={{ headerShown: false }}
      />
  </Stack.Navigator>
  </>);
});
