import { useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, View, Image, TouchableOpacity, FlatList, Dimensions, ActivityIndicator, Linking } from 'react-native';
import { IfgText } from '../../core/components/text/ifg-text';
import gs from '../../core/styles/global';
import colors from '../../core/colors/colors';
import { AnimatedGradientButton, Button,  ButtonTo } from '../../core/components/button/button';

import ArrowBack from '../../../assets/icons/arrow-back.svg';
import ArrowRight from '../../../assets/icons/arrow-right.svg';

import Delete from '../../../assets/icons/delete.svg';
import Fish from '../../../assets/icons/fish.svg';
import Moon from '../../../assets/icons/moon.svg';
import Antistress from '../../../assets/icons/antistress.svg';
import PhysicalActivity from '../../../assets/icons/physical-activity32.svg';
import CheckConst from '../../../assets/icons/checkConst.svg';

import { CardContainer } from '../../core/components/card/cardContainer';
import LinearGradient from 'react-native-linear-gradient';
import { IndividualProgrammData } from '../testing/testData/individualProgramm';
import { CircularProgress } from '../../core/components/circularProgress/circularProgress';
import {CheckBox} from '../../core/components/checkbox/checkbox';
import testingStore from '../../../store/state/testingStore/testingStore';
import articlesStore from '../../../store/state/articlesStore/articlesStore';
import { observer } from 'mobx-react';
import { ActivitiValueModel } from '../../../store/state/testingStore/models/models';
import recommendationStore from '../../../store/state/recommendationStore/recommendationStore';
import { stripHtmlTags } from '../../core/utils/stripHtmlTags';
import { StoreRecommendationModel } from '../../../store/state/recommendationStore/models/models';
import AnimatedArrow from '../../core/components/animatedArrow/animatedArrow';
import RutubeView from '../../core/components/rutubeView/rutubeVideo';
import { TimeZone } from '../../hooks/useTimezone';

export type CheckBoxesTypes = {
  'Питание': boolean[],
  'Сон': boolean[],
  'Антистресс': boolean[],
  'Физическая активность': boolean[],
}

export const IndividualProgramm = observer(() => {
    const url = 'https://rutube.ru/video/private/fb4fd0fdc5520a114eb563e4490e14fe/?r=wd&p=S4UX6EpNrCYgzrV8mjZmpw';
    // const thumbnail1 = require('../../../assets/thumbnails/thumbnail1.png');
    const navigation = useNavigation<any>();
    const [activityValue, setActivityValue] = useState<ActivitiValueModel>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const setCheckBoxesValues = () =>{
      const values = {
        'Питание': recommendationStore.recommendationList.Питание.map((item)=>recommendationStore.personalRecomendationList.some((rec)=>rec.link_text === item.activity.express[0].link_text)),
        'Сон': recommendationStore.recommendationList.Сон.map((item)=>recommendationStore.personalRecomendationList.some((rec)=>rec.link_text === item.activity.express[0].link_text)),
        'Антистресс': recommendationStore.recommendationList.Антистресс.map((item)=>recommendationStore.personalRecomendationList.some((rec)=>rec.link_text === item.activity.express[0].link_text)),
        'Физическая активность': recommendationStore.recommendationList['Физическая активность'].map((item)=>recommendationStore.personalRecomendationList.some((rec)=>rec.link_text === item.activity.express[0].link_text)),
      };
      console.log('values', values);

      return values;
      // setCheckBoxes(values)
    };
    // const valuesChecks = setCheckBoxesValues();
    const [checkBoxes, setCheckBoxes] = useState<CheckBoxesTypes>(
      {'Питание': [],
      'Сон': [],
      'Антистресс': [],
      'Физическая активность': []});
    // const { activiti_value_json } = route.params || undefined;
    // console.log('activiti_value_json', activiti_value_json);
    const onBack = () => {
      testingStore.clearMyCurrentResultsTest();
      navigation.goBack();
    };
    useEffect(() => {
      getData();
    }, []);

    const getData = async () => {
      setIsLoading(true);

      await testingStore.getAllMyTest();
      await recommendationStore.getPersonalRecommendations();
      // recommendationStore.getPersonalRecommendations();
      if (!testingStore.myCurrentResultsTest || testingStore.myCurrentResultsTest.id === 0) {
        console.log('myCurrentResultsTest is null');
        await testingStore.setMyCurrentResultsTest(testingStore.testsList[0].id);

        // console.log('testingStore.myCurrentResultsTest', testingStore.myCurrentResultsTest);
      }
      await getRecomendations(testingStore.myCurrentResultsTest.id);
      if (recommendationStore.personalRecomendationList.length === 0) {recommendationStore.getPersonalRecommendations();}
      if (articlesStore.articlesMainList.articles.length === 0) {
        articlesStore.loadMainArticles();
      }
      setCheckBoxes(()=>{
        const values = {
          'Питание': recommendationStore.recommendationList.Питание.map((item)=>recommendationStore.personalRecomendationList.some((rec)=>rec.link_text === item.activity.express[0].link_text)),
          'Сон': recommendationStore.recommendationList.Сон.map((item)=>recommendationStore.personalRecomendationList.some((rec)=>rec.link_text === item.activity.express[0].link_text)),
          'Антистресс': recommendationStore.recommendationList.Антистресс.map((item)=>recommendationStore.personalRecomendationList.some((rec)=>rec.link_text === item.activity.express[0].link_text)),
          'Физическая активность': recommendationStore.recommendationList['Физическая активность'].map((item)=>recommendationStore.personalRecomendationList.some((rec)=>rec.link_text === item.activity.express[0].link_text)),
        };
        return values;
      });
    };


    const getRecomendations = async (testId: number) => {
      await recommendationStore.getRecommendations(testId);
      setIsLoading(false);
    };

    const onRecommendationCheck = async (link: string, category: string, index: number, activityname: string, desc: string, time: string) =>{
      console.log('onRecommendationCheck', link, category);
      // const values = checkBoxes;
      if (!checkBoxes[category][index]) {
        // values[category][index] = true;

        const model: StoreRecommendationModel = {
          link_text: link,
          category: category,
          title: activityname,
          description: desc || 'Описание',
          publish_time: time || '',
          timezone: TimeZone,
        };
        recommendationStore.storeRecommendation(model);
      }
      else {
        // values[category][index] = false;

        const userRecommendationId = recommendationStore.personalRecomendationList.find((rec)=>rec.link_text === link)?.id;
        console.log('userRecommendationId', userRecommendationId);
        recommendationStore.deleteRecommendation(String(userRecommendationId));
      }
      setCheckBoxes((prevState) => ({
        ...prevState,
        [category]: prevState[category].map((item, idx) =>
          idx === index ? !item : item // Изменяем только нужный элемент
        ),
      }));
      recommendationStore.getPersonalRecommendations();

    };
    const checkRecommendationInHub = (link: string) => {
      // console.log('checkRecommendationInHub', link, recommendationStore.personalRecomendationList.some((rec)=>rec.link_text === link));
      return recommendationStore.personalRecomendationList.some((rec)=>rec.link_text === link);
    };
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
    const RecommendHelper: FC<{bgColor: string}> = ({bgColor}) => {
      const [isShow, setIsShow] = useState(true);
      return isShow && <>
      {/* <View style={gs.mt12} /> */}
      <CardContainer style={{borderRadius: 16,paddingVertical: 8, backgroundColor: bgColor, justifyContent: 'space-between', flexDirection: 'row', alignItems:'center'}}>
      <View style={[gs.flexRow, gs.alignCenter, gs.flex1]}>
        <CheckConst />
        <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption3, gs.ml8, {paddingRight: 12}]}>Выберите, какие рекомендации вы хотите получать в течение дня</IfgText>
      </View>
       <TouchableOpacity onPress={()=>setIsShow(prev=>!prev)} style={[s.circle]}>
           <Delete />
      </TouchableOpacity>
    </CardContainer>
    </>;
    };
    const getArticleId = (html: string) =>{
      console.log(html);
      const htmlSplitted = html.split('/articles/');
      console.log(htmlSplitted[1].split('"')[0]);
      if (htmlSplitted.length > 1) {
        return htmlSplitted[1].split('"')[0];
      }
      return '';
    };
  const goToArticle = (id) =>{
    console.log('id', id);
    navigation.navigate('ArticleView', {articleId: Number(id)});
  };
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
            <Button onPress={()=>Linking.openURL('https://t.me/ifgbot_bot')} style={s.howItWorksButton}>
                <>
                    <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption, gs.medium]}>Начать заниматься</IfgText>
                    <ArrowRight />
                </>
            </Button>
            <RutubeView
              url={url}
              // thumbnailUrl={thumbnail1}
              title="О платформе ifeelgood"
            />
         </ImageBackground>
         <View style={gs.mt24} />
         <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontBodyMedium, gs.bold]}>Ваш персональный план</IfgText>

        <View style={gs.mt16} />
        {(testingStore.myCurrentResultsTest.id !== 0 && recommendationStore.recommendationList) && <><CardContainer>
          <CardContainer style={{borderRadius: 12, height: 122, justifyContent: 'space-between',backgroundColor: colors.GREEN_LIGHT_COLOR, flexDirection: 'row'}} >
            <View style={{justifyContent: 'space-between', height: '100%'}}>
              <IfgText color={colors.WHITE_COLOR} style={gs.fontCaptionMedium}>Питание</IfgText>
              <Fish />
            </View>
            <CircularProgress value={testingStore.myCurrentResultsTest.activiti_value_json.Питание} maxValue={testingStore.currentTest.maxValues ? testingStore.currentTest.maxValues.Питание : 0} />
          </CardContainer>
          <RecommendHelper  bgColor="#DDFFE3"/>
          <View style={[gs.flexRow]}>
            <IfgText color={colors.BLACK_COLOR} style={[gs.fontCaption3, gs.bold, {width: '50%'}]}>Активности</IfgText>
            <IfgText color={colors.BLACK_COLOR} style={[gs.fontCaption3, gs.bold]}>Цели</IfgText>
          </View>
          {isLoading ? <ActivityIndicator /> : recommendationStore.recommendationList.Питание.map((item, index)=><View key={index.toString()} style={s.row}>
          <View style={{width: '45%', flexDirection: 'row', alignItems: 'center'}}>
            <CheckBox disabled={testingStore.disableRecommendationCheck} onPress={()=>onRecommendationCheck(item.activity.express[0].link_text, 'Питание', index, item.activity.name, item.activity.description_push, item.activity.time_push)} checked={testingStore.disableRecommendationCheck ? false : checkBoxes['Питание'][index]}/>
            <IfgText onPress={()=>goToArticle(getArticleId(item.activity.express[0].link_text))} color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption3, gs.bold, gs.ml8, {maxWidth: '80%'}]}>{item.activity.name}</IfgText>
          </View>
          <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center'}}>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaptionSmall]}>{stripHtmlTags(item.activity.express[0].html)}</IfgText>
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
            <CircularProgress value={testingStore.myCurrentResultsTest.activiti_value_json.Сон} maxValue={testingStore.currentTest.maxValues ? testingStore.currentTest.maxValues.Сон : 0} />
          </CardContainer>
          <RecommendHelper bgColor="#FFEDDD"/>
          <View style={[gs.flexRow]}>
            <IfgText color={colors.BLACK_COLOR} style={[gs.fontCaption3, gs.bold, {width: '50%'}]}>Активности</IfgText>
            <IfgText color={colors.BLACK_COLOR} style={[gs.fontCaption3, gs.bold]}>Цели</IfgText>
          </View>
          {isLoading ? <ActivityIndicator /> : recommendationStore.recommendationList.Сон.map((item, index)=><View key={index.toString()} style={s.row}>
          <View style={{width: '45%', flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox disabled={testingStore.disableRecommendationCheck} onPress={()=>onRecommendationCheck(item.activity.express[0].link_text, 'Сон', index, item.activity.name, item.activity.description_push, item.activity.time_push)} checked={testingStore.disableRecommendationCheck ? false : checkBoxes['Сон'][index]}/>
          <IfgText onPress={()=>goToArticle(getArticleId(item.activity.express[0].link_text))} color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption3, gs.bold, gs.ml8, {maxWidth: '80%'}]}>{item.activity.name}</IfgText>
          </View>
          <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center'}}>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaptionSmall]}>{stripHtmlTags(item.activity.express[0].html)}</IfgText>
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
            <CircularProgress value={testingStore.myCurrentResultsTest.activiti_value_json.Антистресс} maxValue={testingStore.currentTest.maxValues ? testingStore.currentTest.maxValues.Антистресс : 0} />
          </CardContainer>
          <RecommendHelper bgColor="#F2FFDD"/>
          <View style={[gs.flexRow]}>
            <IfgText color={colors.BLACK_COLOR} style={[gs.fontCaption3, gs.bold, {width: '50%'}]}>Активности</IfgText>
            <IfgText color={colors.BLACK_COLOR} style={[gs.fontCaption3, gs.bold]}>Цели</IfgText>
          </View>
          {isLoading ? <ActivityIndicator /> : recommendationStore.recommendationList.Антистресс.map((item, index)=><View key={index.toString()} style={s.row}>
          <View style={{width: '45%', flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox disabled={testingStore.disableRecommendationCheck} onPress={()=>onRecommendationCheck(item.activity.express[0].link_text, 'Антистресс', index, item.activity.name, item.activity.description_push, item.activity.time_push)} checked={testingStore.disableRecommendationCheck ? false : checkBoxes['Антистресс'][index]}/>
          <IfgText onPress={()=>goToArticle(getArticleId(item.activity.express[0].link_text))} color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption3, gs.bold, gs.ml8, {maxWidth: '80%'}]}>{item.activity.name}</IfgText>
          </View>
          <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center'}}>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaptionSmall]}>{stripHtmlTags(item.activity.express[0].html)}</IfgText>
          </View>
          </View>)}
        </CardContainer>
        <View style={gs.mt16} />
        <CardContainer>
          <CardContainer style={{borderRadius: 12, height: 122, justifyContent: 'space-between',backgroundColor: colors.OCEAN_COLOR, flexDirection: 'row'}} >
            <View style={{justifyContent: 'space-between', height: '100%', flex:1}}>
              <IfgText color={colors.WHITE_COLOR} style={gs.fontCaptionMedium}>Физическая активность</IfgText>
              <PhysicalActivity />
            </View>
            <CircularProgress value={testingStore.myCurrentResultsTest.activiti_value_json['Физическая активность']} maxValue={testingStore.currentTest.maxValues ? testingStore.currentTest.maxValues['Физическая активность'] : 0} />
          </CardContainer>
          <RecommendHelper bgColor="#DDF6FF"/>
          <View style={[gs.flexRow]}>
            <IfgText color={colors.BLACK_COLOR} style={[gs.fontCaption3, gs.bold, {width: '50%'}]}>Активности</IfgText>
            <IfgText color={colors.BLACK_COLOR} style={[gs.fontCaption3, gs.bold]}>Цели</IfgText>
          </View>
          {isLoading ? <ActivityIndicator /> : recommendationStore.recommendationList['Физическая активность'].map((item, index)=><View key={index.toString()} style={s.row}>
          <View style={{width: '45%', flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox disabled={testingStore.disableRecommendationCheck} onPress={()=>onRecommendationCheck(item.activity.express[0].link_text, 'Физическая активность', index, item.activity.name, item.activity.description_push, item.activity.time_push)} checked={testingStore.disableRecommendationCheck ? false : checkBoxes['Физическая активность'][index]}/>
          <IfgText onPress={()=>goToArticle(getArticleId(item.activity.express[0].link_text))} color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption3, gs.bold, gs.ml8, {maxWidth: '80%'}]}>{item.activity.name}</IfgText>
          </View>
          <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center'}}>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaptionSmall]}>{stripHtmlTags(item.activity.express[0].html)}</IfgText>
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
                data={articlesStore.articlesMainList.articles}
                renderItem={({item, index})=>MaterialCard(item, index)}
        />
    <View style={{height: 180}}/>
    <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 0.75)' ]}
            style={s.shadowGradient}
        />
    </ScrollView>
    <View style={s.footer}>
     <AnimatedGradientButton style={s.buttonNext}
                onPress={()=>navigation.replace('Main')}
                >
                <View style={gs.buttonContent}>
                <View style={gs.buttonContentRow}>
                    <IfgText color={colors.WHITE_COLOR} style={[gs.fontBodyMedium]}>Начать следовать</IfgText>
                       <AnimatedArrow />
                    </View>
                    <View />
                </View>

      </AnimatedGradientButton>
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
    height: 60,
  },
  });
