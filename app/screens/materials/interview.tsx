import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Image, Platform, TouchableWithoutFeedback, Keyboard, View, ActivityIndicator, ScrollView, StyleSheet, FlatList, Dimensions, ImageBackground } from 'react-native';
import { WinnerModel } from '../../../store/state/presentsStore/models/models';
import presentsStore from '../../../store/state/presentsStore/presentsStore';
import colors from '../../core/colors/colors';
import { Button, ButtonTo } from '../../core/components/button/button';
import { CardContainer } from '../../core/components/card/cardContainer';
import { IfgText } from '../../core/components/text/ifg-text';
import gs from '../../core/styles/global';
import { stripHtmlTags } from '../../core/utils/stripHtmlTags';
import { FeedBack } from '../contests/components/feedback';
import articlesStore from '../../../store/state/articlesStore/articlesStore';
import ArrowBack from '../../../assets/icons/arrow-back.svg';
import Like from '../../../assets/icons/like.svg';
import EyeViews from '../../../assets/icons/eye-views.svg';
import Star from '../../../assets/icons/star.svg';
import Share from '../../../assets/icons/share.svg';
import RenderHTML from 'react-native-render-html';
import { formatDateWithParamsMoment } from '../../core/utils/formatDateTime';
import { MaterialCard } from '../ifg-home/ifg-home';
import { onShare } from '../../core/components/share/share';
import { youtube_parser, YoutubeVideo } from '../../core/components/youtubePlayer/youtubePlayer';

const width = Dimensions.get('screen').width;

export const InterviewView = observer(({route}) => {
    const navigation = useNavigation<any>();
    const onBack = () => {
      articlesStore.clearCurrentInterView();
      navigation.goBack();
    };
    const { interviewId } = route.params;
    // const [isInFavoriet, setIsInFavoriet] = useState(false);
    useEffect(() => {
      if (interviewId !== undefined) {
        loadInterviewById(interviewId);
        console.log(interviewId);
        // setIsInFavoriet(articlesStore.articlesUserList.some(article=>article.id === articleId));
      }
    }, [interviewId]);

    const loadInterviewById = async (id) => await articlesStore.getInterviewById(id);

    const likeInterView = async (action: number) => {
        await articlesStore.changeLikeInterView(articlesStore.currentInterview.id, action);
    };

    // const addInFavorite = async () => await articlesStore.changeUserArticle(articleId).then(()=>
    //   {console.log(articlesStore.articlesUserList.map((item)=>item.id));
    //   setIsInFavoriet(articlesStore.articlesUserList.some(article=>article.id === articleId));});

    return <>
    {articlesStore.isLoading && <View style={{justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <ActivityIndicator size={'large'} animating/>
      </View>}
      {articlesStore.currentInterview.id !== 0 && <ScrollView
      style={s.container}>
        <Button style={s.buttonBack} onPress={onBack}>
            <>
                <ArrowBack />
                <IfgText color={colors.GRAY_COLOR3} style={gs.fontBody2}>Назад</IfgText>
            </>
        </Button>
        <View style={gs.mt16} />
        <IfgText style={[gs.h2, gs.bold]}>{stripHtmlTags(articlesStore.currentInterview?.theme)}</IfgText>
        <View style={gs.mt16} />
        <ImageBackground
            resizeMode="stretch"
            source={require('../../../assets/backgrounds/gradientCard4.png')}
            style={[s.cardGradientContainer]}
            >
                <View style={{width: '55%'}}>
                <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption, gs.bold]}>{stripHtmlTags(articlesStore.currentInterview.thumb_title)}</IfgText>
                <IfgText  color={colors.WHITE_COLOR} style={[gs.fontCaptionSmall, gs.mt12]}>{stripHtmlTags(articlesStore.currentInterview.title)}</IfgText>
                <ButtonTo style={[s.buttonTo, gs.mt16]} textColor={colors.WHITE_COLOR} title="Участвовать" whiteIcon/>
                </View>
                <Image resizeMode="contain" style={{position: 'absolute',width: '55%', height: '130%',  right: 0 }}
                source={{uri: `https://ifeelgood.life${articlesStore.currentInterview.media[0].full_path[0]}`}}/>
        </ImageBackground>
        <View style={gs.mt16} />
        <CardContainer >
        <IfgText style={[gs.fontCaption, gs.bold]}>{'В программе вы узнаете:'}</IfgText>
        <View style={{flexDirection: 'column', gap: 10}}>
            {stripHtmlTags(articlesStore.currentInterview.desc).split('— ').slice(1).map(point=>
                 <View style={[gs.flexRow ]}>
                    <View style={s.bullet} />
                    <IfgText style={gs.fontCaption2}>{point}</IfgText>
                 </View>
            )}
        </View>
        <YoutubeVideo videoId={youtube_parser(articlesStore.currentInterview.video) || ''} />
        </CardContainer>
        <View style={gs.mt16} />
        <CardContainer style={[gs.flexRow, {justifyContent: 'space-between', borderRadius: 12}]}>
        <IfgText style={gs.fontCaption}>Опубликовано:</IfgText>
        <IfgText style={[gs.fontCaption, gs.bold]}>{formatDateWithParamsMoment(articlesStore.currentInterview.publication_date, '+03:00', 'D.MM.YYYY')}</IfgText>
        </CardContainer>
        <View style={gs.mt12} />

        <View style={[gs.flexRow, {justifyContent: 'space-between'}]}>
          <Button disabled={articlesStore.isUserArticleLoading} onPress={()=>likeInterView(1)} style={[gs.flexRow, gs.alignCenter, {justifyContent: 'flex-start', borderRadius: 12, backgroundColor: colors.WHITE_DIRTY_COLOR, width: (width - 32) * 0.48, height: 46}]} >
          <View style={{marginLeft: 16, top: -1}}>
          <Like />
          </View>
          <IfgText style={[gs.fontCaption2, {marginLeft: 10}]}>{articlesStore.currentInterview.like} нравится</IfgText>
          </Button>

          <Button disabled={articlesStore.isUserArticleLoading} onPress={()=>likeInterView(0)} style={[gs.flexRow, gs.alignCenter, {justifyContent: 'flex-start',borderRadius: 12, backgroundColor: '#FFF3F8', width: (width - 32) * 0.48, height: 46}]} >
          <View style={{marginLeft: 16, top: 1, transform: [{ scaleY: -1 }]}}>
          <Like />
          </View>
          <IfgText style={[gs.fontCaption2, {marginLeft: 10}]}>{articlesStore.currentInterview.unlike} не нравится</IfgText>
          </Button>
        </View>

        <View style={gs.mt12} />

        <View style={[gs.flexRow, { gap: 10, flexWrap: 'wrap'}]}>
          <Button style={[gs.flexRow, gs.alignCenter, {height: 46,gap: 8,borderRadius: 12, backgroundColor: 'transparent', borderWidth: 1, borderColor: '#E7E7E7', paddingHorizontal: 12, paddingVertical: 8}]} >
          <View style={{ top: -1}}>
          <EyeViews/>
          </View>
          <IfgText style={gs.fontCaption2}>{articlesStore.currentInterview.views}</IfgText>
          </Button>

          {/* <Button disabled={articlesStore.isUserArticleLoading}  onPress={addInFavorite} style={[gs.flexRow, gs.alignCenter, {height: 46,gap: 8,borderRadius: 12, backgroundColor: 'transparent', borderWidth: 1, borderColor: isInFavoriet ? colors.GREEN_COLOR : '#E7E7E7', paddingHorizontal: 12, paddingVertical: 8}]} >
          <View >
          <Star />
          </View>
          <IfgText style={gs.fontCaption2}>В {isInFavoriet ? 'избранном' : 'избранное'}</IfgText>
          </Button> */}
          <Button onPress={async()=> await onShare('https://ifeelgood.life/articles/antistress/kak-snizit-stress/chto-takoe-osoznannost-zachem-eyo-razvivat-i-kak-eto-delat-328')}
          style={[gs.flexRow, gs.alignCenter, {height: 46,gap: 8,borderRadius: 12, backgroundColor: '#FBF4E0',borderWidth: 1, borderColor: '#E7E7E7',paddingHorizontal: 12, paddingVertical: 8}]} >
          <View >
          <Share />
          </View>
          <IfgText style={gs.fontCaption2}>Поделиться</IfgText>
          </Button>
        </View>
        <View style={gs.mt24} />
        {/* <View style={[gs.flexRow,gs.alignCenter, {justifyContent: 'space-between'}]}>

            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontBodyMedium, gs.bold]}>{'А также читайте'}</IfgText>
            <View>
            <ButtonTo onPress={()=>navigation.navigate('Материалы')} title="Все материалы" />

            </View>
          </View>
        <View style={gs.mt16} /> */}
        {/* <FlatList
                horizontal
                style={{marginHorizontal: -16}}
                contentContainerStyle={{flexGrow: 1, flexDirection: 'row'}}
                showsHorizontalScrollIndicator={false}
                data={articlesStore.articlesList.articles}
                renderItem={({item, index})=>MaterialCard(item, index)}
        /> */}
        <View style={{height: 100}} />
    </ScrollView>}</>;
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
        flexDirection: 'row',
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
      buttonTo: {
        justifyContent:'space-between',
        flexDirection: 'row',
        width: 124,
        height: 26,
        borderColor: 'white',
      },
      bullet: {
        width: 6, // Размер точки
        height: 6,
        borderRadius: 4, // Делает элемент круглым
        backgroundColor: colors.GREEN_COLOR, // Цвет точки
        marginRight: 8, // Отступ между точкой и текстом
        marginTop: 6, // Отступ между точкой и текстом
        // alignSelf: 'center',
      },
});