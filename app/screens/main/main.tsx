import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { FC, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
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
import { IfgText } from '../../core/components/text/ifg-text';
import colors from '../../core/colors/colors';
import { ProfileScreen } from '../profile/profile';
import { IFGHome } from '../ifg-home/ifg-home';
import { MaterialsScreen } from '../materials/materials';
import { observer } from 'mobx-react';
import { ContestsScreen } from '../contests/contests';
import { CalendarScreen } from '../calendar/calendar';

const Tab = createBottomTabNavigator();

export const Main: FC = observer(() => {
  const insets = useSafeAreaInsets();

  const frame = useSafeAreaFrame();
  const deviceHeight = frame.height;

  return (
    <View style={{ height: deviceHeight}}>
      <Tab.Navigator initialRouteName="Календарь"
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
            case 'Материалы':
              return focused ? <MaterialsActive /> : <Materials />;
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
      })}
    >
      <Tab.Screen name="Профиль" component={ProfileScreen} />
      <Tab.Screen name="Календарь" component={CalendarScreen} />
      <Tab.Screen name="Дом" component={IFGHome}  />
      <Tab.Screen name="Материалы" component={MaterialsScreen} />
      <Tab.Screen name="Конкурсы" component={ContestsScreen}   />
    </Tab.Navigator>
    </View>
  );
});
