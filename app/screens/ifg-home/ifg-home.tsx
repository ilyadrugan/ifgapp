

import { ScrollView, StyleSheet, View, Image, ImageBackground, TouchableOpacity} from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { IfgText } from '../../core/components/text/ifg-text';
import colors from '../../core/colors/colors';
import gs from '../../core/styles/global';
import { CardContainer } from '../../core/components/card/cardContainer';
import ArrowTo from '../../../assets/icons/arrow-to.svg';
import ArrowRightBlack from '../../../assets/icons/arrow-right-black.svg';
import ArrowRight from '../../../assets/icons/arrow-right.svg';

import { Button, ButtonNext, ButtonTo } from '../../core/components/button/button';
import { ActivityBlock } from './blocks/activityBlock';
import { RecommendationBlock } from './blocks/recommendationBlock';
import { TimeToDrinkBlock } from './blocks/timeToDrink';
import { ArticleHeader } from './components/articleHeader';
import { Materials } from '../individualProgramm/recomendationData/recomendationData';
import {ShadowGradient} from '../../core/components/gradient/shadow-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChatFooter } from './blocks/chat-footer';

const backCardHeight = 180;
export const IFGHome = () => {
    const navigation = useNavigation<any>();

    // const rotateInterpolation = rotation.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: ['0deg', '-180deg'],
    // });
return <>

      <ScrollView style={s.container}>
        <View style={gs.mt16} />
        <IfgText style={[gs.h2, gs.bold]} >{'Дом IFG'}</IfgText>
        <View style={gs.mt16} />
        <ActivityBlock />
        <View style={gs.mt24} />
        <View style={[gs.flexRow, {justifyContent: 'space-between'}]}>
            <IfgText style={[gs.fontBodyMedium, gs.bold]}>Рекомендации</IfgText>
            <Button style={s.buttonToCalendar} onPress={()=>console.log('buttonToCalendar')}>
            <>
            <IfgText color={colors.GRAY_COLOR3} style={gs.fontBody2}>В календарь</IfgText>

                <ArrowTo />
                </>
            </Button>
        </View>
        <RecommendationBlock />
        <TimeToDrinkBlock />

        <View style={gs.mt16} />
        <CardContainer  >
          <ArticleHeader
            isNew
            time={'10:00'}
            hashTagColor={colors.PINK_COLOR}
            hashTagText={'#Активность'}
          />
          <IfgText style={[gs.fontCaption, gs.bold]}>Ходите по лестнице или на степпере</IfgText>
          <View style={[gs.flexRow, gs.alignCenter]}>
            <Image
            resizeMode="contain"
            style={{width: 44, height: 44}}
            source={require('../../../assets/backgrounds/article1.png')}
            />
            <IfgText style={[gs.fontCaptionSmall, gs.ml12, {width: '80%'}]}>Куда бы вы ни пошли сегодня, старайтесь выбирать лестницу, а не лифт или эскалатор, и поднимайтесь на нужный...</IfgText>
          </View>
        </CardContainer>

        <View style={gs.mt16} />
        <CardContainer  >
          <ArticleHeader
            time={'10:00'}
            hashTagColor={colors.PINK_COLOR}
            hashTagText={'#Активность'}
          />
          <IfgText style={[gs.fontCaption, gs.bold]}>Узнайте, чем полезна ходьба</IfgText>
          <View style={[gs.flexRow, gs.alignCenter]}>
            <Image
            resizeMode="contain"
            style={{width: 44, height: 44}}
            source={require('../../../assets/backgrounds/article2.png')}
            />
            <IfgText style={[gs.fontCaptionSmall, gs.ml12, {width: '80%'}]}>Кто-то из вас более спортивный, а кто-то последний раз занимался спортом на уроке физкультуры. Ничего страшного!</IfgText>
          </View>
          <IfgText style={[gs.fontCaptionSmall]}>👋🏻Узнайте подробнее о важности ходьбы в нашей статье...</IfgText>
          <ButtonNext title="Читать статью" oliveTitle="+ 3 балла" />
        </CardContainer>

        <View style={gs.mt16} />
        <View style={gs.flexRow}>
          <Button style={s.buttonTo} onPress={()=>console.log('7recs')}>
              <IfgText color={colors.GRAY_COLOR3} style={[gs.fontBody2, gs.light, {lineHeight: 16}]}>Ранее - 7 рекомендаций</IfgText>
          </Button>
        </View>

        <View style={gs.mt24} />
          <View style={[gs.flexRow, {justifyContent: 'space-between', alignItems: 'center'}]}>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontBodyMedium, gs.bold]}>Полезное</IfgText>
            <ButtonTo title="Все материалы" />
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
              <CardContainer key={id.toString()} style={[{width: 200, padding:0 , overflow: 'hidden', borderWidth: 1, borderColor: '#E7E7E7'  }, gs.mr12]} >
                <Image resizeMode="cover"  source={img}
                style={{ height: 114, width: '100%' }}
                />
                <View style={{padding: 14}}>
                <IfgText style={[gs.fontCaption2, gs.bold]}>{title}</IfgText>
                <IfgText style={[gs.fontCaptionSmall, gs.mt8]}>{text}</IfgText>
                </View>
            </CardContainer>)}
          </View>
        </ScrollView>

        <View style={gs.mt24} />
          <View style={[gs.flexRow, {justifyContent: 'space-between', alignItems: 'center'}]}>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontBodyMedium, gs.bold]}>Полезное</IfgText>
            <ButtonTo title="Все конкурсы" />
          </View>
          <View style={gs.mt16} />
          <ScrollView
                style={{marginHorizontal: -16, paddingHorizontal: 16  }}
                horizontal
                contentContainerStyle={{flexGrow: 1, flexDirection: 'column'}}
                showsHorizontalScrollIndicator={false}
                >

          <View style={{flexDirection: 'row'}} >
              {[0,1,2].map((val, index)=>
              <CardContainer key={index.toString()} style={[{width: 190, padding:14, borderWidth: 1, borderColor: '#E7E7E7' }, gs.mr12]} >
                <IfgText style={[gs.fontCaption2, gs.bold]}>{'3 коврика для йоги и занятий спортом'}</IfgText>

                <Image resizeMode="contain"  source={require('../../../assets/backgrounds/carpet.png')}
                style={{ height: 114, width: '100%' }}
                />
                <Button fullWidth style={[gs.flexRow, gs.alignCenter,{paddingHorizontal: 12, height: 30,borderWidth: 0.75, borderRadius: 6, borderColor: '#E6E6E6', justifyContent: 'space-between' }]}>
                  <>
                  <IfgText style={gs.fontBody2}>Как получить приз</IfgText>
                  <View style={{marginTop:2}}>
                    <ArrowRightBlack width={12} />
                  </View>
                  </>

                </Button>
            </CardContainer>)}
          </View>


        </ScrollView>
        <View style={gs.mt24} />
          <ImageBackground
        resizeMode="stretch"
         source={require('../../../assets/backgrounds/gradientCard3.png')}
        style={[s.cardGradientContainer]}
         >
            <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption, gs.bold]}>Финансовая защита заемщиков кредитов</IfgText>
            <IfgText  color={colors.WHITE_COLOR} style={gs.fontCaptionSmall}>Узнайте как защитить себя и своих близких на случай непредвиденных ситуаций с жизнью и здоровьем в совместном проекте АльфаСтрахование-Жизнь и ifeelgood!</IfgText>
            <Button outlined style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderColor: colors.WHITE_COLOR, borderWidth: 1, padding: 20, borderRadius: 12, height: 60}}>
                <>
                    <IfgText color={colors.WHITE_COLOR} style={gs.fontBodyMedium}>Подробнее</IfgText>
                    <ArrowRight />
                </>
            </Button>
         </ImageBackground>

        <View style={{height: 70}}/>
      </ScrollView>
      <ChatFooter />
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
    deleteCardButton: {
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.WHITE_COLOR,
      alignItems: 'center',
      justifyContent: 'center',
      height: 'auto',
      padding: 4,
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
    buttonTo: {
      flexDirection: 'row',
      gap: 6,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: colors.BORDER_COLOR3,
      borderWidth: 0.75,
      borderRadius: 8,
      paddingHorizontal: 12,
      // paddingVertical: 8,
      height: 30,
      },
    cardGradientContainer:{
        flex: 1,
        padding: 16,
        flexDirection: 'column',
        gap: 10,
      },

  });

