
import React, { FC, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Easing, LayoutAnimation, Platform, UIManager, Image, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
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
import GoalSettings from '../../../../assets/icons/goalSettings.svg';
import Separator from '../../../../assets/icons/separator.svg';
import { Button } from '../../../core/components/button/button';
import { useNavigation } from '@react-navigation/native';
import userStore from '../../../../store/state/userStore/userStore';
import { observer } from 'mobx-react';
import { IFGScoreLine } from '../../../core/components/ifg-score/ifg-score-line';
import { useImageUploader } from '../../../core/components/imagePicker/imagePicker';
import ifgScoreStore from '../../../../store/state/ifgScoreStore/ifgScoreStore';
import dailyActivityStore from '../../../../store/state/activityGraphStore/activityGraphStore';
import { DailyActivityModel } from '../../../../store/state/activityGraphStore/models/models';
import { categoryColors, categoryColorsEng } from '../../../core/colors/categoryColors';
import { RecommendationCategoryToRu } from '../../../core/utils/recommendationFormatter';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { ScreenWidth } from '../../../hooks/useDimensions';
import { API_URL } from '../../../core/hosts';
import testingStore from '../../../../store/state/testingStore/testingStore';
import { clearObserving } from 'mobx/dist/internal';
import { IFGActivityToday } from '../../../core/components/ifg-score/ifg-activityToday';
import FastImage from 'react-native-fast-image'

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

export const ActivityBlock = observer(() => {
    const navigation = useNavigation<any>();
    const {selectImage} = useImageUploader();
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

    useEffect(() => {
      // console.log('dailyActivitySettings', dailyActivityStore.dailyActivitySettings);
      // console.log('lastTest', testingStore.myCurrentResultsTest);
    }, []);

return <CardContainer >
{!userStore.isLoading ?
  <View style={[gs.flexRow, gs.alignCenter, { justifyContent: 'space-between', width: '100%', flexWrap: 'nowrap' }]}>
  {/* Левая часть с фото и текстом */}
  <View style={[gs.flexRow, gs.alignCenter, { flexShrink: 1 }]}>
    <View style={s.photo}>
      {userStore.userInfo?.profile_photo_url ? (
        <FastImage
          style={{ width: '100%', height: '100%' }}
          source={{
            uri: `${!userStore.userInfo?.profile_photo_url.startsWith('https://') ? API_URL + '/storage/' : ''}${userStore.userInfo?.profile_photo_url}`,
          }}
        />
      ) : (
        <ProfileHolder />
      )}
    </View>
    <TouchableOpacity onPress={selectImage} style={s.pin}>
      <Plus />
    </TouchableOpacity>
    <View style={[gs.ml12, { flexDirection: 'column', flexShrink: 1, maxWidth: 245 }]}>
      {(userStore.userInfo?.name || userStore.userInfo?.last_name) ? (
        <IfgText style={[gs.fontCaption, gs.bold]}>
          {userStore.userInfo?.name + '\n' + userStore.userInfo?.last_name}
        </IfgText>
      ) : (
        <IfgText  style={[gs.fontCaption, gs.bold]}>
          {userStore.userInfo?.email}
        </IfgText>
      )}
      <TouchableWithoutFeedback disabled={dailyActivityStore.dailyActivitySettingLoading} onPress={() => navigation.navigate('GoalSettings')}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          <IfgText color="#747474">Настроить цели</IfgText>
          <GoalSettings />
        </View>
      </TouchableWithoutFeedback>
    </View>
  </View>

  {/* Кнопка "В профиль" */}
  <View style={{ flexShrink: 1 }}>
  <Button style={s.buttonBack} onPress={() => navigation.navigate('Профиль')}>
    <>
      <IfgText color={colors.GRAY_COLOR3} style={[gs.fontBody2]}>В профиль</IfgText>
      <View style={{ marginTop: 2 }}>
        <ArrowRightGray />
      </View>
    </>
  </Button>
</View>
</View>
  :
  <ShimmerPlaceholder style={{borderRadius: 8}} height={40} width={ScreenWidth - 64} />
}
{!testingStore.isLoading ? <>
<CardContainer style={{backgroundColor: '#EFFCF4', borderRadius: 16, gap: 0, padding: ScreenWidth > 370 ? 16 : 12}}>
  <View style={[gs.flexRow, {justifyContent: 'space-between'}]} >
      <View style={[gs.flexRow, gs.alignCenter]}>
        <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption2, gs.mr4]}>
        Уровень баланса
        </IfgText>
        <Question />
      </View>
      <TouchableOpacity activeOpacity={1}  onPress={toggleExpand} style={[gs.flexRow, gs.alignCenter]}>
        <IfgText style={[gs.fontCaption2, gs.bold, gs.mr6]}>
          {testingStore.myCurrentResultsTest.balanceLvl}
        </IfgText>
        <TouchableOpacity disabled style={{ transform: [{ scaleY: scaleY }] }}>
          <Open />
        </TouchableOpacity>
      </TouchableOpacity>
  </View>

  <Animated.View style={{ height: height, opacity: opacity, gap: 6  }}>

  {expanded && <>
  <View style={gs.mt12}/>
  {['Питание', 'Антистресс', 'Сон', 'Физическая активность'].map((name, index)=>
  <View key={index.toString()} style={[gs.alignCenter, gs.flexRow]}>
    <IfgText color={'#747474'} style={[gs.fontCaptionSmallMedium, gs.regular, {width: 80}]}>
      {name !== 'Физическая активность' ? name : 'Активность'}
    </IfgText>
    <ProgressBar width={testingStore.myCurrentResultsTest.activiti_value_json[name] / testingStore.myCurrentResultsTest.maxValues[name] * 100 || 0} color={categoryColors[name]}/>
  </View>)}</>}
  </Animated.View>

  </CardContainer>
  <IFGScoreLine score={ifgScoreStore.todayScore} title={'ifg-баллы за сегодня'} maximum={dailyActivityStore.dailyActivitySettings.ifg_scores > dailyActivityStore.dailyActivitySettings.max_ifg ? dailyActivityStore.dailyActivitySettings.max_ifg : dailyActivityStore.dailyActivitySettings.ifg_scores}/>
  <IFGActivityToday dailySettings={dailyActivityStore.dailyActivitySettings}/>
  </>
  :

  <ShimmerPlaceholder style={{borderRadius: 22}} height={210} width={ScreenWidth - 64}/>}

  {/* {dailyActivityStore.dailyTodayActivityData && } */}


</CardContainer>;});


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
    buttonBack: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        backgroundColor: 'transparent',
        borderColor: colors.BORDER_COLOR2,
        borderWidth: 0.75,
        borderRadius: 8,
        width: 102,
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
