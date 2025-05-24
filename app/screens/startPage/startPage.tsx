import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, Platform, View, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../../core/colors/colors';
import { IfgText } from '../../core/components/text/ifg-text';
import gs from '../../core/styles/global';
import { Button } from '../../core/components/button/button';
import ArrowBack from '../../../assets/icons/arrow-back.svg';
import { CardContainer } from '../../core/components/card/cardContainer';
import VideoBackground from '../../core/components/video-background/video-background';
import { ScreenWidth } from '../../hooks/useDimensions';
import ProfileHolderBig from '../../../assets/icons/profileHolderBig.svg';
import { observer } from 'mobx-react';
import { ArticleModel, MaterialsStart, NavigationCards } from './const';
import { NavigatorCard, NavigatorCardType } from './components/navigator-card';
import ArrowRiht from './components/icons/arrow-riht.svg';
import { MaterialCard } from './components/material-start';
import Quotes from '../../../assets/icons/quotes66.svg';
import { PROD_URL } from '../../core/hosts';
import {getGreeting} from '../../core/utils/getGreetings';
import userStore from '../../../store/state/userStore/userStore';


export const StartPage = observer(({route}) => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<any>();
    const flatlistRef = useRef<FlatList<ArticleModel>>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Показываем лоадер на 0.5 сек
      const timer = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(timer);
    }, []);
    const onBack = () => {
      navigation.goBack();
    };
    const flag = route.params ? false : true;
    const renderNavigatorCard = (item: NavigatorCardType) => <NavigatorCard {...item}/>;
    const renderMaterialCard = (item: ArticleModel) => <MaterialCard {...item}/>;
    const viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 70,
      };
    const onViewRef = useRef(({ viewableItems }: any) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index);
      }
    });
    const onPressArrow = (type: string) => {
      if (currentIndex >= 0 && currentIndex < MaterialsStart.length) {
        if (type === 'prev') {
          flatlistRef.current?.scrollToIndex({ index:currentIndex - 1, animated: true });
          setCurrentIndex((prev)=> prev - 1);
          return;
        }
        flatlistRef.current?.scrollToIndex({ index:currentIndex + 1, animated: true });
          setCurrentIndex((prev)=> prev + 1);
          return;
      }
    };

    return <>

     <ScrollView
      style={s.container}>
         <Button style={[s.buttonBack, {marginTop: Platform.OS === 'ios' ? insets.top - 16 : insets.top}]} onPress={onBack}>
            <>
                <ArrowBack />
                <IfgText color={colors.GRAY_COLOR3} style={gs.fontBody2}>Назад</IfgText>
                </>
        </Button>
        <View style={gs.mt16} />

        <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.h2, gs.bold]}>
         Моя программа
        </IfgText>
      <View style={gs.mt16} />
      <CardContainer style={{padding: 0, height: flag ? 380 : 430, borderRadius: 32, overflow: 'hidden'}} >
        <VideoBackground
        style={{backgroundColor: 'blue'}}
        // source={{uri: PROD_URL + '/images/home/bg-video.mp4'}}
        source={require('../../../assets/videos/bg-video.mp4')}
        >
          <View style={{paddingHorizontal: 24}}>
            <IfgText color={colors.WHITE_COLOR} style={[gs.h2Intro, gs.mt32]} >
              {flag ? 'Здоровый образ жизни!' : 'Похудеем с умом!'}
            </IfgText>
          </View>
          <View style={{paddingHorizontal: 24}}>
          <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption2, gs.mt16]}>
           {'Ваш персональный путь к\nстройности'}
          </IfgText>
          </View>
          <Image
          resizeMode="contain"
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '50%',
            alignSelf: 'center',
            zIndex: 4,
          }}
         source={{uri: 'https://ifeelgood.life/images/fc758c5e057cfe1536da069939ab1635.png'}} />
          <IfgText color={colors.WHITE_COLOR} style={[{position: 'absolute', left: '10%', bottom: flag ? 40 : 70}, gs.h1Big]}>IFEELGOOD</IfgText>
        </VideoBackground>
      </CardContainer>
      {flag ? null : <CardContainer style={{padding: 24, marginTop: -46}}>
        <View style={{flexDirection: 'row', gap: 12}}>
          <View style={s.photo}>
                <ProfileHolderBig />
          </View>
          <View style={{paddingVertical: 4}}>
            <IfgText color="rgba(83, 84, 93, 1)" style={gs.fontCaption}>
              {getGreeting()},
            </IfgText>
            <IfgText style={gs.h2} color="rgba(92, 194, 128, 1)">
              {userStore.userInfo?.name || userStore.userInfo?.email || userStore.userInfo?.phone  }!
            </IfgText>
          </View>
        </View>
        <View style={gs.mt4}/>
        <IfgText color="rgba(83, 84, 93, 1)" style={gs.fontCaption}>
          {'Поздравляем с началом вашего пути к здоровому и красивому телу!\nЭта страница станет вашим верным помощником и проводником в мире здорового образа жизни.\nЗдесь вы найдете все инструменты для достижения вашей цели'}
        </IfgText>
      </CardContainer>}
      <IfgText color="#BBBBBB" style={[gs.mt32,gs.fontCaption2]}>
        01 / 05
      </IfgText>
      <IfgText color={colors.SECONDARY_COLOR} style={[gs.mt16, gs.h2Intro ]}>
        Хорошее самочувствие ждёт вас!
      </IfgText>
      <View style={gs.mt24}/>
      <CardContainer style={{padding: 0, overflow: 'hidden'}} >
        <VideoBackground
    style={{ paddingTop: 32, backgroundColor: 'blue', paddingBottom: ScreenWidth * 0.72 }} // добавлен paddingBottom
  // source={{uri: PROD_URL + '/images/fon2.mp4'}}
        source={require('../../../assets/videos/fon2.mp4')}
  >
    <View style={{paddingHorizontal: 28}}>
        <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption, gs.medium]}>
          {'Пройдите тестирование и получите\nперсональные рекомендации по\nпитанию, сну, физическим активностям\nи снижению стресса!'}
        </IfgText>
    </View>

    <View style={{paddingHorizontal: 28}}>
        <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption2, gs.regular, gs.mt24]}>
          {'Это займет всего несколько минут и поможет нам\nподобрать для вас оптимальную программу.'}
        </IfgText>
    </View>
    <View style={[gs.mt24, {paddingHorizontal: 28}]} >
    <Button
      onPress={() => navigation.navigate('Testing')}
      style={{ height: 64, backgroundColor: colors.GREEN_COLOR, borderRadius: 12, alignItems: 'center' }}
    >
      <IfgText style={[gs.fontCaptionMedium]} color={colors.WHITE_COLOR}>
        Пройти тестирование
      </IfgText>
    </Button>
    </View>

    {/* 👇 Абсолютно позиционированное изображение */}
    <Image
      source={{ uri: 'https://ifeelgood.life/images/Group%2014891.png' }}
      resizeMode="contain"
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: ScreenWidth * 0.7,
        alignSelf: 'center',
      }}
    />
  </VideoBackground>
      </CardContainer>
      <IfgText color="#BBBBBB" style={[gs.mt32,gs.fontCaption2]}>
        02 / 05
      </IfgText>
      <IfgText color={colors.SECONDARY_COLOR} style={[gs.mt16, gs.h2Intro ]}>
        {'Ваша программа'}
      </IfgText>
      <IfgText color={colors.SECONDARY_COLOR} style={[gs.mt16, gs.fontCaption3 ]}>
        {'Используйте все возможности iFeelGood для достижения результатов'}
      </IfgText>
      <View style={gs.mt16}/>
      {NavigationCards.map((item)=>
        <View>
          {renderNavigatorCard(item)}
        </View>)
      }
      <IfgText color="#BBBBBB" style={[gs.mt32,gs.fontCaption2]}>
        03 / 05
      </IfgText>
      <View style={gs.flexRow}>
        <View style={gs.flex1}>
          <IfgText color={colors.SECONDARY_COLOR} style={[gs.mt16, gs.h2Intro ]}>
          Лёгкий старт
          </IfgText>
          <IfgText color={colors.SECONDARY_COLOR} style={[gs.mt16, gs.fontCaption2 ]}>
          Начните ваш путь к хорошему самочувствию с изучения полезных материлов!
          </IfgText>
        </View>
        <View style={[gs.flexRow, {gap: 8, alignItems: 'center'}]}>
          <Button disabled={currentIndex === 0} onPress={()=>onPressArrow('prev')} style={s.buttonNextBack}>
            <View style={{transform: [{rotate: '180deg'}] }}>
              <ArrowRiht />
            </View>
          </Button>
          <Button disabled={currentIndex === MaterialsStart.length - 1} onPress={()=>onPressArrow('next')} style={s.buttonNextBack}>
            <ArrowRiht />
          </Button>
        </View>
      </View>
      <FlatList
      ref={flatlistRef}
      data={MaterialsStart}
      style={{marginHorizontal: -16, marginTop: 24}}
      // contentContainerStyle={{flexGrow: 1, flexDirection: 'row'}}
      horizontal
      snapToAlignment="start"
      decelerationRate="fast"
      bounces={false}
      onViewableItemsChanged={onViewRef.current}
      viewabilityConfig={viewabilityConfig}
      showsHorizontalScrollIndicator={false}
      renderItem={({item})=>renderMaterialCard(item)}
      pagingEnabled
      // ItemSeparatorComponent={()=><View style={{width: 10}} />}
      />
      <View style={gs.mt24} />
      <CardContainer style={{padding: 0, overflow: 'hidden'}}>
        <View style={{padding: 16}}>
        <Quotes />
        <IfgText color={colors.SECONDARY_COLOR} style={[gs.fontCaption2, gs.mt12]}>
          ifeelgood — ваш персональный помощник в мире здорового образа жизни. Мы понимаем, что каждый человек уникален, поэтому предлагаем индивидуальный подход к достижению ваших целей. Наши программы разработаны экспертами и адаптируются под ваши потребности и особенности. С помощью ifeelgood вы получите персональные рекомендации по питанию, тренировкам и управлению стрессом, которые помогут вам достичь желаемых результатов и сохранить их надолго.
        </IfgText>

        <IfgText color={colors.SECONDARY_COLOR} style={[gs.mt12,gs.fontCaption2]}>
          <IfgText style={gs.bold}>
          {'Мы верим в ваш успех и готовы поддержать вас на каждом этапе вашего пути!\n'}
          </IfgText>
          Создатели ifeelgood
        </IfgText>
         </View>
         <View style={{height: 320}} />
        <Image style={{position: 'absolute', width: '100%', bottom:-10, left: 0 }} resizeMode="contain" height={340} source={{uri: `${PROD_URL}/images/Group 14885.png`}}/>
      </CardContainer>
      <View style={{height: 100}} />
    </ScrollView>
    {loading && (
        <View style={s.loaderOverlay}>
          <ActivityIndicator size="large"  />
        </View>
      )}
    </>;});

const s = StyleSheet.create({
    container: {
            flex: 1,
            width: '100%',
            height: '100%',
            padding: 16,
        },
    photo: {
          backgroundColor: '#F4F4F4',
          width: 60,
          height: 60,
          borderRadius: 26,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
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
      buttonNextBack: {
        width: 60,
        height: 60,
        backgroundColor: 'transparent',
        borderWidth: 0.5,
        borderColor: 'rgba(64, 64, 64, 0.5)',
        alignItems: 'center',
      },
      loaderOverlay: {
    ...StyleSheet.absoluteFillObject, // растягивает на весь экран
    backgroundColor: colors.BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
