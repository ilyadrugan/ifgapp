

import { ScrollView, StyleSheet, View, Image, ImageBackground, TouchableOpacity, FlatList, Alert, RefreshControl, Linking, GestureResponderEvent, Platform, ActivityIndicator} from 'react-native';
import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { IfgText } from '../../core/components/text/ifg-text';
import colors from '../../core/colors/colors';
import gs from '../../core/styles/global';
import { CardContainer } from '../../core/components/card/cardContainer';
import ArrowTo from '../../../assets/icons/arrow-to.svg';
import ArrowRightBlack from '../../../assets/icons/arrow-right-black.svg';
import ArrowRight from '../../../assets/icons/arrow-right.svg';
import Eye from '../../../assets/icons/eye.svg';

import { Button, ButtonNext, ButtonTo } from '../../core/components/button/button';
import { ActivityBlock } from './blocks/activityBlock';
import { RecommendationBlock } from './blocks/recommendationBlock';
import { ArticleHeader } from './components/articleHeader';
import {ShadowGradient} from '../../core/components/gradient/shadow-gradient';
import { ChatFooter } from './blocks/chat-footer';
import { observer } from 'mobx-react';
import { hexToRgba } from '../../core/utils/hexToRGBA';
import userStore from '../../../store/state/userStore/userStore';
import articlesStore from '../../../store/state/articlesStore/articlesStore';
import presentsStore from '../../../store/state/presentsStore/presentsStore';
import storiesStore from '../../../store/state/storiesStore/storiesStore';
import { StoryModal } from '../../core/components/storyModal/storyModal';
import { StoryMappedModel } from '../../../store/state/storiesStore/models/models';
import ifgScoreStore from '../../../store/state/ifgScoreStore/ifgScoreStore';
import recommendationStore from '../../../store/state/recommendationStore/recommendationStore';
import testingStore from '../../../store/state/testingStore/testingStore';
import { categoryColors } from '../../core/colors/categoryColors';
import { formatRecommendation } from '../../core/utils/textFormatters';
import dailyActivityStore from '../../../store/state/activityGraphStore/activityGraphStore';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { ScreenHeight, ScreenWidth } from '../../hooks/useDimensions';
import { formatDate } from '../../core/utils/formatDateTime';
import Delete from '../../../assets/icons/delete.svg';
import { RecommendationCategoryToEng } from '../../core/utils/recommendationFormatter';
import { PersonalRecommendationModel } from '../../../store/state/recommendationStore/models/models';
import { TimeToDrinkNewBlock } from './blocks/timeToDrinkNew';
import watterStore from '../../../store/state/watterStore/watterStore';
import InstaStory from '../../core/components/insta-stories/insta-stories';
import { InstagramStoriesProps, InstagramStoriesPublicMethods, InstagramStoryProps, StoryItemProps } from '../../core/components/instagram-stories/core/dto/instagramStoriesDTO';
import InstagramStories from '../../core/components/instagram-stories/components/InstagramStories';
import { getStoriesApi } from '../../../store/state/storiesStore/storiesStore.api';
import { APPADMIN_URL, PROD_URL } from '../../core/hosts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import VideoBackground from '../../core/components/video-background/video-background';

export const IFGHome = observer(() => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<any>();
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [closeEndSetting, setCloseEndSetting] = useState(false);
    const [stories, setStories] = useState<InstagramStoryProps[]>([]);
    const [loading, setLoading] = useState(true);

    const ref = useRef<InstagramStoriesPublicMethods>( null );
    useEffect(() => {


      getData();

    }, []);

    const getData = async () => {
      console.log('GET DATA');
      setIsLoading((prev)=>!prev);
      getStoriesApi()
              .then((result)=>{
                const categories:InstagramStoryProps[] = result.data['common stories'].map((cat)=>{
                  return {
                    name: cat.category_title,
                    id: `${cat.category_id}`,
                    avatarSource: { uri: `${APPADMIN_URL}/storage/` + cat.category_cover},
                    bgColor: cat.bgColor,
                  } as InstagramStoryProps;
                });
                const uniqueArray = categories.filter((value, index) => {
                  const _value = JSON.stringify(value);
                  return index === categories.findIndex(obj => {
                    return JSON.stringify(obj) === _value;
                  });
                });
                const storiesMappedList = uniqueArray.map((cat: InstagramStoryProps)=>{
                  const subStoriesArticles = result.data['common stories'].filter((item)=>item.category_id == cat.id);

                  return {...cat, stories: subStoriesArticles.map((story, index)=>{
                    return {
                      id: index.toString(),
                      article: story.buttonContent.is_article !== 0 ? story.article : null,
                      subtitle: story.subtitle,
                      source: { uri: `${APPADMIN_URL}/storage/` + story.cover },
                      story_id: index,
                      buttonContent: story.withButton ? story.buttonContent : null,
                      animationDuration: 6000,
                      renderFooter: ()=> story.buttonContent ? <View style={{width: '100%', alignItems: 'center',justifyContent: 'center', bottom: 50}}>
                                  <ButtonNext
                                    activeOpacity={0.8}
                                    onPress={()=>{
                                      console.log(story.buttonContent?.buttonUrl);
                                     if (story.buttonContent?.is_article && story.article) {
                                      ref.current?.hide();
                                      navigation.navigate('ArticleView', {articleId: story.article.id});
                                    }
                                     else {
                                      const formattedUrl = story.buttonContent?.buttonUrl.startsWith('https') ? story.buttonContent?.buttonUrl : `https://${story.buttonContent?.buttonUrl}`;
                                      Linking.openURL(formattedUrl);
                                    }

                                     }} style={{width: ScreenWidth - 32 }} title={story.buttonContent?.button_text || ''}
                                     />
                            </View> : null,
                    };
                  })as StoryItemProps[]};
                });
                console.log('this.storiesMappedList', storiesMappedList);
                setStories([...storiesMappedList]);
              });
      testingStore.getAllMyTest();
      userStore.getProfile();
      ifgScoreStore.getScoreToday();
      if (testingStore.testsList.length > 0) {
        testingStore.setMyCurrentResultsTest(testingStore.testsList[0].id);
        await recommendationStore.getRecommendations(testingStore.testsList[0].id);
      }
      articlesStore.loadMainArticles();
      articlesStore.clearCurrentArticle();
      presentsStore.loadMorePresents();
      // console.log('articlesStore.currentArticle.id', articlesStore.currentArticle.id);
      dailyActivityStore.getDailyTodayActivity();
      await dailyActivityStore.getDailyActivitySettings();
      // if (dailyActivityStore.dailyTodayActivityData?.watter === undefined) {
      //   await dailyActivityStore.addDailyActivity('watter', 0);
      // }
      // dailyActivityStore.getDailyActivity(new Date().toISOString().split('T')[0]);
      await recommendationStore.getPersonalRecommendations();
      const timer = setTimeout(() => setLoading(false), 1000);

      setIsLoading((prev)=>!prev);
      return () => clearTimeout(timer);
    };

    const onRefresh = async () => {
      if (refreshing) {return;}
      setLoading(true);
      setRefreshing((prev)=>!prev);
      await getData();
      // const timer = setTimeout(() => setLoading(false), 1000);

      setRefreshing((prev)=>!prev);
      // return () => clearTimeout(timer);
    };

    const MaterialCard = ({title, media, subtitle, id}, index)=>
      <CardContainer onPress={()=>{
        articlesStore.clearCurrentArticle();
        navigation.navigate('ArticleView', {articleId: id});}}  style={[{width: 200, height: 256, padding:0 , overflow: 'hidden', borderWidth: 1, borderColor: '#E7E7E7'  }, gs.mr12, index === 0 && gs.ml16]} >
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

    const StoryShimmerCard = (item, index) => <ShimmerPlaceholder
    style={[{width: 124,  height: 166,  borderRadius: 16 }, gs.mr12, index === 0 && gs.ml16]}
    />;

    const onCompleted = async (rec: PersonalRecommendationModel) => {
      if (rec) {
       // console.log('personalRecommendation.id',personalRecommendation.id);
       await recommendationStore.completeRecommendation(`${rec.id}`);
      }
     };
     const checkTests = () =>{
      if (testingStore.testsList.length === 0) {
        return true;
      }
      if (testingStore.testsList.length === 1 && testingStore.testsList[0].survey_id === 11) {
        return true;
      }
      return false;
     };

return userStore.userInfo !== null && <>

      <ScrollView style={s.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {/* <View style={gs.mt16} /> */}
        <IfgText style={[gs.h2, gs.bold, {marginTop: Platform.OS === 'ios' ? insets.top - 16 : 0}]} >{'Дом IFG'}</IfgText>


        {isLoading ?
        <FlatList
        keyExtractor={(_, index) => index.toString()}
        data={[0,1,2]}
        horizontal
        style={{marginHorizontal: -16, marginTop: 16}}
        contentContainerStyle={{flexGrow: 1, flexDirection: 'row'}}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index})=>StoryShimmerCard(item, index)}
      />
        : <>
        <View style={gs.mt16} />
        <InstagramStories
            ref={ref}
            stories={[...stories]}
            showName
            backgroundColor="transparent"
        />
       </>
      }
     { (isLoading && userStore.roles.includes('user_ins')) || (isLoading && userStore.roles.includes('user_wb')) ? <ShimmerPlaceholder style={[gs.mt24, {height: 219, width: '100%',  borderRadius: 16 }]}/> :
     (checkTests() && !closeEndSetting) ?
      <CardContainer style={{marginTop: 24,borderRadius: 16,backgroundColor: colors.GREEN_COLOR, flexDirection: 'row', justifyContent: 'space-between', overflow: 'hidden'}}>
        <TouchableOpacity onPress={()=>setCloseEndSetting((prev)=>!prev)} style={[gs.tapArea, {position: 'absolute', right: 16, top: 16}]}>
        <View style={[s.circle]}>
            <Delete />
        </View>
        </TouchableOpacity>
                <View style={{width: '54%'}}>
                <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption2, gs.bold]}>Завершите настройку приложения</IfgText>
                <IfgText  color={colors.WHITE_COLOR} style={[gs.fontCaptionSmall, gs.mt12]}>Пройдите полную версию IFG-тестирования для получения более точных рекомендаций</IfgText>
                <ButtonTo onPress={()=>navigation.navigate('Testing')} style={[s.buttonTo, gs.mt16, {borderColor: colors.WHITE_COLOR}]} textStyle={[gs.fontCaption3, gs.medium]} textColor={colors.WHITE_COLOR} title={ScreenWidth > 400 ? 'Пройти тестирование' : 'К тестированию' }whiteIcon/>
                </View>
                <Image resizeMode="contain" style={{height: 160, width: 132, position: 'absolute', bottom: 0, right: 16}} source={require('../../../assets/backgrounds/phone0.4.png')}/>
      </CardContainer>
      :
      userStore.roles.includes('user_ins') ? <ImageBackground
          resizeMode="stretch"
          source={require('../../../assets/backgrounds/gradientCard3.png')}
          style={[s.cardGradientContainer, gs.mt24]}
          >
            <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption, gs.bold]}>Финансовая защита заемщиков кредитов</IfgText>
            <IfgText  color={colors.WHITE_COLOR} style={gs.fontCaptionSmall}>Узнайте как защитить себя и своих близких на случай непредвиденных ситуаций с жизнью и здоровьем в совместном проекте АльфаСтрахование-Жизнь и ifeelgood!</IfgText>
            <Button onPress={()=>navigation.navigate('Coverage')} outlined style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderColor: colors.WHITE_COLOR, borderWidth: 1, padding: 20, borderRadius: 12, height: 60}}>
                <>
                    <IfgText color={colors.WHITE_COLOR} style={gs.fontBodyMedium}>Подробнее</IfgText>
                    <ArrowRight />
                </>
            </Button>
      </ImageBackground> : null}
      {!isLoading && userStore.roles.includes('user_wb') &&
      <>


      <CardContainer style={{padding: 0,  marginTop: 16, borderRadius: 22, overflow: 'hidden'}}>
        <VideoBackground
          // source={{uri: PROD_URL + '/images/home/bg-video.mp4'}}
          source={require('../../../assets/videos/bg-video.mp4')}
          style={{padding: 16}}
          >
            <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption, gs.bold]}>Используйте все возможности iFeelGood для достижения результатов</IfgText>
            {/* <IfgText  color={colors.WHITE_COLOR} style={gs.fontCaptionSmall}>Узнайте как защитить себя и своих близких на случай непредвиденных ситуаций с жизнью и здоровьем в совместном проекте АльфаСтрахование-Жизнь и ifeelgood!</IfgText> */}
            <Button onPress={()=>navigation.navigate('StartPage')} style={{backgroundColor: colors.GREEN_COLOR,flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderColor: colors.WHITE_COLOR, paddingHorizontal: 16, borderRadius: 12, height: 60, marginTop: 32}}>
                <>
                    <IfgText color={colors.WHITE_COLOR} style={gs.fontBodyMedium}>Моя программа</IfgText>
                    <ArrowRight />
                </>
            </Button>
      </VideoBackground>
      {loading && (
              <View style={s.loaderOverlay}>
                {/* <ActivityIndicator size="large"  /> */}
              </View>
            )}
      </CardContainer></>}
      <View style={gs.mt24} />

       <ActivityBlock />

        <View style={gs.mt24} />
        <View style={[gs.flexRow, {justifyContent: 'space-between'}]}>
            <IfgText style={[gs.fontBodyMedium, gs.bold]}>Рекомендации</IfgText>
            <Button style={s.buttonToCalendar} onPress={()=>navigation.navigate('Календарь')}>
            <>
            <IfgText color={colors.GRAY_COLOR3} style={gs.fontBody2}>В календарь</IfgText>

                <ArrowTo />
                </>
            </Button>
        </View>
        {dailyActivityStore.dailyTodayActivityData ? <RecommendationBlock /> : null}
        {(watterStore.cupsData) ? <TimeToDrinkNewBlock/>
        : <ShimmerPlaceholder style={{borderRadius: 22, marginTop: 16}} height={450} width={ScreenWidth - 32} />}


        {recommendationStore.personalRecomendationList.filter((rec)=>rec.status === 'pending').slice(0,3).map((rec, index)=>{
          return <CardContainer style={gs.mt16} key={index.toString()}
          onPress={()=>{
            recommendationStore.readRecommendation(rec.id);
            navigation.navigate('ArticleView', {articleId: rec.article.id});}}

          >
          <ArticleHeader
            // isCicleBadge={!rec.is_viewed}
            isNew={!rec.is_viewed}
            time={rec.publish_time}
            hashTagColor={categoryColors[rec.category]}
            hashTagText={'#' + rec.category}
          />
          <IfgText style={[gs.fontCaption, gs.bold]}>{rec.title}</IfgText>
          <View style={[gs.flexRow, gs.alignCenter]}>
          <View style={{backgroundColor: colors.WHITE_COLOR,borderRadius: 10, borderWidth: 1, borderColor: '#F4F4F4', width: 49, height: 49,alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                    resizeMode="cover"
                    style={{width: 44, height: 44, borderRadius: 6}}
                    source={{uri: `https://ifeelgood.life${rec.article.media[0].full_path[2]}`}}
                    />
                    </View>
           {rec.description && <IfgText style={[gs.fontCaptionSmall, gs.ml12, {width: '80%'}]}>{rec.description}</IfgText>}
          </View>
          <ButtonNext
          // disabled={recommendationStore.isCompleteLoading.isLoading}
          isLoading={recommendationStore.isCompleteLoading.isLoading && recommendationStore.isCompleteLoading.recId === rec.id}
          onPress={(e: GestureResponderEvent)=> {
                            e.stopPropagation();
                            onCompleted(rec);
                            }}
          title="Сделано" oliveTitle="+ 1 балл" />

        </CardContainer>;
        })}

        {recommendationStore.personalRecomendationList.length - 3 > 0 &&
          <><View style={gs.mt16} />
        <View style={gs.flexRow}>
          <Button style={[s.buttonTo, {maxHeight: 30}]} onPress={()=>navigation.navigate('PersonalRecommendations')}>
              <IfgText color={colors.GRAY_COLOR3} style={[gs.fontBody2, gs.light, {lineHeight: 16}]}>Ранее - {formatRecommendation(recommendationStore.personalRecomendationList.length - 3)}</IfgText>
          </Button>
        </View></>}

        <View style={gs.mt24} />
          <View style={[gs.flexRow, {justifyContent: 'space-between', alignItems: 'center'}]}>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontBodyMedium, gs.bold]}>Полезное</IfgText>
            <ButtonTo onPress={()=>navigation.navigate('Материалы', {resetParams: 'articles'})} title="Все материалы" />
          </View>
          <View style={gs.mt16} />
          <FlatList
                keyExtractor={(_, index)=>index.toString()}
                horizontal
                style={{marginHorizontal: -16}}
                contentContainerStyle={{flexGrow: 1, flexDirection: 'row'}}
                showsHorizontalScrollIndicator={false}
                data={articlesStore.articlesMainList.articles}
                renderItem={({item, index})=>MaterialCard(item, index)}
        />
        <View style={gs.mt24}/>
        {presentsStore.presentsList.presents.length > 0 && <><View style={[gs.flexRow, {justifyContent: 'space-between', alignItems: 'center'}]}>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontBodyMedium, gs.bold]}>Конкурсы</IfgText>
            <ButtonTo onPress={()=>navigation.navigate('Конкурсы')} title="Все конкурсы" />
          </View>
        <View style={gs.mt16}/></>}
        <FlatList
                keyExtractor={(item, index)=>index.toString()}
                horizontal
                style={{marginHorizontal: -16}}
                contentContainerStyle={{flexGrow: 1, flexDirection: 'row'}}
                showsHorizontalScrollIndicator={false}
                data={presentsStore.presentsList.presents}
                renderItem={({item, index})=>
                item.id !== presentsStore.currentPresent.id && <CardContainer style={[{width: 190, height: 236, padding:14, borderWidth: 1, borderColor: '#E7E7E7', justifyContent: 'space-between' }, gs.mr12, index === 0 && gs.ml16 ]} >
                    <IfgText numberOfLines={2} style={[gs.fontCaption2, gs.bold]}>{item.title}</IfgText>
                    <Image resizeMode="contain"  source={{uri: `https://ifeelgood.life${item.media[0].full_path[1]}`}}
                    style={{ height: 114, width: '100%' }}
                    />
                <Button onPress={()=>navigation.navigate('ContestView', {contestId: item.id})} fullWidth style={[gs.flexRow, gs.alignCenter,{paddingHorizontal: 12, height: 30,borderWidth: 0.75, borderRadius: 6, borderColor: '#E6E6E6', justifyContent: 'space-between' }]}>
                  <>
                  <IfgText style={gs.fontBody2}>{!(item.winners.length > 0) ? 'Как получить приз' : 'К результатам'}</IfgText>
                  <View style={{marginTop:2}}>
                    <ArrowRightBlack width={12} />
                  </View>
                  </>

                </Button>
            </CardContainer>}
        />


        <View style={{height: 70}}/>
       {/* {(currentStoryPressed !== undefined && storiesStore.storiesMappedList.length > 0 && storiesStore.storiesMappedList[currentStoryPressed].subStories) ?
       <StoryModal
        stories={storiesStore.storiesMappedList[currentStoryPressed].subStories}
        // category={currentStoryPressed}
        // currentStoryPressed={currentStoryPressed}
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
      /> : null} */}
      </ScrollView>
      {/*<ChatFooter />*/}
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
      minHeight: 30,
      },
    cardGradientContainer:{
        flex: 1,
        padding: 16,
        flexDirection: 'column',
        gap: 10,
      },
    circle:{
        width: 16,
        height: 16,
        backgroundColor: colors.WHITE_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
      },
      loaderOverlay: {
          // растягивает на весь экран
              ...StyleSheet.absoluteFillObject, // растягивает на весь экран

          backgroundColor: colors.BACKGROUND_COLOR,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
        },
  });

