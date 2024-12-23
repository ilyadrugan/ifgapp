import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, View, Image, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, FlatList, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import { Button, ButtonTo } from '../../core/components/button/button';
import { useNavigation } from '@react-navigation/native';
import colors from '../../core/colors/colors';
import { CardContainer } from '../../core/components/card/cardContainer';
import { IfgText } from '../../core/components/text/ifg-text';
import gs from '../../core/styles/global';
import { ContestType } from './models/models';
import ArrowBack from '../../../assets/icons/arrow-back.svg';
import Winner from '../../../assets/icons/winner.svg';
import { dataContests } from './contests';
import { FeedBack } from './components/feedback';
import ArrowRight from '../../../assets/icons/arrow-right.svg';
import presentsStore from '../../../store/state/presentsStore/presentsStore';
import { PresentModel, WinnerModel } from '../../../store/state/presentsStore/models/models';
import { stripHtmlTags } from '../../core/utils/stripHtmlTags';
import { observer } from 'mobx-react';
import { VideoPlayer } from '../../core/components/videoplayer/videoplayer';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Clocks2 from '../../../assets/icons/clocks2.svg';
import CheckedFilled from '../../../assets/icons/checkedfilled.svg';
import ArrowRightBlack from '../../../assets/icons/arrow-right-black.svg';
import PDF from '../../../assets/icons/pdf.svg';
import Quotes from '../../../assets/icons/quotes66.svg';
import { faqData } from './consts';
import articlesStore from '../../../store/state/articlesStore/articlesStore';

const width = Dimensions.get('screen').width;

const carouselItems = [
    {
        number: '01',
        title: 'Временная утрата трудоспособности',
        subTitle: '',
        description: 'Выплата производится за каждый день нахождения на больничном',
        description2: '',
        icon: <Clocks2 />,
    },
    {
        number: '02',
        title: 'Временная утрата трудоспособности',
        subTitle: '',
        description: 'Выплата производится за каждый день нахождения на больничном',
        description2: '',
        icon: <Clocks2 />,
    },
    {
        number: '03',
        title: 'Временная утрата трудоспособности',
        subTitle: '',
        description: 'Выплата производится за каждый день нахождения на больничном',
        description2: '',
        icon: <Clocks2 />,
    },
  ];

const accidentSteps = [
    {
        index: 0,
        number: '01',
        text: 'Если наступил страховой случай, позвоните по номеру: 8-800-333-84-48 и получите консультацию о том, какие документы необходимо собрать по Вашему случаю, также информацию вы можете найти на сайте: aslife.ru',
    },
    {
        index: 1,
        number: '02',
        text: 'Если наступил страховой случай, позвоните по номеру: 8-800-333-84-48 и получите консультацию о том, какие документы необходимо собрать по Вашему случаю, также информацию вы можете найти на сайте: aslife.ru',
    },
    {
        index: 2,
        number: '03',
        text: 'Если наступил страховой случай, позвоните по номеру: 8-800-333-84-48 и получите консультацию о том, какие документы необходимо собрать по Вашему случаю, также информацию вы можете найти на сайте: aslife.ru',
    },
];

const documents = [
    {
        index: 0,
        text: 'Базовый стандарт совершения страховыми организациями операций на финансовом рынке',
    },
    {
        index: 1,
        text: 'Базовый стандарт совершения страховыми организациями операций на финансовом рынке',
    },
    {
        index: 2,
        text: 'Базовый стандарт совершения страховыми организациями операций на финансовом рынке',
    },
];

const paymentHistory = [
    {
        index: 0,
        name: 'Анна Архицкая',
        title: 'Сокращение с работы',
        text: '11 февраля 2021 года Татьяна К. 1981 г. р. обратилась в банк за кредитом на покупку гаража в размере 350 тыс. руб. на 4 года. В апреле этого же года работодатель Татьяны начал процедуру сокращения штата сотрудников, так как организация не справилась с последствиями пандемии. В итоге Татьяна потеряла работу...',
    },
    {
        index: 1,
        name: 'Анна Архицкая',
        title: 'Сокращение с работы',
        text: '11 февраля 2021 года Татьяна К. 1981 г. р. обратилась в банк за кредитом на покупку гаража в размере 350 тыс. руб. на 4 года. В апреле этого же года работодатель Татьяны начал процедуру сокращения штата сотрудников, так как организация не справилась с последствиями пандемии. В итоге Татьяна потеряла работу...',
    },
    {
        index: 2,
        name: 'Анна Архицкая',
        title: 'Сокращение с работы',
        text: '11 февраля 2021 года Татьяна К. 1981 г. р. обратилась в банк за кредитом на покупку гаража в размере 350 тыс. руб. на 4 года. В апреле этого же года работодатель Татьяны начал процедуру сокращения штата сотрудников, так как организация не справилась с последствиями пандемии. В итоге Татьяна потеряла работу...',
    },
];
export const Coverage = observer(() => {
    const navigation = useNavigation<any>();
    const url = 'https://getfile.dokpub.com/yandex/get/https://disk.yandex.ru/i/82jQ8PQ_rRCJeg';
    const [activeSlide, setActiveSlide] = useState(0);
    const [expandedId, setExpandedId] = useState(null); // Состояние для хранения раскрытого вопроса
    const [showMore, setShowMore] = useState(false); // Состояние для хранения раскрытого вопроса

    const onBack = () => {
      navigation.goBack();
    };
    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id); // Если вопрос уже раскрыт, закрываем его
      };
    useEffect(() => {
    }, []);
    const Card = ({ item }) => {
        return (
          <View style={s.card}>
            <View style={gs.mt32} />

            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption,  {textAlign: 'center', alignSelf:'center'}]}>
                {item.number}
            </IfgText>

            {/* <View style={gs.mt12} /> */}
            {item.title && <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.bold, gs.mt12,  {textAlign: 'center' , alignSelf:'center', maxWidth: 200  }]}>
                {item.title}
            </IfgText>}
            <View style={s.icon}>
            {item.icon}
            </View>
            {item.subTitle && <IfgText color={colors.SECONDARY_COLOR} style={[gs.fontCaption, gs.mt12,  {textAlign: 'center' , alignSelf:'center', maxWidth: '70%' }]}>
                {item.subTitle}
            </IfgText>}
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.mt12, {textAlign: 'center', alignSelf:'center'}]}>{item.description}</IfgText>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.mt12, {textAlign: 'center', alignSelf:'center'}]}>{item.description2}</IfgText>
          </View>
        );
      };
      const MaterialCard = ({title, media, subtitle, id}, index)=>
        <CardContainer onPress={()=>navigation.navigate('ArticleView', {articleId: id})} key={index.toString() + 'key'} style={[{width: 200, height: 256, padding:0 , overflow: 'hidden', borderWidth: 1, borderColor: '#E7E7E7'  }, gs.mr12, index === 0 && gs.ml16]} >
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
    const renderBenefits = ({item, index}) => {
        return <CardContainer style={[index === 0 && gs.ml16,gs.mr12,{width: 220, height: 'auto'}]} >
            <CheckedFilled />
            <IfgText style={[gs.fontCaption, gs.bold]}>
            Выплата клиенту или наследнику
            </IfgText>
            <IfgText style={[gs.fontCaption2]}>
            Выгодоприобретателем всегда будет являться клиент, либо его наследники. Клиент сам решает как потратить выплату от страховой компании.
            </IfgText>
        </CardContainer>;
    };
    const renderQuestion = (item) => {
        if (!showMore && item.id > 4) {return;}
        const isExpanded = expandedId === item.id;

        return (
          <View style={s.itemContainer}>
            <View style={s.questionContainer}>
            <IfgText style={[gs.fontCaption, gs.bold, {maxWidth: '90%'}]}>{item.question}</IfgText>
            <TouchableOpacity style={s.toggleButton} onPress={() => toggleExpand(item.id)}>
              <IfgText color={colors.GREEN_COLOR} style={[gs.fontBody1, {top:1}]}>{isExpanded ? '−' : '+'}</IfgText>
            </TouchableOpacity>
            </View>
            {isExpanded && <IfgText style={[gs.fontCaption2, gs.mt12]}>{item.answer}</IfgText>}
          </View>
        );
      };
    const renderDocument = ({item, index}) => {
        return <CardContainer style={[index === 0 && gs.ml16,gs.mr12,{width: 220, height: 'auto', alignItems: 'center', justifyContent: 'center'}]} >
            <View style={{marginTop: 20}}><PDF/></View>

            <IfgText style={[gs.fontCaption2, {textAlign: 'center', marginTop: 18}]}>{item.text}</IfgText>
        </CardContainer>;
    };
    const renderPaymentHistory = ({item, index}) => {
        return <CardContainer style={[index === 0 && gs.ml16,gs.mr12,{width: 280, height: 'auto'}]} >
        <View style={{columnGap: 4}}>
            <IfgText style={[gs.fontCaption3, gs.bold]}>{item.name}</IfgText>
            <IfgText style={[gs.fontCaption, gs.bold]}>{item.title}</IfgText>
        </View>
        <IfgText style={[gs.fontCaption2]}>{item.text}</IfgText>
        </CardContainer>;
    };
    return <>

     <ScrollView
      style={s.container}>
        <Button style={s.buttonBack} onPress={onBack}>
            <>
                <ArrowBack />
                <IfgText color={colors.GRAY_COLOR3} style={gs.fontBody2}>Назад</IfgText>
            </>
        </Button>
        <View style={gs.mt16} />

        <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.h2, gs.bold]}>
         Страхование
        </IfgText>
        <View style={gs.mt16} />
        <ImageBackground
        resizeMode="stretch"
         source={require('../../../assets/backgrounds/gradient3.png')}
        style={[s.cardGradientContainer]}
         >
            <IfgText color={colors.WHITE_COLOR} style={[gs.h3, gs.bold]}>Финансовая защита заемщиков кредитов</IfgText>
            <IfgText color={colors.WHITE_COLOR} style={gs.fontCaptionSmall}>Узнайте как защитить себя и своих близких на случай непредвиденных ситуаций с жизнью и здоровьем в совместном проекте АльфаСтрахование-Жизнь и ifeelgood!</IfgText>
            <Button style={s.howItWorksButton}>
                <>
                    <IfgText color={colors.WHITE_COLOR} style={gs.fontCaption}>Подробнее</IfgText>
                    <ArrowRight />
                </>
            </Button>
        <VideoPlayer disabled thumbnailName="coverage1" source={url} title={'О страховании'}/>

         </ImageBackground>
         <View style={gs.mt24} />

        <IfgText style={[gs.h3, gs.bold]}>
        Как работает страхование?
        </IfgText>
        <View style={gs.mt12} />
        <IfgText color={colors.SECONDARY_COLOR} style={[gs.fontCaption2]}>
        Защита от последствий наступивших рисков:
        </IfgText>
        <View style={gs.mt16} />
    <CardContainer style={{backgroundColor: '#DAEBFF',padding: 0,paddingBottom: 16, overflow: 'hidden',  alignItems:'center'}} >
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
      <View style={gs.mt24} />
      <CardContainer>
        <IfgText style={[gs.fontCaption, gs.bold]}>
        Коронавирус?
        </IfgText>
        <IfgText style={[gs.fontCaption2]}>
        При условии, что риски по программе действуют по причине болезней, события по причине коронавирусной инфекции также признаются страховыми случаями!
        </IfgText>
        <Image resizeMode="contain" style={{width: 300, height: 300, alignSelf: 'center'}} source={require('../../../assets/covid.png')} />
      </CardContainer>
      <View style={gs.mt24} />
      <IfgText style={[gs.h3, gs.bold]}>
        Что получает клиент, оформив страхование?
      </IfgText>
      <View style={gs.mt16} />
      <FlatList
      style={{marginHorizontal: -16}}
      contentContainerStyle={{flexGrow: 1, flexDirection: 'row'}}
      showsHorizontalScrollIndicator={false}
      data={[0,1]}
      horizontal
      renderItem={renderBenefits}
      />
      <View style={gs.mt24} />
      <CardContainer>
        <VideoPlayer disabled source={url} thumbnailName="coverage2" title="" />
        <IfgText style={[gs.h3, gs.bold]}>
        Что думают люди о финансовой защите?
        </IfgText>
        <IfgText style={[gs.h5, gs.regular]}>
        Оформляя страхование, вы заботитесь не только о себе, но и о своих близких!
        </IfgText>
        <Button outlined style={{borderWidth: 1,borderRadius: 12,paddingHorizontal: 20, borderColor: colors.GREEN_COLOR}}>
            <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
            <IfgText style={[gs.fontCaption, gs.medium]}>Подробнее</IfgText>
            <ArrowRightBlack />
            </View>
        </Button>
      </CardContainer>
      <View style={gs.mt24} />
      <IfgText style={[gs.h3, gs.bold]}>
      Что делать, если наступил страховой случай?
      </IfgText>
      <View style={gs.mt16} />
      <ScrollView
                horizontal
                style={{marginHorizontal: -16}}
                contentContainerStyle={{flexGrow: 1, flexDirection: 'column', justifyContent: 'center' }}
                showsHorizontalScrollIndicator={false}
                >
                    <View style={s.line}>
                        <View style={s.dottedLine} />
                        {accidentSteps.map(({index, number})=> <View key={index.toString()} style={[s.circle, { left: 220 * index   + 16  + 24 * index }]} >
                            <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption2]}>{number}</IfgText>
                            </View>)
                        }
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 16}} >
                        {accidentSteps.map(({text, index})=><CardContainer style={[index === 0 && gs.ml16,gs.mr24,{width: 220, height: 'auto'}]} >
                            <IfgText style={[gs.fontCaption2]}>{text}</IfgText>
                        </CardContainer>)}
                    </View>
                </ScrollView>
        <View style={gs.mt24} />
        <IfgText style={[gs.h3, gs.bold]}>
        Часто задаваемые вопросы:
        </IfgText>
        <View style={gs.mt16} />
        <CardContainer>
            {faqData.map((question)=>{
                return renderQuestion(question);
            })}
        <IfgText onPress={()=>setShowMore((val)=>!val)} color={colors.GREEN_LIGHT_COLOR} style={[gs.fontCaption2, gs.underline]}>{showMore ? 'Скрыть' : 'Показать больше'}</IfgText>
        </CardContainer>
        <View style={gs.mt24} />
        <View style={[gs.flexRow, {justifyContent: 'space-between', alignItems: 'center'}]}>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontBodyMedium, gs.bold]}>Последние новости</IfgText>
            <ButtonTo onPress={()=>navigation.navigate('Материалы')} title="Все материалы" />
          </View>
          <View style={gs.mt16} />
          <FlatList
                horizontal
                style={{marginHorizontal: -16}}
                contentContainerStyle={{flexGrow: 1, flexDirection: 'row'}}
                showsHorizontalScrollIndicator={false}
                data={articlesStore.articlesList.articles}
                renderItem={({item, index})=>MaterialCard(item, index)}
        />
        <View style={gs.mt24} />
        <IfgText style={[gs.h3, gs.bold]}>
        Стандарты ВСС
        </IfgText>
        <View style={gs.mt12} />
        <IfgText color={colors.SECONDARY_COLOR} style={[gs.fontCaption2]}>
        Официальная информация Всероссийского союза страховщиков и вспомогательные материалы.
        </IfgText>
        <View style={gs.mt12} />
        <CardContainer>
        <IfgText style={[gs.fontBodyMedium, gs.bold]}>
        Базовые стандарты ВСС
        </IfgText>
        <IfgText style={[gs.fontCaption2]}>
        — это обязательные требования к страховым агентам и компаниям, которые продают страховые продукты. Все агенты и страховые специалисты обязаны знать и соблюдать стандарт. За несоблюдение стандартов — штрафы до 40 тысяч рублей и, как крайняя мера, запрет на ведение деятельности.
        </IfgText>
        </CardContainer>
        <View style={gs.mt24} />
        <IfgText style={[gs.fontBodyMedium, gs.bold]}>
        Регламентирующая документация
        </IfgText>
        <View style={gs.mt16} />
        <FlatList
            style={{marginHorizontal: -16}}
            contentContainerStyle={{flexGrow: 1, flexDirection: 'row'}}
            showsHorizontalScrollIndicator={false}
            data={documents}
            horizontal
            renderItem={renderDocument}
        />
        <View style={gs.mt24} />
        <CardContainer style={{overflow: 'hidden'}}>
            <Quotes />
            <IfgText style={[gs.fontCaption2]}>
            Ничто не стоит так дешево и не ценится так дорого, как страховой полис во время наступления страхового события.
            </IfgText>
            <IfgText style={[gs.fontCaption, gs.bold]}>
            Илья Ильф и Евгений Петров
            </IfgText>
            <Image style={{width: '100%', height: 280, bottom: -16, marginTop: -16}} source={require('../../../assets/backgrounds/coverageMan.png')}/>
        </CardContainer>
        <View style={gs.mt24} />

        <CardContainer>
            <VideoPlayer disabled source={url} thumbnailName="coverage2" title="" />
            <IfgText style={[gs.h3, gs.bold]}>
            Что думают люди о финансовой защите?
            </IfgText>
            <IfgText style={[gs.h5, gs.regular]}>
            Оформляя страхование, вы заботитесь не только о себе, но и о своих близких!
            </IfgText>
            <Button outlined style={{borderWidth: 1,borderRadius: 12,paddingHorizontal: 20, borderColor: colors.GREEN_COLOR}}>
                <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                <IfgText style={[gs.fontCaption, gs.medium]}>Подробнее</IfgText>
                <ArrowRightBlack />
                </View>
            </Button>
        </CardContainer>
        <View style={gs.mt24} />
        <IfgText style={[gs.fontBodyMedium, gs.bold]}>
        Истории выплат клиентам
        </IfgText>
        <View style={gs.mt16} />
        <FlatList
            style={{marginHorizontal: -16}}
            contentContainerStyle={{flexGrow: 1, flexDirection: 'row'}}
            showsHorizontalScrollIndicator={false}
            data={paymentHistory}
            horizontal
            renderItem={renderPaymentHistory}
        />
        <View style={{height: 100}} />
    </ScrollView></>;});

const s = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
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
    howItWorksButton: {
        borderRadius: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderColor: colors.WHITE_COLOR,
        borderWidth: 1,
        flexDirection: 'row',
        paddingHorizontal: 20,
        },
        icon: {
            // alignItems:'center',
            alignSelf: 'center',
          },
    card: {
            alignSelf: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            paddingHorizontal: 16,
            // backgroundColor: '#DAEBFF',
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
          line: {
            position: 'relative',
            width: '100%',
            height: 40, // Высота полосы с точками
            justifyContent: 'center',
            alignItems: 'center',

          },
          dottedLine: {
            position: 'absolute',
            top: '50%',
            width: '100%',
            borderBottomWidth: 1,
            borderColor: '#D0D0D0',
            borderStyle: 'dashed', // пунктирная линия
            zIndex: 0,
            left: 40,
          },
          circle: {
            position: 'absolute',
            width: 40,
            height: 40,
            borderRadius: 20, // радиус для круглой формы
            backgroundColor: colors.GREEN_COLOR,
            zIndex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          },

          itemContainer: {
            borderBottomWidth: 1,
            borderBottomColor: '#B4B4B4',
            borderStyle: 'dashed',
            width: width - 64,
            paddingBottom: 12,
          },
          questionContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
          toggleButton: {
            width: 36,
            height: 36,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            borderColor: colors.GREEN_LIGHT_COLOR,
            borderWidth: 1,
          },
});
