import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import React, { useEffect, useState, useRef } from 'react';
import { Image, View, ActivityIndicator, Text, StyleSheet, FlatList, Dimensions, ScrollView, Linking, StyleProp, TextStyle, ViewStyle } from 'react-native';
import colors from '../../core/colors/colors';
import { Button, ButtonTo } from '../../core/components/button/button';
import { CardContainer } from '../../core/components/card/cardContainer';
import { IfgText } from '../../core/components/text/ifg-text';
import gs from '../../core/styles/global';
import { parseHTMLToSequentialObjects, stripHtmlTags, stripWebHtmlSheluha } from '../../core/utils/stripHtmlTags';
import articlesStore from '../../../store/state/articlesStore/articlesStore';
import ArrowBack from '../../../assets/icons/arrow-back-black.svg';
import Like from '../../../assets/icons/like.svg';
import EyeViews from '../../../assets/icons/eye-views.svg';
import Star from '../../../assets/icons/star.svg';
import Share from '../../../assets/icons/share.svg';
import VerifiedExpert from '../../../assets/icons/articleTypes/verified_expert.svg';
import VerifiedResearcher from '../../../assets/icons/articleTypes/verified_researcher.svg';
import VerifiedScience from '../../../assets/icons/articleTypes/verified_science.svg';
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
import HTMLView from 'react-native-htmlview';
import { youtube_parser, YoutubeVideo } from '../../core/components/youtubePlayer/youtubePlayer';
import Accept from '../../../assets/icons/accept-article.svg';

const width = Dimensions.get('screen').width;

export const ArticleView = observer(({route}) => {
    const navigation = useNavigation<any>();
    const onBack = () => {
      articlesStore.clearCurrentArticle();
      navigation.goBack();
    };
    const { articleId } = route.params;
    const [isInFavorite, setIsInFavorite] = useState(false);
    const [isReaded, setIsReaded] = useState(false);
    const [personalRecommendation, setPersonalRecommendation] = useState<PersonalRecommendationModel>();
    useEffect(() => {
      // console.log(articleId,'articlesStore.currentArticle.id', articlesStore.currentArticle.id);

     if (articleId !== undefined) {
        loadArticleById(articleId).then(()=>
        setIsInFavorite(articlesStore.articlesUserList.some(article=>article.id === articleId)));
        // console.log('articleId', articleId, articlesStore.currentArticle.body_json || articlesStore.currentArticle.body || '');
        const persRec = recommendationStore.personalRecomendationList.find((rec)=> rec.article.id === articleId);
        console.log('persRec', persRec);
        if (persRec) {
          setPersonalRecommendation(persRec);
          setIsReaded(persRec.status === 'completed');
        }
        else {
          setIsReaded(true);
        }
      }
    }, [articleId]);
    const clearCurrentArticle = async () => await articlesStore.clearCurrentArticle();
    const loadArticleById = async (id) => await articlesStore.getArticleById(id);

    const likeArticle = async (action: number) => await articlesStore.changeLikeUserArticle(articleId, action);

    const addInFavorite = async () => await articlesStore.changeUserArticle(articleId).then(()=>
      {
        // console.log(articlesStore.articlesUserList.map((item)=>item.id));
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
      // console.log('personalRecommendation.id',personalRecommendation.id);
      await recommendationStore.completeRecommendation(`${personalRecommendation.id}`);
      const categoryEng = RecommendationCategoryToEng(personalRecommendation.category);
      // console.log('categoryEng',categoryEng, dailyActivityStore.dailyTodayActivityData[categoryEng] + 1);
      dailyActivityStore.addDailyActivity(categoryEng, dailyActivityStore.dailyTodayActivityData[categoryEng] + 1);
      await recommendationStore.getPersonalRecommendations();
    }
     setIsReaded(true);
    };
    const containsImage = (node) => {
      return node.children?.some((child) => child.name === 'img');
    };
    const containsVideo = (node) => {
      return node.children?.some((child) => child.name === 'iframe');
    };

    const renderNode = (node, index, siblings, parent, defaultRenderer) => {
      console.log('node.type', node.type);
      if (node.name === 'img') {
        let imageUri = node.attribs?.src.startsWith('https:/')
          ? node.attribs?.src
          : `https://ifeelgood.life/storage${node.attribs?.src.split('storage')[1]}`;
        if (imageUri && imageUri.includes('?')) {
          imageUri = imageUri.split('?')[0];
        }
        console.log('Image URI:', imageUri); // Проверяем URI
        return (
          <View key={index}>
            <Image source={{ uri: imageUri }} resizeMode="cover" style={customStyles.img} />
          </View>
        );
      }

      if (node.name === 'iframe') {
        const videoUrl = node.attribs?.src;
        if (videoUrl) {
                return <View><YoutubeVideo videoId={youtube_parser(videoUrl) || ''} /></View>;
        }
      }
      if (node.name === 'blockquote'){
          return (
          <View key={index} style={customStyles.blockquote}>
            {defaultRenderer(node.children, node)}
          </View>
         );}
      if (node.name === 'tbody') {
        return (
          <ScrollView key={index}  style={[customStyles.tableContainer, {flexDirection: 'column'}]}>
            <View style={customStyles.tbody}>{defaultRenderer(node.children, node)}</View>
          </ScrollView>
        );
      }
      if (node.name === 'table') {
        return defaultRenderer(node.children, node);
      }

      if (node.name === 'tr') {
        return <View key={index} style={[customStyles.tr, {backgroundColor: index === 0 ? '#effaf3' : '#f9f9f9', borderRadius: 12, borderWidth: 1, borderColor: 'black', marginTop: 6}]}>{defaultRenderer(node.children, node)}</View>;
      }

      if (node.name === 'th') {
        return <IfgText key={index} style={[customStyles.th]}>{defaultRenderer(node.children, node)}</IfgText>;
      }

      if (node.name === 'td') {
        const tdChilds = parent.children.filter((child)=>child.name === 'td');
        const tdIndex = tdChilds.findIndex((child)=>child === node);
        // console.log('td','containsImage', containsImage(node));
        // if (containsImage(node.children) || containsVideo(node.children)) {
        //   return <View style={[customStyles.td, {borderRightWidth: (tdIndex !== (parent.children.length - 1) ) ? 1 : 0}]}>{defaultRenderer(node.children, node)}</View>;
        // }
        return <View key={index} style={[customStyles.td, {borderRightWidth: (tdIndex !== (parent.children.length - 1) ) ? 1 : 0}]}>{defaultRenderer(node.children, node)}</View>;
      }
      if (node.name === 'span') {
        if (containsImage(node) || containsVideo(node)) {
          return defaultRenderer(node.children, node);
        }
        return (
          <IfgText key={index} style={[customStyles.span,{ flexWrap: 'nowrap', display: 'flex' }]}>
            {defaultRenderer(node.children, node)}
          </IfgText>
        );
      }
      if (node.name === 'em') {
        return <IfgText style={[gs.italic]}>{defaultRenderer(node.children, node)}</IfgText>;
      }
      if (node.name === 'strong') {
        return <IfgText key={index} style={[customStyles.span, gs.bold]}>{node.children ? defaultRenderer(node.children, node) : node.data}</IfgText>;
      }
      if (node.name === 'a') {
        const Url = node.attribs?.href;
        return <IfgText key={index} onPress={()=>Linking.openURL(Url)} style={[customStyles.span, customStyles.a]}>{defaultRenderer(node.children, node)}</IfgText>;
      }
      if (node.name === 'p') {
        const tableTags = ['tr', 'th', 'td', 'table'];
        return (tableTags.includes(parent?.name) || containsImage(node) || containsVideo(node))  ?
        defaultRenderer(node.children, node)
        : <IfgText style={[customStyles.p]}>
            {defaultRenderer(node.children, node)}
        </IfgText>;
      }
      if (node.name === 'div') {
        return defaultRenderer(node.children, node);
      }
      if (node.name === 'ul') {
        return <View style={[customStyles.ul]}>
            {defaultRenderer(node.children, node)}
        </View>;
      }
      if (node.name === 'ol') {
        return <View style={[customStyles.ul]}>
            {defaultRenderer(node.children, node)}
        </View>;
      }

      if (node.name === 'li') {
        console.log('li','index', parent?.name, index);
        const liChilds = parent.children.filter((child)=>child.name === 'li');
        const liIndex = liChilds.findIndex((child)=>child === node);
        console.log(liIndex);
        // console.log(parent.children);
        return <View style={{flexDirection: 'row',  maxWidth: width - 120}}>
          {parent?.name === 'ol' ? <IfgText color={colors.GREEN_COLOR} style={[gs.h2Intro,gs.mr8, gs.mt16]}>0{liIndex + 1}</IfgText> : <View style={[customStyles.bullet, gs.mt24]}/>}
          {node.children[0].name !== 'p' ? <IfgText style={[customStyles.p]}>
            {defaultRenderer(node.children, node)}
        </IfgText> : defaultRenderer(node.children, node)}
          </View>;
      }
      if (node.name === 'h3' || node.name === 'h2' || node.name === 'h1' || node.name === 'h4' || node.name === 'h5') {
        return <View style={{flexDirection: 'row', width:width - 32, alignItems:'center', marginTop:12}}>
        <View style={gs.mr12}>
          <Accept />
        </View>
        <View style={{flexDirection: 'row',flexWrap: 'wrap',maxWidth: width - 140 , alignItems:'center'}}>{
        (containsImage(node) || containsVideo(node)) ? defaultRenderer(node.children, node)
        : node.children.map(child=>{
          console.log('child.name', child.name);
          if (child.data) {
            console.log('ZAGOLOVOK');
            return <IfgText key={index} style={[customStyles.h, gs.bold]}>{child.data}</IfgText>;
          }
          if (child.name === 'span') {
            console.log(child.children);

            return <IfgText key={index} style={[customStyles.h, gs.bold]}>{child.children.map((c)=>{
              if (c.data) {
                return c.data;
              }
              console.log('CCC', c.name, c.children[0]);
              if (c.name === 'a') {
                let Url;
                let isLinking = false;
                if (c.attribs?.href.startsWith('https')){
                  Url = c.attribs?.href;
                  isLinking = true;
                }
                else{
                  const splited = c.attribs?.href.split('articles/')[1];
                  Url = splited;
                }
                return <IfgText style={[customStyles.h, gs.bold, gs.underline]} key={index} onPress={()=>isLinking ? Linking.openURL(Url) : navigation.navigate('ArticleView', {articleId: Number(Url)})}>{c.children[0].children.map((text)=>text.data)}</IfgText>;
              }
              return defaultRenderer(c.children, c);
            })}</IfgText>;
          }
            return defaultRenderer(child.children, child);

        })}</View>
         </View>;
      }

      // 📌 Если элемент содержит только текст — рендерим его без вложенного `View`
      if (!node.children || node.children.length === 0) {
        // console.log('parent', parent.name, node.parent.attribs);
        // console.log('node', node);

        if ((node.parent.name === 'span' || node.parent.name === 'p') && node.parent.attribs?.style){
          // console.log('node.attribs?.style', node.parent.attribs.style);
          if (node.parent.attribs?.style.includes('background-color: ')){
            const color = node.parent.attribs?.style.split('background-color: ')[1].split(';')[0];
            // console.log('BGCOLOR', color);
            return <IfgText style={{backgroundColor: color ? color : 'transparent'}} key={index}>{node.data}</IfgText>;}
          if (node.parent.attribs?.style.includes('vertical-align: super'))
            {return <IfgText style={{marginBottom: parent.attribs?.style.includes('vertical-align: super') ? 14 : 0}} key={index}>{node.data}</IfgText>;}
        }
        if (node.parent.name === 'strong') {
          return <IfgText key={index} style={gs.bold}>{node.data}</IfgText>;
        }
        if (node.parent.name === 'em') {
          return <IfgText key={index} style={[gs.italic]}>{node.data}</IfgText>;
        }
        if (node.parent.name === 'a') {
          let Url;
          let isLinking = false;
          if (node.parent.attribs?.href.startsWith('https')){
            Url = node.parent.attribs?.href;
            isLinking = true;
          }
          else{
            const splited = node.parent.attribs?.href.split('articles/')[1];
            Url = splited;
          }
          return <IfgText key={index} onPress={()=>isLinking ? Linking.openURL(Url) : navigation.navigate('ArticleView', {articleId: Number(Url)})} color={colors.GREEN_COLOR}>{node.data}</IfgText>;
        }
        return <IfgText key={index}>{node.data}</IfgText>;
      }
      if (node.name === 'collgroup') {
        return null;
      }
      if (containsImage(node) || containsVideo(node)) {
        return defaultRenderer(node.children, node);
      }
      return <IfgText key={index}>{defaultRenderer(node.children, node)}</IfgText>;
    };

    return <>
    {articlesStore.isLoading && <View style={{justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <ActivityIndicator size={'large'} animating/>
      </View>}

      {articlesStore.currentArticle.id !== 0 && <IOScrollView
      style={s.container}
      >
        <View style={gs.mt48} />
        <IfgText style={[gs.h2, gs.bold]}>{articlesStore.currentArticle?.title}</IfgText>
        <View style={gs.mt16} />
        <Image
                style={{alignSelf: 'center', height: 170, width: '100%', borderRadius: 16}}
                source={{uri: `https://ifeelgood.life${articlesStore.currentArticle.media[0].full_path[0]}`}}
        />

        <View style={gs.mt16} />
        {(articlesStore.currentArticle.body !== null && articlesStore.currentArticle.body?.length > 20) &&
        <CardContainer style={{gap:0}}>

          <HTMLView
          renderNode={renderNode}
          value={articlesStore.currentArticle.body?.length > 20 ? stripWebHtmlSheluha(articlesStore.currentArticle.body) : ''}
          stylesheet={customStyles}
        />
       </CardContainer>}

        {articlesStore.currentArticle.body_json && articlesStore.currentArticle.body_json.map((json)=>{
          if (json.type === 'html'){
            return <CardContainer style={{gap:0}}>

                <HTMLView
          renderNode={renderNode}
          value={stripWebHtmlSheluha(json.data)}
          stylesheet={customStyles}
        />
            </CardContainer>;
          }
          return <></>;
        })}


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

        <View style={[gs.flexRow, { justifyContent: 'space-between'}]}>
          <Button style={[gs.flexRow, gs.alignCenter, {height: 46,gap: 2,borderRadius: 12, backgroundColor: 'transparent', borderWidth: 1, borderColor: '#E7E7E7', paddingHorizontal: 12, paddingVertical: 8}]} >
          <View style={{ top: -1}}>
          <EyeViews/>
          </View>
          <IfgText style={gs.fontCaption2}>{articlesStore.currentArticle.views}</IfgText>
          </Button>

          <Button disabled={articlesStore.isUserArticleLoading}  onPress={addInFavorite} style={[gs.flexRow, gs.alignCenter, {height: 46,gap: 8,borderRadius: 12, backgroundColor: 'transparent', borderWidth: 1, borderColor: isInFavorite ? colors.GREEN_COLOR : '#E7E7E7', paddingHorizontal: 12, paddingVertical: 8}]} >
          {articlesStore.isUserArticleLoading ? <ActivityIndicator/> : <Star />}
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
                data={articlesStore.articlesMainList.articles.filter((article)=>article.id !== articlesStore.currentArticle.id)}
                renderItem={({item, index})=>MaterialCard(item, index)}
        />
        <View style={{height: 100}} />
    </IOScrollView>}
    <Button onPress={onBack} style={[s.roundButton]}>
      <ArrowBack />
        </Button>
    </>;
    });
const customStylesHtml = {
      h1: {
        ...gs.fontCaption2,
        color: colors.PLACEHOLDER_COLOR,
        ...gs.bold,
      },
      h2: {
        ...gs.fontCaption2,
        color: colors.PLACEHOLDER_COLOR,
        ...gs.bold,
      },
      h3: {
        ...gs.fontCaption2,
        color: colors.PLACEHOLDER_COLOR,
        ...gs.bold,
      },
      h4: {
        ...gs.fontCaption2,
        color: colors.PLACEHOLDER_COLOR,
        ...gs.bold,
      },
      h5: {
        ...gs.fontCaption2,
        color: colors.PLACEHOLDER_COLOR,
        ...gs.bold,
      },
    };
const customStyles = StyleSheet.create( {
      p: {
         marginTop: 16,
        //  flexDirection: 'row',
        flexWrap: 'nowrap',
        ...gs.fontCaption2,
        color: colors.PLACEHOLDER_COLOR,
      },
      span: {
        ...gs.fontCaption2,
        color: colors.PLACEHOLDER_COLOR,
        // marginBottom: 10,

      },
      div:{
        margin:0,
      },
      h: {
        ...gs.bold,
        ...gs.fontBodyMedium,
      },
      ul: {
        paddingLeft: 10,
      },
      a: {
        color: 'green',
        textDecorationLine: 'underline',
      },
      img: {
        width: '100%',
        height: 200,
        marginVertical: 12,
      },
      tableContainer: {
        width: width - 64,
        // overflow: 'scroll', // Добавлено для совместимости
        // flexDirection: 'column',
      },
      tbody: {
        // borderWidth: 1,
        // borderColor: '#ddd',
        // marginBottom: 10,
        flexDirection: 'column',
        // width: '100%',
      },
      tr: {
        flexDirection: 'row',
        width: width - 64,
      },
      th: {
        fontWeight: 'bold',
        padding: 8,
        backgroundColor: '#f1f1f1',
        flex: 1,
        textAlign: 'center',
      },
      td: {
        padding: 8,
        flex: 1,
        textAlign: 'center',
      },
      bullet: {
        width: 8,
        height: 8,
        borderRadius: 10,
        marginRight: 8,
        marginTop: 5,
        backgroundColor: colors.GREEN_COLOR,
      },
      blockquote: {
        // justifyContent: 'center',
        // alignItems: 'center',
        paddingTop: 4,
        paddingLeft: 16,
        paddingBottom: 16,
        marginVertical: 12,
        backgroundColor: '#effaf3',
        borderRadius: 12,
      },
      h1: {
        ...gs.fontCaption,
      },
      h2: {
        ...gs.fontCaption,
      },
      h3: {
        ...gs.fontCaption,
      },
      h4: {
        ...gs.fontCaption,
      },
      h5: {
        ...gs.fontCaption,
      },
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
        // position: 'absolute',
        // backgroundColor: colors.WHITE_COLOR,
        backgroundColor: 'transparent',
        borderColor: colors.BORDER_COLOR2,
        borderWidth: 0.75,
        borderRadius: 8,
        width: 84,
        height: 26,
      },
      roundButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.WHITE_COLOR,
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 10, height: 2},
        shadowRadius: 20,
        elevation: 8,
      },
      winnerCard: {
        borderRadius: 12,
        backgroundColor: colors.BLUE_COLOR,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 0,
      },
});
