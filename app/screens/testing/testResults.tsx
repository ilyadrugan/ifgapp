import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, View, Image, Dimensions, Linking } from 'react-native';
import { IfgText } from '../../core/components/text/ifg-text';
import gs from '../../core/styles/global';
import colors from '../../core/colors/colors';
import { Button } from '../../core/components/button/button';
import ArrowBack from '../../../assets/icons/arrow-back.svg';
import ArrowRight from '../../../assets/icons/arrow-right.svg';
import Question from '../../../assets/icons/question.svg';
import Accept from '../../../assets/icons/accept.svg';
import Play from '../../../assets/icons/play.svg';

import { CardContainer } from '../../core/components/card/cardContainer';
import LinearGradient from 'react-native-linear-gradient';
import { individualProgramm, IndividualProgrammData } from './testData/individualProgramm';
import authStore from '../../../store/state/authStore/authStore';
import { ActivitiValueModel } from '../../../store/state/testingStore/models/models';
import { html } from './mocksHtmlResults/htmlResults';
import testingStore from '../../../store/state/testingStore/testingStore';
// import VideoPlayer from 'react-native-video-player';

export const ResultTest = ({route}) => {
    // const url = 'https://rutube.ru/video/678aa2fab3084ec54829979c92bc2281/';
    const navigation = useNavigation<any>();
    const [balanceLvl, setBalanceLvl] = useState(0);
    const {testId} = route.params;
    const onBack = () => navigation.goBack();
    useEffect(()=>{
      console.log('authStore', authStore.access_token);
      if (testId) {
       testingStore.setMyCurrentResultsTest(testId);
        const summ = testingStore.myCurrentResultsTest.total_score;
        console.log('testingStore.myCurrentResultsTest',testingStore.myCurrentResultsTest);
        if (summ <= 40) {setBalanceLvl(0);}
        else if (summ <= 80) {setBalanceLvl(1);}
        else if (summ <= 120) {setBalanceLvl(2);}
        else if (summ <= 140) {setBalanceLvl(3);}
        else if (summ <= 160) {setBalanceLvl(4);}
        else {setBalanceLvl(5);}
      }
    }, [testId]);
    return (<>
    <ScrollView style={s.container}>
        <View style={gs.mt16} />
        <Button style={s.buttonBack} onPress={onBack}>
            <>
                <ArrowBack />
                <IfgText color={colors.GRAY_COLOR3} style={gs.fontBody2}>Назад</IfgText>
                </>
        </Button>
        <View style={gs.mt16} />

        <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.h2, gs.bold]}>
        Результаты тестирования
        </IfgText>
        <View style={gs.mt16} />
        <CardContainer style={[s.cardContainer, {borderColor: html[balanceLvl].color}]} >
            <View style={[gs.flexRow, gs.alignCenter, {gap: 6}]}>
                <IfgText color={colors.PLACEHOLDER_COLOR} style={gs.fontCaption2}>Ваш ifg-уровень</IfgText>
                <Question />
            </View>
            <View style={[gs.flexRow, gs.alignCenter, {gap: 6}]}>
                <View style={[s.circle, {backgroundColor: html[balanceLvl].color}]} >
                    <Accept />
                </View>
                <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.bold]}>{html[balanceLvl].title}</IfgText>
            </View>
        </CardContainer>
        <View style={gs.mt16} />
        <CardContainer>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontBodyMedium, gs.bold]}>Ваша ключевая задача</IfgText>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption2]}>{html[balanceLvl].quote}</IfgText>
        </CardContainer>
        <View style={gs.mt16} />
        <CardContainer>
            <IfgText style={[gs.fontBodyMedium, gs.bold]}>Что означает?</IfgText>
            <IfgText style={[gs.fontCaption2]}><IfgText style={gs.bold}>{html[balanceLvl].html[0]}</IfgText>{html[balanceLvl].html[1]}</IfgText>
            <IfgText style={[gs.fontCaption2]}>{html[balanceLvl].html[2]}</IfgText>
        </CardContainer>
        <View style={gs.mt16} />
        <ImageBackground
        resizeMode="stretch"
         source={require('../../../assets/backgrounds/gradientCard2.png')}
        style={[s.cardGradientContainer]}
         >
            <IfgText color={colors.WHITE_COLOR} style={[gs.fontBodyMedium, gs.bold]}>Начинайте сейчас!</IfgText>
            <IfgText color={colors.WHITE_COLOR} style={gs.fontCaptionSmall}>Поможем сделать первые шаги на пути к хорошему самочувствию. Запускайте бот-помощник и внедряйте полезные привычки вместе с нами в течение 21 дня.</IfgText>
            <Button onPress={()=>Linking.openURL('https://t.me/ifgbot_bot')} style={s.howItWorksButton}>
                <>
                    <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption, gs.medium]}>Начать</IfgText>
                    <Play />
                </>
            </Button>
         </ImageBackground>
         <View style={gs.mt16} />
         <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontBodyMedium, gs.bold]}>
         Индивидуальная ifeelgood программа
        </IfgText>
        <View style={gs.mt16} />
        <IndividualProgrammData />
        <View style={{height: 180}}/>

        <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 0.75)' ]}
            style={s.shadowGradient}
        />
        </ScrollView>
        <View style={s.footer}>
        <Button style={s.buttonNext}
           onPress={()=> authStore.access_token ? navigation.replace('IndividualProgramm') : navigation.navigate('Registration')}
           >
           <View style={{
               flexDirection: 'row',
               justifyContent: 'space-between',
               alignItems: 'center',

               }}>
               <View style={{
                   width:'100%',
                   flexDirection: 'row',
                   justifyContent: 'space-between',
                   alignItems: 'center',
               }}>
                <IfgText color={colors.WHITE_COLOR} style={gs.fontBodyMedium}>{'Продолжить'}</IfgText>
                   <ArrowRight />
               </View>

               <View />
           </View>
        </Button>
    </View>
</>
    );
  };

const s = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: colors.BACKGROUND_COLOR,
        paddingHorizontal: 16,

      },
      cardContainer:{
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        borderRadius: 24,
        borderColor: colors.GREEN_COLOR,
        borderWidth: 16,
        backgroundColor: '#ffffff',
      },
      cardGradientContainer:{
        flex: 1,
        padding: 16,
        flexDirection: 'column',
        gap: 10,
        borderRadius: 32,
      },
      imageStyle: {
        maxHeight: 110,
        maxWidth: '50%',
        position: 'absolute',
        bottom: 0,
        marginLeft: '62%',
      },
      buttonBack: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        backgroundColor: 'transparent',
        borderColor: colors.BORDER_COLOR2,
        borderWidth: 1,
        borderRadius: 8,
        width: 84,
        height: 26,
      },
       footer: {
        position:'absolute',
        bottom: 55,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 9999,
        elevation: 100,
    },

    shadowGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 160,
        zIndex:99,
        elevation: 10,
        marginHorizontal: -16,
      },
      buttonNext: {
        backgroundColor: colors.GREEN_COLOR,
        borderRadius: 16,
        paddingHorizontal: 24,
        height: 78,
        width: '86%',
      },
      circle: {
        width: 16,
        height: 16,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.GREEN_COLOR,
      },
      howItWorksButton: {
        borderRadius: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderColor: colors.WHITE_COLOR,
        borderWidth: 1,
        flexDirection: 'row',
        paddingHorizontal: 20,
      },
  });
