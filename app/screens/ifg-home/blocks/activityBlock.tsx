import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Easing, LayoutAnimation, Platform, UIManager } from 'react-native';
import colors from '../../../core/colors/colors';
import { CardContainer } from '../../../core/components/card/cardContainer';
import { IfgText } from '../../../core/components/text/ifg-text';
import gs from '../../../core/styles/global';
import { ProgressBar, ColumnarProgressBar } from '../components/progressBar';
import { BalanceLevel, ActivityStats } from '../data/data';
import ProfileHolder from '../../../../assets/icons/profileHolder.svg';
import ArrowRightGray from '../../../../assets/icons/arrow-right-gray.svg';
import Plus from '../../../../assets/icons/plus.svg';
import Question from '../../../../assets/icons/question.svg';
import Open from '../../../../assets/icons/open-up.svg';
import Separator from '../../../../assets/icons/separator.svg';
import { Button } from '../../../core/components/button/button';
import { useNavigation } from '@react-navigation/native';


if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

export const ActivityBlock = () => {
    const navigation = useNavigation<any>();
    const [expanded, setExpanded] = useState(false); // Состояние раскрытия
    const height = useRef(new Animated.Value(0)).current; // Высота анимации
    const opacity = useRef(new Animated.Value(0)).current;
    const scaleY = useRef(new Animated.Value(1)).current; // Начальное значение без зеркалирования

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
          toValue: 92,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
        Animated.timing(scaleY, {
          toValue: -1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
      } else {
        Animated.parallel([
          Animated.timing(opacity, {
          toValue: 0,
          duration: 100, // Время появления
          useNativeDriver: false,
        }),
        Animated.timing(height, {
          toValue: 0, // Высота раскрытого контейнера
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
        Animated.timing(scaleY, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(()=> setExpanded(!expanded));
      }
    };

return <CardContainer >
<View style={[gs.flexRow, gs.alignCenter, {justifyContent: 'space-between'}]}>
  <View style={[gs.flexRow, gs.alignCenter]}>
      <View style={s.photo}>
        <ProfileHolder />
        <TouchableOpacity style={s.pin}>
          <Plus />
        </TouchableOpacity>
      </View>

      <View style={gs.ml12}>

      <IfgText style={[gs.fontCaption,gs.bold]}>Иван Иванов</IfgText>
      </View>
  </View>
  <Button style={s.buttonBack} onPress={()=> navigation.navigate('Профиль')}>
    <>
      <IfgText color={colors.GRAY_COLOR3} style={[gs.fontBody2]}>В профиль</IfgText>
      <View style={{marginTop: 2}}>
        <ArrowRightGray  />
      </View>
      </>
  </Button>
</View>
<CardContainer style={{backgroundColor: '#EFFCF4', borderRadius: 16, gap: 0}}>
  <View style={[gs.flexRow, {justifyContent: 'space-between'}]} >
      <View style={[gs.flexRow, gs.alignCenter]}>
        <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption2, gs.mr4]}>
        Уровень баланса
        </IfgText>
        <Question />
      </View>
      <View style={[gs.flexRow, gs.alignCenter]}>
        <IfgText style={[gs.fontCaption2, gs.bold, gs.mr6]}>
          Начальный
        </IfgText>
        <TouchableOpacity style={{ transform: [{ scaleY: scaleY }] }} onPress={toggleExpand}>
          <Open />
        </TouchableOpacity>
      </View>
  </View>

  <Animated.View style={{ height: height, opacity: opacity, gap: 6  }}>

  {expanded && <>
  <View style={gs.mt12}/>
  {Object.keys(BalanceLevel).map((name, index)=>
  <View key={index.toString()} style={[gs.alignCenter, gs.flexRow]}>
    <IfgText color={'#747474'} style={[gs.fontCaptionSmallMedium, gs.regular, {width: 80}]}>
      {name}
    </IfgText>
    <ProgressBar  width={BalanceLevel[name].level} color={BalanceLevel[name].color}/>
  </View>)}</>}
  </Animated.View>

  </CardContainer>
  <View style={[gs.flexRow, {justifyContent: 'space-between'}]}>
    <IfgText style={[gs.fontCaption2, gs.bold]}>IFG-баллы за сегодня</IfgText>
    <IfgText color={colors.GREEN_COLOR} style={[gs.fontCaption, gs.bold]}>{86}</IfgText>
  </View>
  <ProgressBar color={colors.GREEN_LIGHT_COLOR} width={60} unfilledColor="#EDEDED" />
  <IfgText style={[gs.fontCaption2, gs.bold]}>Активность</IfgText>
  <View  style={[gs.flexRow, gs.alignCenter, {gap: 2, justifyContent: 'space-between'}]}>
  <View style={[gs.flexRow, {gap: 2}]}>
  {Object.keys(ActivityStats).map((name, index)=>

    <ColumnarProgressBar
    key={index.toString()}
      height={ActivityStats[name].value / ActivityStats[name].standart_value * 100}
      color={ActivityStats[name].color}/>
  )}
  </View>
  <View>
  <View style={[gs.flexRow]}>
  {Object.keys(ActivityStats).map((name, index, arr)=>
      <View style={gs.flexRow} key={index.toString()} >
      <View style={[index !== 0 && gs.ml12, {gap: 6}]}>
        <IfgText style={[gs.fontCaptionSmall, gs.medium]}>{name}</IfgText>
        <IfgText color={ActivityStats[name].color} style={[gs.fontCaptionMedium, gs.bold]}>{ActivityStats[name].value}</IfgText>
      </View>
      {index !== arr.length - 1 &&   <View style={gs.ml12} />}
        <Separator />
      </View>)
  }
  </View>

  </View>
  </View>


</CardContainer>;};


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
    buttonBack: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        backgroundColor: 'transparent',
        borderColor: colors.BORDER_COLOR2,
        borderWidth: 0.75,
        borderRadius: 8,
        width: 109,
        height: 24,
      },
      buttonToCalendar: {
        flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderColor: colors.BORDER_COLOR2,
    borderWidth: 0.75,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 26,
      },
  });
