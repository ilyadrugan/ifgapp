

import { ScrollView, StyleSheet, View, Image, ImageBackground, TouchableOpacity, FlatList, Alert} from 'react-native';
import React, { FC, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
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
import { TimeToDrinkBlock } from './blocks/timeToDrink';
import { ArticleHeader } from './components/articleHeader';
import {ShadowGradient} from '../../core/components/gradient/shadow-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChatFooter } from './blocks/chat-footer';
import { observer } from 'mobx-react';
import { dataContests } from '../contests/contests';
import { ContestType } from '../contests/models/models';
import { Stories } from './data/data';
import { hexToRgba } from '../../core/utils/hexToRGBA';
import userStore from '../../../store/state/userStore/userStore';
import articlesStore from '../../../store/state/articlesStore/articlesStore';
import { ArticleModel } from '../../../store/state/articlesStore/models/models';
import presentsStore from '../../../store/state/presentsStore/presentsStore';
import storiesStore from '../../../store/state/storiesStore/storiesStore';
import { StoryModal } from '../../core/components/storyModal/storyModal';
import { GetActivityBgColorName, StoryModel } from '../../../store/state/storiesStore/models/models';
import ifgScoreStore from '../../../store/state/ifgScoreStore/ifgScoreStore';


export const IFGHome = observer(() => {
    const navigation = useNavigation<any>();
    const [isModalVisible, setModalVisible] = useState(false);
    const [currentStoryPressed, setCurrentStoryPressed] = useState(0);

    useEffect(() => {
      userStore.getProfile();
      storiesStore.getStories();
      ifgScoreStore.getScoreToday()
      articlesStore.loadMoreArticles();
      articlesStore.clearCurrentArticle();
      console.log('articlesStore.currentArticle.id', articlesStore.currentArticle.id);

    }, []);

    const MaterialCard = ({title, media, subtitle, id}, index)=>
      <CardContainer onPress={async()=>{
        await articlesStore.clearCurrentArticle();
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
    const StoryCard = (item: StoryModel, index)=>
          <CardContainer onPress={() => {
            setCurrentStoryPressed(index);
            setModalVisible(true);}} style={[{width: 124, height: 166, padding:12, borderRadius: 16, borderWidth: 1, borderColor: GetActivityBgColorName(item.category_id).borderColor, backgroundColor: GetActivityBgColorName(item.category_id).bgColor, justifyContent: 'space-between' }, gs.mr12, index === 0 && gs.ml16]} >
            <Eye />
            <IfgText color={colors.SECONDARY_COLOR} style={[gs.fontLightSmall, gs.regular]}>{item.title}</IfgText>
      </CardContainer>;
return <>

      <ScrollView style={s.container}>
        <View style={gs.mt16} />
        <IfgText style={[gs.h2, gs.bold]} >{'Дом IFG'}</IfgText>
        <View style={gs.mt16} />

        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={storiesStore.storiesList}
          horizontal
          style={{marginHorizontal: -16}}
          contentContainerStyle={{flexGrow: 1, flexDirection: 'row'}}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index})=>StoryCard(item, index)}
        />

        <View style={gs.mt24} />

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
        <TimeToDrinkBlock isNew={true}/>

        <View style={gs.mt16} />
        <CardContainer onPress={()=>navigation.navigate('ArticleView', {articleId: 91})} >
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
        <CardContainer onPress={()=>navigation.navigate('ArticleView', {articleId: 91})}  >
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
          <ButtonNext onPress={()=>navigation.navigate('ArticleView', {articleId: 91})} title="Читать статью" oliveTitle="+ 3 балла" />
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
            <ButtonTo onPress={()=>navigation.navigate('Материалы')} title="Все материалы" />
          </View>
          <View style={gs.mt16} />
          <FlatList
                keyExtractor={(item, index)=>index.toString()}
                horizontal
                style={{marginHorizontal: -16}}
                contentContainerStyle={{flexGrow: 1, flexDirection: 'row'}}
                showsHorizontalScrollIndicator={false}
                data={articlesStore.articlesList.articles}
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
                  <IfgText style={gs.fontBody2}>{!item.winners ? 'Как получить приз' : 'К результатам'}</IfgText>
                  <View style={{marginTop:2}}>
                    <ArrowRightBlack width={12} />
                  </View>
                  </>

                </Button>
            </CardContainer>}
        />
        <View style={gs.mt24} />
          <ImageBackground
        resizeMode="stretch"
         source={require('../../../assets/backgrounds/gradientCard3.png')}
        style={[s.cardGradientContainer]}
         >
            <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption, gs.bold]}>Финансовая защита заемщиков кредитов</IfgText>
            <IfgText  color={colors.WHITE_COLOR} style={gs.fontCaptionSmall}>Узнайте как защитить себя и своих близких на случай непредвиденных ситуаций с жизнью и здоровьем в совместном проекте АльфаСтрахование-Жизнь и ifeelgood!</IfgText>
            <Button onPress={()=>navigation.navigate('Coverage')} outlined style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderColor: colors.WHITE_COLOR, borderWidth: 1, padding: 20, borderRadius: 12, height: 60}}>
                <>
                    <IfgText color={colors.WHITE_COLOR} style={gs.fontBodyMedium}>Подробнее</IfgText>
                    <ArrowRight />
                </>
            </Button>
         </ImageBackground>

        <View style={{height: 70}}/>
       {storiesStore.storiesList.length > 0 && <StoryModal
        stories={storiesStore.storiesList}
        currentStoryPressed={currentStoryPressed}
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />}
      </ScrollView>
      <ChatFooter />
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
      height: 30,
      },
    cardGradientContainer:{
        flex: 1,
        padding: 16,
        flexDirection: 'column',
        gap: 10,
      },

  });

