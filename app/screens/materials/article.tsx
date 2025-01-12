import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import React, { useEffect, useState, useRef } from 'react';
import { Image,  View, ActivityIndicator, ScrollView, StyleSheet, FlatList, Dimensions } from 'react-native';
import colors from '../../core/colors/colors';
import { Button, ButtonTo } from '../../core/components/button/button';
import { CardContainer } from '../../core/components/card/cardContainer';
import { IfgText } from '../../core/components/text/ifg-text';
import gs from '../../core/styles/global';
import { parseHTMLToSequentialObjects, stripHtmlTags } from '../../core/utils/stripHtmlTags';
import articlesStore from '../../../store/state/articlesStore/articlesStore';
import ArrowBack from '../../../assets/icons/arrow-back.svg';
import Like from '../../../assets/icons/like.svg';
import EyeViews from '../../../assets/icons/eye-views.svg';
import Star from '../../../assets/icons/star.svg';
import Share from '../../../assets/icons/share.svg';
import VerifiedExpert from '../../../assets/icons/articleTypes/verified_expert.svg';
import VerifiedResearcher from '../../../assets/icons/articleTypes/verified_researcher.svg';
import VerifiedScience from '../../../assets/icons/articleTypes/verified_science.svg';
import RenderHTML from 'react-native-render-html';
import { formatDateWithParamsMoment } from '../../core/utils/formatDateTime';
import { onShare } from '../../core/components/share/share';
import RenderHTMLContent from './components/renderHTMLJson';
import data from './tmp.json';
import { IntersectionObserver, useIntersection, InView, IOScrollView } from 'react-native-intersection-observer';
import ifgScoreStore from '../../../store/state/ifgScoreStore/ifgScoreStore';
import recommendationStore from '../../../store/state/recommendationStore/recommendationStore';
import { PersonalRecommendationModel } from '../../../store/state/recommendationStore/models/models';
import dailyActivityStore from '../../../store/state/activityGraphStore/activityGraphStore';
import { RecommendationCategoryToEng } from '../../core/utils/recommendationFormatter';

const width = Dimensions.get('screen').width;

export const ArticleView = observer(({route}) => {
    const navigation = useNavigation<any>();
    const onBack = () => {
      navigation.goBack();
    };
    const { articleId } = route.params;
    const [isInFavorite, setIsInFavorite] = useState(false);
    const [isReaded, setIsReaded] = useState(false);
    const [personalRecommendation, setPersonalRecommendation] = useState<PersonalRecommendationModel>();
    useEffect(() => {
      console.log(articleId,'articlesStore.currentArticle.id', articlesStore.currentArticle.id);

     if (articleId !== undefined) {
        loadArticleById(articleId).then(()=>
        setIsInFavorite(articlesStore.articlesUserList.some(article=>article.id === articleId)));
        // console.log('articleId', articleId, articlesStore.currentArticle.body_json || articlesStore.currentArticle.body || '');
        const persRec = recommendationStore.personalRecomendationList.find((rec)=> rec.article.id === articleId);
        if (persRec) {
          setPersonalRecommendation(persRec);
          setIsReaded(persRec.status === 'completed');
        }
      }
    }, [articleId]);
    const clearCurrentArticle = async () => await articlesStore.clearCurrentArticle();
    const loadArticleById = async (id) => await articlesStore.getArticleById(id);

    const likeArticle = async (action: number) => await articlesStore.changeLikeUserArticle(articleId, action);

    const addInFavorite = async () => await articlesStore.changeUserArticle(articleId).then(()=>
      {console.log(articlesStore.articlesUserList.map((item)=>item.id));
      setIsInFavorite(articlesStore.articlesUserList.some(article=>article.id === articleId));});

      const MaterialCard = ({title, media, subtitle, id}, index)=>
        <CardContainer onPress={async()=>{
          await articlesStore.clearCurrentArticle();
          navigation.replace('ArticleView', {articleId: id});}}
          style={[{width: 200, height: 256, padding:0 , overflow: 'hidden', borderWidth: 1, borderColor: '#E7E7E7'  }, gs.mr12, index === 0 && gs.ml16]} >
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
    const onRead =  async () => {
     await ifgScoreStore.addScore(1);
     if (personalRecommendation) {
      console.log('personalRecommendation.id',personalRecommendation.id);
      await recommendationStore.completeRecommendation(`${personalRecommendation.id}`);
      const categoryEng = RecommendationCategoryToEng(personalRecommendation.category);
      await dailyActivityStore.addDailyActivity(categoryEng, dailyActivityStore.dailyActivityData[categoryEng] + 1);
      await recommendationStore.getPersonalRecommendations();
    }
     setIsReaded(true);
    };
    return <>
    {articlesStore.isLoading && <View style={{justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <ActivityIndicator size={'large'} animating/>
      </View>}
      {articlesStore.currentArticle.id !== 0 && <IOScrollView
      style={s.container}
      >
        <Button style={s.buttonBack} onPress={onBack}>
            <>
                <ArrowBack />
                <IfgText color={colors.GRAY_COLOR3} style={gs.fontBody2}>Назад</IfgText>
            </>
        </Button>
        <View style={gs.mt16} />
        <IfgText style={[gs.h2, gs.bold]}>{articlesStore.currentArticle?.title}</IfgText>
        <View style={gs.mt16} />
        <Image
                style={{alignSelf: 'center', height: 170, width: '100%', borderRadius: 16}}
                source={{uri: `https://ifeelgood.life${articlesStore.currentArticle.media[0].full_path[0]}`}}
        />

        <View style={gs.mt16} />
         <CardContainer style={{gap:0}}>
        <RenderHTMLContent fromBodyJson={articlesStore.currentArticle.body_json ? true : false} content={articlesStore.currentArticle.body_json ? articlesStore.currentArticle.body_json[0].data : articlesStore.currentArticle.body} />
        </CardContainer>
        <View style={gs.mt24} />
        <View style={[gs.flexRow, {gap: 12,width: '100%', justifyContent: 'space-between'} ]}>
        <View style={{flex: 1}}>
        <CardContainer style={[gs.flexRow, {justifyContent: 'space-between', borderRadius: 12}]}>
          <IfgText style={gs.fontCaption}>Опубликовано:</IfgText>
          <IfgText style={[gs.fontCaption, gs.bold]}>{formatDateWithParamsMoment(articlesStore.currentArticle.datetime_publish, '+03:00', 'D.MM.YYYY')}</IfgText>
        </CardContainer>
        </View>


          {articlesStore.currentArticle.type !== 'none' && <CardContainer style={{
            aspectRatio: 1, borderRadius: 16, alignItems: 'center', justifyContent: 'center',
            backgroundColor: articlesStore.currentArticle.type === 'verified_science' ? colors.PINK_COLOR :
            articlesStore.currentArticle.type === 'verified_researcher' ? '#FFAE21' : '#54B676'}} >
              <View style={{position: 'absolute',alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', width: 32, height: 32, borderRadius: 16}}>

                {articlesStore.currentArticle.type === 'verified_science' && <VerifiedScience />}
                {articlesStore.currentArticle.type === 'verified_researcher' && <VerifiedResearcher />}
                {articlesStore.currentArticle.type === 'verified_expert' && <VerifiedExpert />}
              </View>
            </CardContainer>}
        </View>
        <View style={gs.mt12} />

        <View style={[gs.flexRow, {justifyContent: 'space-between'}]}>
          <Button disabled={articlesStore.isUserArticleLoading} onPress={()=>likeArticle(1)} style={[gs.flexRow, gs.alignCenter, {justifyContent: 'flex-start', borderRadius: 12, backgroundColor: colors.WHITE_DIRTY_COLOR, width: (width - 32) * 0.48, height: 46}]} >
          <View style={{marginLeft: 16, top: -1}}>
          <Like />
          </View>
          <IfgText style={[gs.fontCaption2, {marginLeft: 10}]}>{articlesStore.currentArticle.like} нравится</IfgText>
          </Button>

          <Button disabled={articlesStore.isUserArticleLoading} onPress={()=>likeArticle(0)} style={[gs.flexRow, gs.alignCenter, {justifyContent: 'flex-start',borderRadius: 12, backgroundColor: '#FFF3F8', width: (width - 32) * 0.48, height: 46}]} >
          <View style={{marginLeft: 16, top: 1, transform: [{ scaleY: -1 }]}}>
          <Like />
          </View>
          <IfgText style={[gs.fontCaption2, {marginLeft: 10}]}>{articlesStore.currentArticle.unlike} не нравится</IfgText>
          </Button>
        </View>
        <InView onChange={(inView: boolean) => {
          if (!isReaded && inView) {onRead();}
        }}>
        <View style={gs.mt12} />
        </InView>

        <View style={[gs.flexRow, { gap: 10, flexWrap: 'wrap'}]}>
          <Button style={[gs.flexRow, gs.alignCenter, {height: 46,gap: 8,borderRadius: 12, backgroundColor: 'transparent', borderWidth: 1, borderColor: '#E7E7E7', paddingHorizontal: 12, paddingVertical: 8}]} >
          <View style={{ top: -1}}>
          <EyeViews/>
          </View>
          <IfgText style={gs.fontCaption2}>{articlesStore.currentArticle.views}</IfgText>
          </Button>

          <Button disabled={articlesStore.isUserArticleLoading}  onPress={addInFavorite} style={[gs.flexRow, gs.alignCenter, {height: 46,gap: 8,borderRadius: 12, backgroundColor: 'transparent', borderWidth: 1, borderColor: isInFavorite ? colors.GREEN_COLOR : '#E7E7E7', paddingHorizontal: 12, paddingVertical: 8}]} >
          <View >
          <Star />
          </View>
          <IfgText style={gs.fontCaption2}>В {isInFavorite ? 'избранном' : 'избранное'}</IfgText>
          </Button>
          <Button onPress={async()=> await onShare('https://ifeelgood.life/articles/antistress/kak-snizit-stress/chto-takoe-osoznannost-zachem-eyo-razvivat-i-kak-eto-delat-328')}
          style={[gs.flexRow, gs.alignCenter, {height: 46,gap: 8,borderRadius: 12, backgroundColor: '#FBF4E0',borderWidth: 1, borderColor: '#E7E7E7',paddingHorizontal: 12, paddingVertical: 8}]} >
          <View >
          <Share />
          </View>
          <IfgText style={gs.fontCaption2}>Поделиться</IfgText>
          </Button>
        </View>
        <View style={gs.mt24} />
        <View style={[gs.flexRow,gs.alignCenter, {justifyContent: 'space-between'}]}>

            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontBodyMedium, gs.bold]}>{'А также читайте'}</IfgText>
            <View>
            <ButtonTo onPress={()=>navigation.navigate('Материалы')} title="Все материалы" />

            </View>
          </View>

        <View style={gs.mt16} />
        <FlatList
                horizontal
                keyExtractor={(item, index)=>index.toString()}
                style={{marginHorizontal: -16}}
                contentContainerStyle={{flexGrow: 1, flexDirection: 'row'}}
                showsHorizontalScrollIndicator={false}
                data={articlesStore.articlesMainList.articles}
                renderItem={({item, index})=>MaterialCard(item, index)}
        />
        <View style={{height: 100}} />
    </IOScrollView>}</>;
    });

const s = StyleSheet.create({
    container: {
        // flex: 1,
        // width: '100%',
        // height: '100%',
        padding: 16,
    },
    cardGradientContainer:{
        flex: 1,
        padding: 16,
        flexDirection: 'column',
        gap: 10,
        overflow: 'hidden',
        borderRadius: 22,
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
      winnerCard: {
        borderRadius: 12,
        backgroundColor: colors.BLUE_COLOR,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 0,
      },
});
