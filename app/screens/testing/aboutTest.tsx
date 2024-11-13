import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, View, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import { IfgText } from '../../core/components/text/ifg-text';
import gs from '../../core/styles/global';
import colors from '../../core/colors/colors';
import { Button } from '../../core/components/button/button';
import ArrowBack from '../../../assets/icons/arrow-back.svg';
import Quotes from '../../../assets/icons/quotes.svg';
import Quotes55 from '../../../assets/icons/quotes55x55.svg';
import Clocks from '../../../assets/icons/clocks.svg';
import ArrowRight from '../../../assets/icons/arrow-right.svg';

import { CardContainer } from '../../core/components/card/cardContainer';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import { VideoPlayer } from '../../core/components/videoplayer/videoplayer';

const width = Dimensions.get('screen').width;
const dataSteps = [
    {
        index: 0,
        title: 'Тестирование',
        text: 'Мы разработали тестирование, которое поможет определить, какие аспекты вашего здоровья требуют внимания. Самое главное на данном этапе — честно отвечать на все вопросы.',
    },
    {
        index: 1,
        title: 'Определение уровня',
        text: 'После прохождения теста вы получаете ifg-баллы. Количество баллов помогает сформировать индивидуальный ifg-план.',
    },
    {
        index: 2,
        title: 'Тестирование',
        text: 'Мы разработали тестирование, которое поможет определить, какие аспекты вашего здоровья требуют внимания. Самое главное на данном этапе — честно отвечать на все вопросы.',
    },
    {
        index: 3,
        title: 'Определение уровня',
        text: 'После прохождения теста вы получаете ifg-баллы. Количество баллов помогает сформировать индивидуальный ifg-план.',
    },
];

const carouselItems = [
    {
        number: '01',
        title: 'Регулярность',
        subTitle: 'Сформируйте привычку через управление нагрузкой',
        description: 'Главная задача — выполнение плана должно войти в вашу привычку. Что такое привычка? Это действия, которые вы выполняете регулярно без напряжения. Добиться этого можно с помощью контроля за уровнем нагрузки — важно, чтобы он был оптимальным и не вызывал перегрузку и сопротивление к изменениям. ',
        description2: 'Придерживайтесь принципа: «Лучше делать хоть что-то, но каждый день!». Выберете для регулярных действий небольшой шаг (облегчите рекомендацию), которому точно сможете следовать. Если вы всё-таки срываетесь, главное не бросать занятия полностью, а после перерыва начинать снова и снова, возвращаясь в зону своих возможностей за счёт снижения нагрузки.',
        icon: <Clocks />,
    },
    {
        number: '02',
        title: 'Регулярность',
        subTitle: 'Сформируйте привычку через управление нагрузкой',
        description: 'Главная задача — выполнение плана должно войти в вашу привычку. Что такое привычка? Это действия, которые вы выполняете регулярно без напряжения. Добиться этого можно с помощью контроля за уровнем нагрузки — важно, чтобы он был оптимальным и не вызывал перегрузку и сопротивление к изменениям. ',
        description2: 'Придерживайтесь принципа: «Лучше делать хоть что-то, но каждый день!». Выберете для регулярных действий небольшой шаг (облегчите рекомендацию), которому точно сможете следовать. Если вы всё-таки срываетесь, главное не бросать занятия полностью, а после перерыва начинать снова и снова, возвращаясь в зону своих возможностей за счёт снижения нагрузки.',
        icon: <Clocks />,
    },
    {
        number: '03',
        title: 'Регулярность',
        subTitle: 'Сформируйте привычку через управление нагрузкой',
        description: 'Главная задача — выполнение плана должно войти в вашу привычку. Что такое привычка? Это действия, которые вы выполняете регулярно без напряжения. Добиться этого можно с помощью контроля за уровнем нагрузки — важно, чтобы он был оптимальным и не вызывал перегрузку и сопротивление к изменениям. ',
        description2: 'Придерживайтесь принципа: «Лучше делать хоть что-то, но каждый день!». Выберете для регулярных действий небольшой шаг (облегчите рекомендацию), которому точно сможете следовать. Если вы всё-таки срываетесь, главное не бросать занятия полностью, а после перерыва начинать снова и снова, возвращаясь в зону своих возможностей за счёт снижения нагрузки.',
        icon: <Clocks />,
    },
  ];
export const AboutTest = () => {
    const url = 'https://getfile.dokpub.com/yandex/get/https://disk.yandex.ru/i/82jQ8PQ_rRCJeg';
    const navigation = useNavigation<any>();
    const onBack = () => navigation.goBack();
    const [activeSlide, setActiveSlide] = useState(0);

      const Card = ({ item }) => {
        return (
          <View style={s.card}>
            <View style={gs.mt32} />

            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption,  {textAlign: 'center', alignSelf:'center'}]}>
                {item.number}
            </IfgText>

            <View style={gs.mt12} />
            <View style={s.icon}>
            {item.icon}
            </View>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.bold, gs.mt12,  {textAlign: 'center' , alignSelf:'center' }]}>
                {item.title}
            </IfgText>
            <IfgText color={colors.SECONDARY_COLOR} style={[gs.fontCaption, gs.mt12,  {textAlign: 'center' , alignSelf:'center', maxWidth: '70%' }]}>
                {item.subTitle}
            </IfgText>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.mt12, {textAlign: 'center', alignSelf:'center'}]}>{item.description}</IfgText>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.mt12, {textAlign: 'center', alignSelf:'center'}]}>{item.description2}</IfgText>
          </View>
        );
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

        <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.h2, gs.bold, {maxWidth: '75%'}]}>
        Хорошее самочувствие
        ждёт вас!
        </IfgText>
        <View style={gs.mt16} />
        <ImageBackground
        resizeMode="stretch"
         source={require('../../../assets/backgrounds/gradientCard.png')}
        style={[s.cardGradientContainer]}
         >
            <IfgText style={[gs.fontCaption2, {maxWidth: '62%'}]}>
            Пройдите тестирование и получите персональные рекомендации по питанию, сну, физическим активностям и снижению стресса!
            </IfgText>
            <Image
            resizeMode="contain"
            style={s.imageStyle}
            source={require('../../../assets/backgrounds/smallPhone0.5.png')}/>
         </ImageBackground>
         <View style={gs.mt16} />
        <VideoPlayer source={url} title={'О платформе ifeelgood'}/>
    <View style={gs.mt16} />
    <CardContainer>
        <IfgText color={colors.PLACEHOLDER_COLOR} style={gs.fontCaption2}>
        Мы разработали систему ifeelgood, чтобы вы могли всесторонне улучшать свое самочувствие. Вашему организму одинаково важны питание, сон, физическая активность и снижение стресса. Только комплексный подход дает максимальный результат. Основная цель нашей системы — помочь на практике сформировать привычку заниматься своим здоровьем. Наши главные принципы: постепенность и регулярность. Мы уверены, что с ifeelgood вы всегда будете чувствовать себя хорошо.
        </IfgText>
        <View style={[gs.flexRow, gs.alignCenter]}>
            <Quotes />
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaptionMedium, gs.ml12]}>
            Создатели ifeelgood
            </IfgText>
        </View>
    </CardContainer>
    <View style={gs.mt24} />
    <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.h3, gs.bold ]}>
    Как получить персональный план и улучшить самочувствие?
    </IfgText>
    <View style={gs.mt12} />
    <IfgText color={colors.SECONDARY_COLOR} style={gs.fontCaption2}>
    Система ifeelgood включает 4 этапа
    </IfgText>
    <ScrollView
                style={{marginHorizontal: -16, paddingHorizontal: 16  }}
                horizontal
                contentContainerStyle={{flexGrow: 1, flexDirection: 'column'}}
                showsHorizontalScrollIndicator={false}
                >
        <View style={s.line}>
            <View style={s.dottedLine} />
                {dataSteps.map(({index})=> <View key={index.toString()} style={[s.circle, { left: 250 * index + 24 * index }]} />)}
        </View>
        <View style={{flexDirection: 'row'}} >
              {dataSteps.map(({title, text, index})=>
              <CardContainer key={index.toString()} style={[{width: 250 }, gs.mr24]} >
                <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.bold ]}>{title}</IfgText>
                <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption  ]}>{text}</IfgText>
            </CardContainer>)}
        </View>
    </ScrollView>
    <View style={gs.mt24} />
    <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.h3, gs.bold ]}>
    Как выполнять ifeelgood-план?
    </IfgText>
    <View style={gs.mt12} />
    <IfgText color={colors.SECONDARY_COLOR} style={gs.fontCaption2}>
    Придерживайтесь принципов ниже и всё получится!
    </IfgText>
    <View style={gs.mt16} />
    <CardContainer style={{padding: 0,paddingBottom: 16, overflow: 'hidden',  alignItems:'center'}} >
            <Pagination
              dotsLength={carouselItems.length}
              activeDotIndex={activeSlide}
              containerStyle={s.paginationContainer}
              dotStyle={s.dotStyle}
              inactiveDotStyle={s.inactiveDotStyle}
            />
            <Carousel
                data={carouselItems}
                renderItem={({ item }) => <Card item={item} />}
                sliderWidth={width - 32}
                itemWidth={width - 32}
                loop={false}
                // useScrollView={false}
                autoplayDelay={0.2}
                // autoplayInterval={0.5}
                autoplay={true} // Зацикливание слайдера
                layout={'default'} // Расположение карточек
                onSnapToItem={(index) => setActiveSlide(index) }
                // enableMomentum={false}
                // lockScrollWhileSnapping={true}
                />
      </CardContainer>
    <View style={gs.mt16} />
    <CardContainer >
        <Quotes55 />
        <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption2, gs.mt4]}>
        Здоровье — это главное в жизни. Система ifeelgood, даже на начальных этапах, даёт значительное улучшение самочувствия. Даже если вы остановитесь на первом шаге и будете придерживаться его всю жизнь, то начнёте чувствовать себя лучше, чем прежде. Но мы уверены, что у вас появятся силы и энергия для дальнейшего укрепления своего здоровья. Поэтому стоит попробовать!
        </IfgText>
    </CardContainer>
    <View style={{height: 180}}/>

    <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 0.75)' ]}
            style={s.shadowGradient}
        />
    </ScrollView>
    <View style={s.footer}>
    <Button style={s.buttonNext}
           onPress={()=>navigation.navigate('Testing')}
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
                <IfgText style={gs.fontBodyMedium}>{'Пройти тестирование'}</IfgText>
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
      cardGradientContainer:{
        flex: 1,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
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
        borderWidth: 1,
        borderRadius: 8,
        width: 84,
        height: 26,
      },

      line: {
        position: 'relative',
        width: '100%',
        height: 30, // Высота полосы с точками
        justifyContent: 'center',
        alignItems: 'center',
      },
      dottedLine: {
        position: 'absolute',
        // top: '50%',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: colors.BORDER_COLOR2,
        borderStyle: 'dashed', // пунктирная линия
        zIndex: 0,
      },
      circle: {
        position: 'absolute',
        width: 19,
        height: 19,
        borderRadius: 10, // радиус для круглой формы
        backgroundColor: colors.GREEN_COLOR,
        zIndex: 1,
      },
      icon: {
        // alignItems:'center',
        alignSelf: 'center',
      },
      description: {
        fontSize: 14,
        color: '#FFFFFF',
        textAlign: 'center',
      },
      card: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        paddingHorizontal: 16,
        // backgroundColor: colors.WHITE_COLOR,
      },
      paginationContainer: {
        // paddingVertical: 10,
        position: 'absolute',
        top: -32,

      },
      dotStyle: {
        width:(width - 32) / carouselItems.length,
        height: 6,
        backgroundColor: colors.GREEN_LIGHT_COLOR,
      },
      inactiveDotStyle: {
        width:(width - 32) / carouselItems.length,
        height: 6,
        backgroundColor: 'transparent',
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
  });
