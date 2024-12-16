

import { Image, ScrollView, StyleSheet, View, TouchableOpacity, Animated, Easing, Keyboard, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, UIManager, LayoutAnimation, RefreshControl} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';

import { useNavigation } from '@react-navigation/native';
import { IfgText } from '../../core/components/text/ifg-text';
import colors from '../../core/colors/colors';
import gs from '../../core/styles/global';
import { CardContainer } from '../../core/components/card/cardContainer';
import ProfileHolder from '../../../assets/icons/profileHolder.svg';
import BurgerMenu from '../../../assets/icons/burger-menu.svg';
import Plus from '../../../assets/icons/plus.svg';
import Trash16 from '../../../assets/icons/trash16.svg';
import Trash18 from '../../../assets/icons/trash18.svg';
import Visa from '../../../assets/icons/visa.svg';

import { Button } from '../../core/components/button/button';
import { menuOptions } from './data/menuOptions';
import { Subscription } from './subscription/subscription';
import { MyTests } from './myTests/myTests';
import { MyMaterials } from './myMaterials/myMaterials';
import { MyEvents } from './myEvents/myEvents';
import { Settings } from './settings/settings';
import userStore from '../../../store/state/userStore/userStore';
import { deleteAuthTokenToStorage } from '../../core/utils/bearer-token';
import authStore from '../../../store/state/authStore/authStore';
import { observer } from 'mobx-react';
import { useImageUploader } from '../../core/components/imagePicker/imagePicker';
import articlesStore from '../../../store/state/articlesStore/articlesStore';
const backCardHeight = 180;
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
export const ProfileScreen = observer(() => {
    const navigation = useNavigation<any>();
    const [expanded, setExpanded] = useState(false); // Состояние раскрытия
    const [currentMenu, setCurrentMenu] = useState(4);
    const [refreshing, setRefreshing] = React.useState(false);
    const {selectImage} = useImageUploader();
    const onRefresh = async () => {
      setRefreshing(true);
      await userStore.getProfile();
      await articlesStore.getUserArticles();
      setRefreshing(false);
    };

    const animation = useRef(new Animated.Value(0)).current;
    const exit = async() => {
      await authStore.logout().then(()=>{
        navigation.replace('Login');
      });

    };
    const height = useRef(new Animated.Value(0)).current; // Высота анимации
    const [contentVisible, setContentVisible] = useState(false); // Контроль видимости контента
    const opacity = useRef(new Animated.Value(0)).current;
    const toggleExpand = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      // Запускаем анимацию прозрачности
      if (!expanded) {
         setExpanded(!expanded);
        Animated.parallel([
          Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(height, {
          toValue: 64 * 6,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
      ]).start();
      } else {
        Animated.parallel([
          Animated.timing(opacity, {
          toValue: 0,
          duration: 300, // Время появления
          useNativeDriver: false,
        }),
        Animated.timing(height, {
          toValue: 0, // Высота раскрытого контейнера
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
      ]).start(()=>setExpanded(!expanded));
      }

    };

    const chooseMenu = (id: number) => {
      if (id === 5) {exit();}
      setCurrentMenu(id);
      toggleExpand();
    };
    useEffect(() => {
      if (authStore.access_token) {
        userStore.getProfile();
      }

    },[]);

return <>
  <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={gs.flex1}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={s.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={gs.mt16} />
        <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.h2, gs.bold]} >{menuOptions[currentMenu].name}</IfgText>
        <View style={gs.mt16} />

        <CardContainer style={{gap: 0}}>
          {userStore.userInfo?.name && <View style={[gs.flexRow, gs.alignCenter, {justifyContent: 'space-between'}]}>
            <View style={[gs.flexRow, gs.alignCenter]}>
            <View style={s.photo}>
        {userStore.userInfo?.profile_photo_url ?
        <Image style={{width: '100%', height: '100%'}} source={{uri: userStore.userInfo?.profile_photo_url}}/>
        :
        <ProfileHolder />}

                </View>
                  <TouchableOpacity onPress={()=>selectImage()} style={s.pin}>
                    <Plus />
                  </TouchableOpacity>
                 <View style={gs.ml12}>
                  <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption,gs.bold]}>{userStore.userInfo?.name} {userStore.userInfo?.last_name}</IfgText>
                  <IfgText color={colors.PLACEHOLDER_COLOR} style={gs.fontCaption3}>{userStore.userInfo?.email}</IfgText>
                </View>
            </View>
            <TouchableOpacity style={gs.tapArea} onPress={toggleExpand}>
              <BurgerMenu />
            </TouchableOpacity>
          </View>}
          <Animated.View style={{ opacity: opacity,  height: height}}>

          {expanded &&
          <><View style={gs.mt12} />
            {menuOptions.map((option)=>

              <Button key={option.id.toString()} onPress={()=>chooseMenu(option.id)} style={currentMenu === option.id ? s.menuButtonActive : s.menuButton}>
              <View style={[gs.flexRow, gs.alignCenter]}>
                <View style={s.iconButtonContainer}>
                {currentMenu === option.id ? option.iconActive : option.icon}
                </View>
                <IfgText color={currentMenu === option.id ? colors.WHITE_COLOR : colors.PLACEHOLDER_COLOR} style={[gs.fontBodyMedium, gs.regular, gs.ml16]}>{option.name}</IfgText>
              </View>
            </Button>)}
            </>}
          </Animated.View>
        </CardContainer>

        <View style={gs.mt16} />
        {currentMenu === 0 && <MyEvents />}
        {currentMenu === 1 && <MyTests />}
        {currentMenu === 2 && <MyMaterials />}
        {currentMenu === 3 && <Settings onRefresh={onRefresh} />}
        {currentMenu === 4 && <Subscription />}

        <View style={{height: 70}}/>
      </ScrollView>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>;

  });
const s = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        padding: 16,
      },
    photo: {
      backgroundColor: '#F4F4F4',
      width: 52,
      height: 52,
      borderRadius: 26,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    pin: {
      backgroundColor: colors.ORANGE_COLOR,
      width: 16,
      height: 16,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      left: 0,
      top: 0,
    },
    subsriptionCard: {
      backgroundColor: '#EFFCF4',
      gap: 6,
    },
    unsubscribeButton: {
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: colors.GREEN_COLOR,
      borderWidth: 1,
      borderRadius: 16,
    },
    bankCardContainer: {
      justifyContent: 'space-between',
      backgroundColor: colors.GREEN_COLOR,
      height: backCardHeight,
      borderRadius: 12,
    },
    bankCardAddContainer:{
      backgroundColor: '#F1F2F3',
    },
    deleteCardButton: {
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.WHITE_COLOR,
      alignItems: 'center',
      justifyContent: 'center',
      height: 'auto',
      padding: 4,
    },
    deleteButton:{
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.WHITE_COLOR,
      alignItems: 'center',
      justifyContent: 'center',
      height: 'auto',
      padding: 6,
    },
    plusContainer: {
      width: 12,     // Размер контейнера для иконки
      height: 12,
      justifyContent: 'center',
      alignItems: 'center',

    },
    horizontal: {
      position: 'absolute',
      width: 12,     // Длина горизонтальной линии
      height: 2,     // Толщина линии
      backgroundColor: colors.GRAY_COLOR5,
    },
    vertical: {
      position: 'absolute',
      width: 2,      // Толщина линии
      height: 12,    // Длина вертикальной линии
      backgroundColor: colors.GRAY_COLOR5,
      left: 5,
      top: -5,
      marginTop: 6,
    },
    menuButton:{
      padding: 16,
      backgroundColor: '#EFFCF4',
      borderRadius: 12,
      marginTop: 6,
    },
    menuButtonActive: {
      backgroundColor: colors.GREEN_COLOR,
      padding: 16,
      borderRadius: 12,
    },
    iconButtonContainer: {
      width: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

