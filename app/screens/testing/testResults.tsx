import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, View, Image, Dimensions } from 'react-native';
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
// import VideoPlayer from 'react-native-video-player';

export const ResultTest = () => {
    // const url = 'https://rutube.ru/video/678aa2fab3084ec54829979c92bc2281/';
    const navigation = useNavigation<any>();
    const onBack = () => navigation.goBack();

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
        <CardContainer style={s.cardContainer} >
            <View style={[gs.flexRow, gs.alignCenter, {gap: 6}]}>
                <IfgText color={colors.PLACEHOLDER_COLOR} style={gs.fontCaption2}>Ваш ifg-уровень</IfgText>
                <Question />
            </View>
            <View style={[gs.flexRow, gs.alignCenter, {gap: 6}]}>
                <View style={s.circle} >
                    <Accept />
                </View>
                <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.bold]}>Оптимальный</IfgText>
            </View>
        </CardContainer>
        <View style={gs.mt16} />
        <CardContainer>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontBodyMedium, gs.bold]}>Ваша ключевая задача</IfgText>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption2]}>баланс и постоянные практики по каждому из направлений.</IfgText>
        </CardContainer>
        <View style={gs.mt16} />
        <CardContainer>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontBodyMedium, gs.bold]}>Что означает?</IfgText>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption2]}>Результат тестирования свидетельствует о том, что вы либо выполняете абсолютный минимум для поддержки здоровья, либо у вас нарушен баланс. </IfgText>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption2]}>Например, вы можете правильно питаться и заниматься спортом, однако иметь высокий стресс на работе и не высыпаться. Вы поймёте это после ознакомления с рекомендациями!</IfgText>
        </CardContainer>
        <View style={gs.mt16} />
        <ImageBackground
        resizeMode="stretch"
         source={require('../../../assets/backgrounds/gradientCard2.png')}
        style={[s.cardGradientContainer]}
         >
            <IfgText  style={[gs.fontBodyMedium, gs.bold]}>Начинайте сейчас!</IfgText>
            <IfgText  style={gs.fontCaptionSmall}>Если становится тяжело, смотрите видео и читайте статьи о том, как чувствовать себя лучше — это поможет вам не сдаться.</IfgText>
            <Button style={s.howItWorksButton}>
                <>
                    <IfgText style={gs.fontBodyMedium}>Как это работает?</IfgText>
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
           onPress={()=>navigation.navigate('Registration')}
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
                <IfgText style={gs.fontBodyMedium}>{'Продолжить'}</IfgText>
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
        borderRadius: 26,
        borderColor: colors.GREEN_COLOR,
        borderWidth: 16,
        backgroundColor: '#EFFCF4',
      },
      cardGradientContainer:{
        flex: 1,
        padding: 16,
        flexDirection: 'column',
        gap: 10,
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
