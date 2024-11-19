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

const Tab = createBottomTabNavigator();

export const Main: FC = () => {
  const insets = useSafeAreaInsets();

  const frame = useSafeAreaFrame();
  const deviceHeight = frame.height;

  return (
    <View style={{ height: deviceHeight}}>
      <Tab.Navigator initialRouteName="Profile"
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
      <Tab.Screen name="Календарь" component={ProfileScreen} />
      <Tab.Screen name="Дом" component={ProfileScreen}  />
      <Tab.Screen name="Материалы" component={ProfileScreen} />
      <Tab.Screen name="Конкурсы" component={ProfileScreen}   />
    </Tab.Navigator>
    </View>
  );
};
const s = StyleSheet.create({
    center: {
      alignItems: 'center',
      gap: 0,
    },
    tabBar: {
      height: 60,
      paddingBottom: 5,
      borderTopWidth: 1,
      borderTopColor: '#E6E6E6',
    },
    tabLabel: {
      fontSize: 12,
      paddingBottom: 2,
    },
    icon: {
        tintColor: '#100', // Изменяет цвет иконки
      },
  });
