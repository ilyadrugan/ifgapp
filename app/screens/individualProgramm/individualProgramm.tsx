import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { IfgText } from '../../core/components/text/ifg-text';
import gs from '../../core/styles/global';
import colors from '../../core/colors/colors';
import { Button, ButtonNext, ButtonTo } from '../../core/components/button/button';

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
import testingStore from '../../../store/state/testingStore/testingStore';
import articlesStore from '../../../store/state/articlesStore/articlesStore';
import { observer } from 'mobx-react';
import { ActivitiValueModel } from '../../../store/state/testingStore/models/models';

export const IndividualProgramm = observer(({route}) => {
    const navigation = useNavigation<any>();
    const { params } = route;
    const activiti_value_json = params?.activiti_value_json;
  const [activityValue, setActivityValue] = useState<ActivitiValueModel>();
    console.log(activiti_value_json);

    // const { activiti_value_json } = route.params || undefined;
    // console.log('activiti_value_json', activiti_value_json);
    const onBack = () => navigation.goBack();
    const url = 'https://getfile.dokpub.com/yandex/get/https://disk.yandex.ru/i/82jQ8PQ_rRCJeg';
    const [recommends, setRecommends] = useState(true);
    useEffect(() => {
      if (!activiti_value_json) {
        console.log('activiti_value_json is undefined');
        getMyTests().then(()=>setActivityValue(JSON.parse(testingStore.testsList[0].activiti_value_json)));
      }
      else {
        setActivityValue(activiti_value_json);
      }

    }, []);
    const getMyTests = async () => await testingStore.getAllMyTest();

    const MaterialCard = ({title, media, subtitle, id}, index)=>
      <CardContainer onPress={()=>navigation.replace('ArticleView', {articleId: id})} key={index.toString() + 'key'} style={[{width: 200, height: 256, padding:0 , overflow: 'hidden', borderWidth: 1, borderColor: '#E7E7E7'  }, gs.mr12, index === 0 && gs.ml16]} >
                {media.length > 0 ? <Image resizeMode="cover" source={{uri: `https://ifeelgood.life${media[0].full_path[0]}`}}
                style={{ height: 114, width: '100%' }}
                /> :
                <View style={{height: 114, width: '100%', backgroundColor: 'gray' }} />
                }
        <View style={{paddingHorizontal: 14}}>
        <IfgText numberOfLines={3} style={[gs.fontCaption2, gs.bold]}>{title}</IfgText>
        <IfgText numberOfLines={3} style={[gs.fontCaptionSmall, gs.mt8]}>{subtitle}</IfgText>
        </View>
    </CardContainer>;
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
            <IfgText color={colors.WHITE_COLOR} style={[gs.fontBodyMedium, gs.bold]}>Начинайте сейчас!</IfgText>
            <IfgText color={colors.WHITE_COLOR} style={gs.fontCaptionSmall}>Если становится тяжело, смотрите видео и читайте статьи о том, как чувствовать себя лучше — это поможет вам не сдаться.</IfgText>
            <Button style={s.howItWorksButton}>
                <>
                    <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption, gs.medium]}>Начать заниматься</IfgText>
                    <ArrowRight />
                </>
            </Button>
        <VideoPlayer thumbnailName="thumbnail1" source={url} title={'О платформе ifeelgood'}/>

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

        {activityValue  && <><CardContainer>
          <CardContainer style={{borderRadius: 12, height: 122, justifyContent: 'space-between',backgroundColor: colors.GREEN_LIGHT_COLOR, flexDirection: 'row'}} >
            <View style={{justifyContent: 'space-between', height: '100%'}}>
              <IfgText color={colors.WHITE_COLOR} style={gs.fontCaptionMedium}>Питание</IfgText>
              <Fish />
            </View>
            <CircularProgress value={activityValue.pitaniye} maxValue={180 / 4} />
          </CardContainer>
          <View style={[gs.flexRow]}>
            <IfgText color={colors.BLACK_COLOR} style={[gs.fontCaption3, gs.bold, {width: '50%'}]}>Активности</IfgText>
            <IfgText color={colors.BLACK_COLOR} style={[gs.fontCaption3, gs.bold]}>Цели</IfgText>
          </View>
          {Plan[0].activities.map((activity, index)=><View key={index.toString()} style={s.row}>
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
              <IfgText color={colors.WHITE_COLOR} style={gs.fontCaptionMedium}>Сон</IfgText>
              <Moon />
            </View>
            <CircularProgress value={activityValue.sleep} maxValue={180 / 4} />
          </CardContainer>
          <View style={[gs.flexRow]}>
            <IfgText color={colors.BLACK_COLOR} style={[gs.fontCaption3, gs.bold, {width: '50%'}]}>Активности</IfgText>
            <IfgText color={colors.BLACK_COLOR} style={[gs.fontCaption3, gs.bold]}>Цели</IfgText>
          </View>
          {Plan[1].activities.map((activity, index)=><View key={index.toString()} style={s.row}>
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
              <IfgText color={colors.WHITE_COLOR} style={gs.fontCaptionMedium}>Антистресс</IfgText>
              <Antistress />
            </View>
            <CircularProgress value={activityValue.anistres} maxValue={180 / 4} />
          </CardContainer>
          <View style={[gs.flexRow]}>
            <IfgText color={colors.BLACK_COLOR} style={[gs.fontCaption3, gs.bold, {width: '50%'}]}>Активности</IfgText>
            <IfgText color={colors.BLACK_COLOR} style={[gs.fontCaption3, gs.bold]}>Цели</IfgText>
          </View>
          {Plan[2].activities.map((activity, index)=><View key={index.toString()} style={s.row}>
          <View style={{width: '45%', flexDirection: 'row', alignItems: 'center'}}>
            <CheckBox checked={true}/>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption3, gs.bold, gs.ml8, {maxWidth: '80%'}]}>{activity}</IfgText>
          </View>
          <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center'}}>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaptionSmall]}>{Plan[1].goals[index]}</IfgText>
          </View>
          </View>)}
        </CardContainer>
        </>}
        <View style={gs.mt24} />

          <View style={[gs.flexRow,gs.alignCenter, {justifyContent: 'space-between'}]}>

            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontBodyMedium, gs.bold]}>{'А также читайте'}</IfgText>
            <View>
            <ButtonTo onPress={()=>navigation.navigate('Материалы')} title="Все материалы" />

            </View>
          </View>
        <View style={gs.mt16} />
        <FlatList
                keyExtractor={(item, index)=> index.toString()}
                horizontal
                style={{marginHorizontal: -16}}
                contentContainerStyle={{flexGrow: 1, flexDirection: 'row'}}
                showsHorizontalScrollIndicator={false}
                data={articlesStore.articlesList.articles}
                renderItem={({item, index})=>MaterialCard(item, index)}
        />
    <View style={{height: 180}}/>
    <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 0.75)' ]}
            style={s.shadowGradient}
        />
    </ScrollView>
    <View style={s.footer}>
    <ButtonNext style={s.buttonNext}
          textStyle={gs.fontBodyMedium}
          onPress={()=>navigation.replace('Main')}
          title={'Начать следовать'}
           />
    </View>
</>
    );
  });

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
    height: 60,
  },
  });
