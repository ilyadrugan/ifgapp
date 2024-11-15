

import { Text, ScrollView, StyleSheet, View, TouchableOpacity, Animated, Easing} from 'react-native';
import React, {useRef, useState} from 'react';

import { useNavigation } from '@react-navigation/native';
import { IfgText } from '../../core/components/text/ifg-text';
import colors from '../../core/colors/colors';
import gs from '../../core/styles/global';
import { CardContainer } from '../../core/components/card/cardContainer';
import ProfileHolder from '../../../assets/icons/profileHolder.svg';
import KebabMenu from '../../../assets/icons/kebab-menu.svg';
import Plus from '../../../assets/icons/plus.svg';
import Trash16 from '../../../assets/icons/trash16.svg';
import Trash18 from '../../../assets/icons/trash18.svg';
import Visa from '../../../assets/icons/visa.svg';

import { Button } from '../../core/components/button/button';
import { menuOptions } from './data/menuOptions';

const backCardHeight = 180;

export const ProfileScreen = () => {
    const navigation = useNavigation<any>();
    const [isOpen, setIsOpen] = useState(false);
    const [currentMenu, setCurrentMenu] = useState(4);

    const animation = useRef(new Animated.Value(0)).current;

    const toggleMenu = () => {
      if (isOpen) {
        Animated.timing(animation, {
          toValue: 0,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start(() => setIsOpen(false));
      } else {
        setIsOpen(true);
        Animated.timing(animation, {
          toValue: 1,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start();
      }
    };
    const menuHeight = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 62 * 6], // высота меню
    });
return <>
      <ScrollView style={s.container}>
        <View style={gs.mt16} />
        <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.h2, gs.bold]} >{menuOptions[currentMenu].name}</IfgText>
        <View style={gs.mt16} />

        <CardContainer >
          <View style={[gs.flexRow, gs.alignCenter, {justifyContent: 'space-between'}]}>
            <View style={[gs.flexRow, gs.alignCenter]}>
                <View style={s.photo}>
                  <ProfileHolder />
                  <TouchableOpacity style={s.pin}>
                    <Plus />
                  </TouchableOpacity>
                </View>
                <View style={gs.ml12}>
                  <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption,gs.bold]}>Иван Иванов</IfgText>
                  <IfgText color={colors.PLACEHOLDER_COLOR} style={gs.fontCaption3}>vanek1109@gmail.com</IfgText>
                </View>
            </View>
            <TouchableOpacity onPress={toggleMenu}>
              <KebabMenu />
            </TouchableOpacity>
          </View>
          {isOpen && <Animated.View style={{gap: 6,  height: menuHeight}}>
            {menuOptions.map((option)=>
            <Button key={option.id.toString()} onPress={()=>setCurrentMenu(option.id)} style={currentMenu === option.id ? s.menuButtonActive : s.menuButton}>
              <View style={[gs.flexRow, gs.alignCenter]}>
                <View style={s.iconButtonContainer}>
                {currentMenu === option.id ? option.iconActive : option.icon}
                </View>
                <IfgText color={currentMenu === option.id ? colors.WHITE_COLOR : colors.PLACEHOLDER_COLOR} style={[gs.fontBodyMedium, gs.regular, gs.ml16]}>{option.name}</IfgText>
              </View>
            </Button>)}
          </Animated.View>}
        </CardContainer>

        <View style={gs.mt16} />
        <CardContainer style={{ gap: 16 }}>
        <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.bold]}>Подписка действует до 24 мая</IfgText>

          <CardContainer style={s.subsriptionCard}>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption2, gs.bold]}>Подписка IFeelGood Pro</IfgText>
            <View style={gs.mt6} />
            <IfgText color={colors.PLACEHOLDER_COLOR} style={gs.h1}>299 ₽</IfgText>
            <IfgText color={colors.SECONDARY_COLOR} style={gs.fontLightSmall}>Спишется 24 мая</IfgText>
            <View style={gs.mt6} />
            <Button outlined style={s.unsubscribeButton}>
                <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.medium]}>Отписаться</IfgText>
            </Button>
          </CardContainer>
          <View style={gs.mt4}>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.bold]}>Способы оплаты</IfgText>
            <IfgText color={colors.GREEN_LIGHT_COLOR} style={[gs.fontCaption3, gs.medium, gs.underline]}>Изменить метод оплаты</IfgText>
          </View>
          <CardContainer style={s.bankCardContainer}>
            <View style={[gs.flexRow, gs.alignCenter, {justifyContent: 'space-between'}]}>
              <Visa/>
              <Button outlined style={s.deleteCardButton}>
                <View style={gs.flexRow}>
                <Trash16/>
                <IfgText style={[gs.fontCaption3, gs.ml4]}>Удалить карту</IfgText>
                </View>
              </Button>
            </View>
            <View style={[gs.flexRow, gs.alignCenter, {justifyContent: 'space-between'}]}>
              <IfgText style={gs.fontCaption}>1817 • основной</IfgText>
              {/* <Button outlined style={s.deleteButton}>
                <Trash18/>
              </Button> */}
            </View>
          </CardContainer>
          <CardContainer style={[s.bankCardContainer,s.bankCardAddContainer]}>
          <View style={gs.mt4}>
              <View style={s.container}>
                <View style={s.horizontal} />
                <View style={s.vertical} />
              </View>
            </View>
            <IfgText color={colors.GRAY_COLOR5} style={gs.fontCaption}>Добавить карту</IfgText>
          </CardContainer>
        </CardContainer>

        <View style={{height: 70}}/>
      </ScrollView>
    </>;

  };
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
    },
    menuButton:{
      padding: 16,
      backgroundColor: '#EFFCF4',
      borderRadius: 12,
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

