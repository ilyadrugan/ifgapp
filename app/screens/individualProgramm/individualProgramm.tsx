import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, View, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import { IfgText } from '../../core/components/text/ifg-text';
import gs from '../../core/styles/global';
import colors from '../../core/colors/colors';
import { Button } from '../../core/components/button/button';

import ArrowBack from '../../../assets/icons/arrow-back.svg';
import ArrowRight from '../../../assets/icons/arrow-right.svg';
import ArrowTo from '../../../assets/icons/arrow-to.svg';

import Delete from '../../../assets/icons/delete.svg';
import Fish from '../../../assets/icons/fish.svg';
import Moon from '../../../assets/icons/moon.svg';
import Antistress from '../../../assets/icons/antistress.svg';

import { CardContainer } from '../../core/components/card/cardContainer';
import LinearGradient from 'react-native-linear-gradient';
import { VideoPlayer } from '../../core/components/videoplayer/videoplayer';
import { IndividualProgrammData } from '../testing/testData/individualProgramm';
import { CircularProgress } from '../../core/components/circularProgress/circularProgress';
import { Materials, Plan } from './recomendationData/recomendationData';
import {CheckBox} from '../../core/components/checkbox/checkbox';
export const IndividualProgramm = () => {
    const navigation = useNavigation<any>();
    const onBack = () => navigation.goBack();
    const url = 'https://getfile.dokpub.com/yandex/get/https://disk.yandex.ru/i/82jQ8PQ_rRCJeg';
    const [recommends, setRecommends] = useState(true);

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
        Индивидуальная i<IfgText color={colors.GREEN_LIGHT_COLOR} style={[gs.h2, gs.bold]}>feel</IfgText>good программа
        </IfgText>
        <View style={gs.mt16} />
        <IndividualProgrammData />
        <ImageBackground
        resizeMode="stretch"
         source={require('../../../assets/backgrounds/gradient3.png')}
        style={[s.cardGradientContainer]}
         >
            <IfgText style={[gs.fontBodyMedium, gs.bold]}>Начинайте сейчас!</IfgText>
            <IfgText style={gs.fontCaptionSmall}>Если становится тяжело, смотрите видео и читайте статьи о том, как чувствовать себя лучше — это поможет вам не сдаться.</IfgText>
            <Button style={s.howItWorksButton}>
                <>
                    <IfgText style={gs.fontBodyMedium}>Начать заниматься</IfgText>
                    <ArrowRight />
                </>
            </Button>
        <VideoPlayer source={url} title={'О платформе ifeelgood'}/>

         </ImageBackground>
         <View style={gs.mt24} />
         <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontBodyMedium, gs.bold]}>Ваш персональный план</IfgText>


         {recommends && <>
          <View style={gs.mt16} />
          <CardContainer style={{borderRadius: 12,paddingVertical: 8, backgroundColor: colors.BLUE_LIGHT_COLOR, justifyContent: 'space-between', flexDirection: 'row', alignItems:'center'}}>
          <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption3, {maxWidth: '80%'}]}>Выберите, какие рекомендации вы хотите получать в течение дня</IfgText>
           <TouchableOpacity onPress={()=>setRecommends(false)} style={s.circle}>
               <Delete />
          </TouchableOpacity>
        </CardContainer>
        </>}
        <View style={gs.mt16} />

        <CardContainer>
          <CardContainer style={{borderRadius: 12, height: 122, justifyContent: 'space-between',backgroundColor: colors.GREEN_LIGHT_COLOR, flexDirection: 'row'}} >
            <View style={{justifyContent: 'space-between', height: '100%'}}>
              <IfgText style={gs.fontCaptionMedium}>Питание</IfgText>
              <Fish />
            </View>
            <CircularProgress value={10} maxValue={30} />
          </CardContainer>
          <View style={[gs.flexRow]}>
            <IfgText color={colors.BLACK_COLOR} style={[gs.fontCaption3, gs.bold, {width: '50%'}]}>Активности</IfgText>
            <IfgText color={colors.BLACK_COLOR} style={[gs.fontCaption3, gs.bold]}>Цели</IfgText>
          </View>
          {Plan[0].activities.map((activity, index)=><View style={s.row}>
          <View style={{width: '45%', flexDirection: 'row', alignItems: 'center'}}>
            <CheckBox checked={true}/>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption3, gs.bold, gs.ml8, {maxWidth: '80%'}]}>{activity}</IfgText>
          </View>
          <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center'}}>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaptionSmall]}>{Plan[0].goals[index]}</IfgText>
          </View>
          </View>)}
        </CardContainer>
        <View style={gs.mt16} />
        <CardContainer>
          <CardContainer style={{borderRadius: 12, height: 122, justifyContent: 'space-between',backgroundColor: colors.ORANGE_COLOR, flexDirection: 'row'}} >
            <View style={{justifyContent: 'space-between', height: '100%'}}>
              <IfgText style={gs.fontCaptionMedium}>Сон</IfgText>
              <Moon />
            </View>
            <CircularProgress value={10} maxValue={30} />
          </CardContainer>
          <View style={[gs.flexRow]}>
            <IfgText color={colors.BLACK_COLOR} style={[gs.fontCaption3, gs.bold, {width: '50%'}]}>Активности</IfgText>
            <IfgText color={colors.BLACK_COLOR} style={[gs.fontCaption3, gs.bold]}>Цели</IfgText>
          </View>
          {Plan[1].activities.map((activity, index)=><View style={s.row}>
          <View style={{width: '45%', flexDirection: 'row', alignItems: 'center'}}>
            <CheckBox checked={true}/>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption3, gs.bold, gs.ml8, {maxWidth: '80%'}]}>{activity}</IfgText>
          </View>
          <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center'}}>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaptionSmall]}>{Plan[1].goals[index]}</IfgText>
          </View>
          </View>)}
        </CardContainer>
        <View style={gs.mt16} />
        <CardContainer>
          <CardContainer style={{borderRadius: 12, height: 122, justifyContent: 'space-between',backgroundColor: colors.OLIVE_COLOR, flexDirection: 'row'}} >
            <View style={{justifyContent: 'space-between', height: '100%'}}>
              <IfgText style={gs.fontCaptionMedium}>Антистресс</IfgText>
              <Antistress />
            </View>
            <CircularProgress value={10} maxValue={30} />
          </CardContainer>
          <View style={[gs.flexRow]}>
            <IfgText color={colors.BLACK_COLOR} style={[gs.fontCaption3, gs.bold, {width: '50%'}]}>Активности</IfgText>
            <IfgText color={colors.BLACK_COLOR} style={[gs.fontCaption3, gs.bold]}>Цели</IfgText>
          </View>
          {Plan[2].activities.map((activity, index)=><View style={s.row}>
          <View style={{width: '45%', flexDirection: 'row', alignItems: 'center'}}>
            <CheckBox checked={true}/>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption3, gs.bold, gs.ml8, {maxWidth: '80%'}]}>{activity}</IfgText>
          </View>
          <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center'}}>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaptionSmall]}>{Plan[1].goals[index]}</IfgText>
          </View>
          </View>)}
        </CardContainer>
        <View style={gs.mt24} />
          <View style={[gs.flexRow, {justifyContent: 'space-between'}]}>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontBodyMedium, gs.bold]}>А также читайте:</IfgText>
            <Button style={s.buttonToMAterials} onPress={()=>console.log('all materials')}>
            <>
            <IfgText color={colors.GRAY_COLOR3} style={gs.fontBody2}>Все материалы</IfgText>

                <ArrowTo />
                </>
        </Button>
          </View>
          <View style={gs.mt16} />
          <ScrollView
                style={{marginHorizontal: -16, paddingHorizontal: 16  }}
                horizontal
                contentContainerStyle={{flexGrow: 1, flexDirection: 'column'}}
                showsHorizontalScrollIndicator={false}
                >

        <View style={{flexDirection: 'row'}} >
              {Materials.map(({title, img, text, id})=>
              <CardContainer key={id.toString()} style={[{width: 200, padding:0 , overflow: 'hidden' }, gs.mr16]} >
                <Image resizeMode="cover"  source={img}
                style={{ height: 114, width: '100%' }}
                />
                <View style={{padding: 14}}>
                <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption2, gs.bold]}>{title}</IfgText>
                <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaptionSmall, gs.mt8]}>{text}</IfgText>
                </View>
            </CardContainer>)}
        </View>
    </ScrollView>
    <View style={{height: 180}}/>
    <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 0.75)' ]}
            style={s.shadowGradient}
        />
    </ScrollView>
    <View style={s.footer}>
    <Button style={s.buttonNext}
           onPress={()=>navigation.navigate('Main')}
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
                <IfgText style={gs.fontBodyMedium}>{'Начать следовать'}</IfgText>
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
  row:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 0.79,
    paddingTop: 16,
    paddingBottom: 10,
    borderTopColor: '#D1D1D1',
    borderStyle: 'dashed',
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
    borderWidth: 0.75,
    borderRadius: 8,
    width: 84,
    height: 26,
  },
  buttonToMAterials: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderColor: colors.BORDER_COLOR2,
    borderWidth: 0.75,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 26,
    width: 137,
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
  circle:{
    width: 16,
    height: 16,
    backgroundColor: colors.WHITE_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
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
