import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { FC, ReactNode, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import Profile from '../../../assets/icons/tabs/profile.svg';
import Calendar from '../../../assets/icons/tabs/calendar.svg';
import Home from '../../../assets/icons/tabs/home.svg';
import Materials from '../../../assets/icons/tabs/materials.svg';
import Contests from '../../../assets/icons/tabs/contests.svg';
import ProfileActive from '../../../assets/icons/tabs/profileFocused.svg';
import CalendarActive from '../../../assets/icons/tabs/calendarFocused.svg';
import HomeActive from '../../../assets/icons/tabs/homeFocused.svg';
import MaterialsActive from '../../../assets/icons/tabs/materialsFocused.svg';
import ContestsActive from '../../../assets/icons/tabs/contestsFocused.svg';
import gs from '../../core/styles/global';
import colors from '../../core/colors/colors';
import { ProfileScreen } from '../profile/profile';
import { IFGHome } from '../ifg-home/ifg-home';
import { MaterialsScreen } from '../materials/materials';
import { observer } from 'mobx-react';
import { ContestsScreen } from '../contests/contests';
import { CalendarScreen } from '../calendar/calendar';
import userStore from '../../../store/state/userStore/userStore';
import authStore from '../../../store/state/authStore/authStore';

const Tab = createBottomTabNavigator();

export const Main: FC = observer(() => {
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();
  const deviceHeight = frame.height;
  console.log('deviceHeight', deviceHeight);

  useEffect(()=>{
    //if (Platform.OS!=='ios'){
      StatusBar.setHidden(false);
      StatusBar.setBackgroundColor(Platform.OS==='ios'?'transparent':'#757575');
    //}
  },[]);
  return  (
    <>
    
      <Tab.Navigator initialRouteName="Дом"
        // headerShown={false}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          switch (route.name) {
            case 'Профиль':
              return focused ? <ProfileActive /> : <Profile />;
            case 'Календарь':
              return focused ? <CalendarActive /> : <Calendar />;
            case 'Дом':
              return focused ? <HomeActive /> : <Home />;
            // case 'Материалы':
            //   return focused ? <MaterialsActive /> : <Materials />;
            case 'Конкурсы':
              return focused ? <ContestsActive /> : <Contests />;
          }
        },
        tabBarActiveTintColor: colors.GREEN_COLOR ,
        tabBarInactiveTintColor: colors.GRAY_COLOR_ICON,
        tabBarStyle: {
            height: 70 + insets.bottom,
            borderTopWidth: 1,
            elevation: 0,
            borderTopColor: '#F2F2F2',
            // backgroundColor:'transparent',
        },
        tabBarLabelStyle: {
            ...gs.fontCaptionSmallMedium,
            bottom: 12,
            marginTop: 12,

        },
        headerShown: false,
        tabBarAllowFontScaling: false,
      })}
    >
      <Tab.Screen name="Профиль" component={ProfileScreen} />
      <Tab.Screen name="Календарь" component={CalendarScreen} />
     <Tab.Screen name="Дом" component={IFGHome}  />
     {userStore.userInfo !== null ? <Tab.Screen name="Материалы" component={MaterialsScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <View>
            { focused ? <MaterialsActive /> : <Materials />}
            {userStore.userInfo?.unseenArticles && <View
              style={s.badge}
            />}
          </View>
        ),
      }}/> : null}
      <Tab.Screen name="Конкурсы" component={ContestsScreen}   />
    </Tab.Navigator>
    </>
  );
});

const s = StyleSheet.create({
    badge:{
      position: 'absolute',
      top: 0,
      right: -6,
      width: 8,
      height: 8,
      backgroundColor: '#FA5D5D',
      borderRadius: 4,
      },
  });

