import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, View, Image, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, FlatList, ActivityIndicator, Dimensions, TouchableOpacity, Animated, Linking } from 'react-native';
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
import ArrowRightGreen from '../../../assets/icons/arrow-right-green.svg';
import presentsStore from '../../../store/state/presentsStore/presentsStore';
import { PresentModel, WinnerModel } from '../../../store/state/presentsStore/models/models';
import { stripHtmlTags } from '../../core/utils/stripHtmlTags';
import { observer } from 'mobx-react';
import { VideoPlayer } from '../../core/components/videoplayer/videoplayer';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Clocks2 from '../../../assets/icons/clocks2.svg';
import Ins2 from '../../../assets/icons/ins2.svg';
import Ins3 from '../../../assets/icons/ins3.svg';
import Ins4 from '../../../assets/icons/ins4.svg';
import Ins5 from '../../../assets/icons/ins5.svg';
import Ins6 from '../../../assets/icons/ins6.svg';
import CheckedFilled from '../../../assets/icons/checkedfilled.svg';
import ArrowRightBlack from '../../../assets/icons/arrow-right-black.svg';
import PDF from '../../../assets/icons/pdf.svg';
import Quotes from '../../../assets/icons/quotes66.svg';
import articlesStore from '../../../store/state/articlesStore/articlesStore';
import { youtube_parser, YoutubeVideo } from '../../core/components/youtubePlayer/youtubePlayer';
import RutubeView from '../../core/components/rutubeView/rutubeVideo';
import { Accordion } from '../../core/components/accordion/accordion';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const width = Dimensions.get('screen').width;
const faqData = [
  {
      id: 0,
      question: 'Как оформить?',
      answer: <IfgText style={[gs.fontCaption2]}>Оформить программу можно в комплексе с кредитом в банках-партнерах ООО "АльфаСтрахование-Жизнь". При оформлении кредита, уточните информацию о наличии страхования и условиях действия полиса. Если останутся вопросы по условиям страхового полиса, Вы всегда можете их уточнить на горячей линии: <IfgText onPress={()=>Linking.openURL('tel:88007003320')} color={colors.GREEN_COLOR} style={[gs.underline,gs.bold,{lineHeight: 18}]}>8-800-700-33-20</IfgText></IfgText>,
  },
  {
      id: 1,
      question: 'Как родственнику погибшего клиента обратиться за выплатой?',
      answer: <IfgText style={[gs.fontCaption2]}>Обратиться за выплатой могут родственники, вступившие в наследство погибшего клиента. Для обращения за выплатой необходимо предоставить пакет документов по страховому случаю. Узнать информацию пакету документов Вы можете на нашей горячей линии: <IfgText onPress={()=>Linking.openURL('tel:88007003320')} color={colors.GREEN_COLOR} style={[gs.underline,gs.bold,{lineHeight: 18}]}>8-800-700-33-20</IfgText>. При невозможности найти полис страхования, родственники могут также обратиться на нашу горячую линию и мы поможем сделать запрос дубликата полиса на сайте страховщика.</IfgText>,
  },
  {
      id: 2,
      question: 'В какие сроки производятся выплаты?',
      answer: 'С момента получения полного пакета документов от клиента, у страховой компании есть 10 рабочих дней для принятия решения. В случае принятия положительного решения выплата производится в течение 5 рабочих дней по реквизитам, указанным в заявлении на выплату.',
  },
  {
      id: 3,
      question: 'Я оформил полис, как узнать от чего я застрахован?',
      answer: 'Страховые риски указаны в полисе страхования на первой странице в разделе "Страховые риски". Подробные условия страхования также указаны в полисе.',
  },
  {
      id: 4,
      question: 'Что делать, если я потерял страховой полис?',
      answer: <IfgText style={[gs.fontCaption2]}>Для получения дубликата страхового полиса Вы можете обратиться по номеру горячей линии: <IfgText onPress={()=>Linking.openURL('tel:88007003320')} color={colors.GREEN_COLOR} style={[gs.underline, gs.bold,{lineHeight: 18}]}>8-800-700-33-20</IfgText>, сделать запрос дубликата полиса на <IfgText onPress={()=>Linking.openURL('https://aslife.ru/client/ask/')} color={colors.GREEN_COLOR} style={[gs.underline,{lineHeight: 18}]}>сайте страховщика</IfgText>, либо обратиться в отделение банка-партнера, в котором оформлен договор страхования.</IfgText>,
  },
  {
      id: 5,
      question: 'Могу ли я отказаться от страховки АльфаСтрахование-Жизнь в первые 30 дней?',
      answer: <IfgText style={[gs.fontCaption2]}>Для расторжения Договора страхования, возврат страховой премии (страхового взноса) осуществляется при условии, что заявление на отказ от страховки было подано в течение 14 календарных дней с даты заключения договора страхования. В случае расторжения Договоров страхования жизни, заключенного при предоставлении потребительского кредита, с 21 января 2024 года, возврат страховой премии (страхового взноса) осуществляется при условии, что заявление на отказ от страховки по кредиту было подано в течение 30 календарных дней с даты заключения договора страхования. Возврат страхования жизни по кредиту осуществляется согласно законодательству РФ. С подробной информацией по возврату страховки в период охлаждения Вы можете ознакомиться в специальном <IfgText onPress={()=>Linking.openURL('https://aslife.ru/10291/')} color={colors.GREEN_COLOR} style={[gs.underline,{lineHeight: 18}]}>разделе</IfgText>.</IfgText>,
  },
  {
      id: 6,
      question: 'Возможен ли возврат страховки АльфаСтрахование-Жизнь при досрочном погашении кредита?',
      answer: 'C 1 сентября 2020 г. согласно 353-ФЗ «О потребительском кредите (займе)», в случае полного досрочного погашения потребительского кредита заемщиком, являющимся также Страхователем по Договору страхования, заключенному в целях обеспечения исполнения обязательств по договору потребительского кредита (займа), подлежит возврату Страхователю часть страховой премии за неистекший период страхования. Согласно Указанию Центрального Банка Российской Федерации (Банк России, ЦБР) от 17 мая 2022 г. №6139-У, для полисов страхования оформленных с 1 апреля 2023 в договоре добровольного страхования заемщика при предоставлении потребительского кредита (займа), содержащем только дополнительные страховые риски, должно быть предусмотрено условие о возврате страховой премии (за вычетом части страховой премии, исчисляемой пропорционально времени, в течение которого действовало страхование) при отказе заемщика от добровольного страхования заемщика при предоставлении потребительского кредита (займа) в случае полного досрочного исполнения заемщиком обязательств по договору потребительского кредита (займа). Требования настоящего Указания не применяются при осуществлении личного страхования, не связанного с заключением договора добровольного страхования заемщика при предоставлении потребительского кредита (займа). Возврат осуществляется при условии отсутствия в период страхования событий, имеющих признаки страхового случая, страховых случаев и страховых выплат по Договору страхования. Документ, подтверждающий полное досрочное исполнение обязательств по договору потребительского кредита (займа) обязателен при подаче заявления!',
  },
  {
    id: 7,
    question: 'Где взять заявление об отказе от договора страхования АльфаСтрахование-Жизнь?',
    answer: <IfgText style={[gs.fontCaption2]}>Заявление на возврат страховки, а также инструкции по возврату Вы можете получить на <IfgText onPress={()=>Linking.openURL('https://aslife.ru/10291/')} color={colors.GREEN_COLOR} style={[gs.underline,{lineHeight: 18}]}>сайте страховой компании</IfgText> или обратившись по номеру <IfgText onPress={()=>Linking.openURL('tel:88007003320')} color={colors.GREEN_COLOR} style={[gs.underline, gs.bold,{lineHeight: 18}]}>8-800-700-33-20</IfgText>.</IfgText>,
  },
  {
    id: 8,
    question: 'Как получить консультацию по другим вопросам?',
    answer: <IfgText style={[gs.fontCaption2]}>Напишите нам на <IfgText onPress={()=>Linking.openURL('mailto:strahvopros@ifeelgood.life')} color={colors.GREEN_COLOR} style={[gs.underline,{lineHeight: 18}]}>strahvopros@ifeelgood.life</IfgText> или позвоните: <IfgText onPress={()=>Linking.openURL('tel:88007003320')} color={colors.GREEN_COLOR} style={[gs.underline, gs.bold,{lineHeight: 18}]}>8-800-700-33-20</IfgText>.</IfgText>,
  },
  {
    id: 9,
    question: 'Какие есть исключения в договоре страхования?',
    answer: <IfgText style={[gs.fontCaption2]}>Полный набор исключений указан в Разделе II "Что не застраховано?" Ключевого информационного документа вашего страхового полиса. Если вы остались вопросы, связанные с интерпретаций условий, напишите нам на <IfgText onPress={()=>Linking.openURL('mailto:strahvopros@ifeelgood.life')} color={colors.GREEN_COLOR} style={[gs.underline,{lineHeight: 18}]}>strahvopros@ifeelgood.life</IfgText> или позвоните: <IfgText onPress={()=>Linking.openURL('tel:88007003320')} color={colors.GREEN_COLOR} style={[gs.underline, gs.bold,{lineHeight: 18}]}>8-800-700-33-20</IfgText>.</IfgText>,
  },
  {
    id: 10,
    question: 'Могу ли я изменить условия договора или отказаться от страховки после получения кредита?',
    answer: 'По соглашению сторон в Договор страхования могут быть внесены изменения. В случае внесения изменений Страховщик вправе требовать уплаты дополнительной страховой премии (страхового взноса) в соответствии с установленными тарифами. При этом, если иное не предусмотрено Договором страхования, заявление от Страхователя о внесении изменений должно быть направлено Страховщику не позднее чем за 30 (Тридцать) календарных дней до даты внесения предполагаемых изменений. Также клиент имеет право отказаться от договора страхования, при этом договор прекращается с даты, указанной в письменном заявлении Страхователя об отказе от Договора страхования, но не ранее даты предоставления Заявления Страховщику, а условия возврата денежных средств зависят от обстоятельств и сроков отказа с момента заключения договора.',
  },
  {
    id: 11,
    question: 'Что делать если ваши права были нарушены?',
    answer: <IfgText style={[gs.fontCaption2]}>К нарушению прав застрахованного относятся ситуации, в которых страховая компания или третьи лица (действующие от ее лица) до момента заключения, в момент заключения или после заключения договора страхования нарушают права клиента, которые предоставлены ему базовыми стандартами, условиями полиса или правилами страхования, а также законодательством РФ. Подробно опишите ситуацию и отправьте нам на <IfgText onPress={()=>Linking.openURL('mailto:strahvopros@ifeelgood.life')} color={colors.GREEN_COLOR} style={[gs.underline,{lineHeight: 18}]}>strahvopros@ifeelgood.life</IfgText>, мы поможем найти решение. Также вы можете обратиться напрямую к страховщику через форму «Задать вопрос» на сайте: <IfgText onPress={()=>Linking.openURL('https://aslife.ru/client/ask/')} color={colors.GREEN_COLOR} style={[gs.underline, {lineHeight: 18}]}>https://aslife.ru/client/ask/</IfgText>, выбрав пункт «Иное» по вашему виду страхования или написать обращение по почте и отправить по адресу: 115162, г. Москва, ул. Шаболовка, д. 31, стр. Б. Также клиент может обратиться во Всероссийский союз страховщиков в письменной форме, отправив обращение почтой по адресу 115093, г. Москва, ул. Люсиновская, д. 27, стр. 3 или в форме электронного документа, отправив обращение на электронный адрес: <IfgText onPress={()=>Linking.openURL('mailto:mail@ins-union.ru')} color={colors.GREEN_COLOR} style={[gs.underline,{lineHeight: 18}]}>mail@ins-union.ru</IfgText>.</IfgText>,
  },
  {
    id: 12,
    question: 'Как сообщить о недобросовестной практике?',
    answer: <IfgText style={[gs.fontCaption2]}>У вас возникла ситуация, в которой ваши права грубо нарушаются и у вас есть основная предполагать, что подобные события могут происходить на постоянной основе? Вы можете обратиться напрямую к страховщику через форму «Задать вопрос» на сайте: <IfgText onPress={()=>Linking.openURL('https://aslife.ru/client/ask/')} color={colors.GREEN_COLOR} style={[gs.underline, {lineHeight: 18}]}>https://aslife.ru/client/ask/</IfgText>, выбрав пункт «Иное» по вашему виду страхования или написать обращение по почте и отправить по адресу: 115162, г. Москва, ул. Шаболовка, д. 31, стр. Б. Будьте внимательны и осторожны особенно если вам кажется, что вы столкнулись с ситуациями: навязывания дополнительных услуг, мошенничеством, необоснованного отказа в заключение договора или нарушении ваших прав. Если вы полностью уверены в нарушении, то вы можете направить мотивированное обращение во Всероссийский союз страховщиков, Службу защиты прав потребителей Центрального Банка РФ или РосПотребНадзор. Для поиска наиболее оптимального решения, опишите ситуацию и отправьте ее нам по адресу <IfgText onPress={()=>Linking.openURL('mailto:strahvopros@ifeelgood.life')} color={colors.GREEN_COLOR} style={[gs.underline,{lineHeight: 18}]}>strahvopros@ifeelgood.life</IfgText>и мы поможем.</IfgText>,
  },
  {
    id: 13,
    question: 'Есть вопрос по базовым стандартам или условиям страхования?',
    answer: <IfgText style={[gs.fontCaption2]}>Основными целями базовых стандартов являются: обеспечение соблюдения прав и законных интересов получателей финансовых услуг, предупреждение недобросовестных практик, повышение качества финансовых услуг, повышение информационной открытости рынка страхования, а также повышение уровня финансовой грамотности. Если у вас возник вопрос по стандартам или их исполнению со стороны страховой компании, напишите нам на <IfgText onPress={()=>Linking.openURL('mailto:strahvopros@ifeelgood.life')} color={colors.GREEN_COLOR} style={[gs.underline,{lineHeight: 18}]}>strahvopros@ifeelgood.life</IfgText> и мы поможем найти ответ. Перед обращением рекомендуем ознакомиться с <IfgText onPress={()=>Linking.openURL('https://ifeelgood.life/Памятка%20по%20популярным%20вопросам.pdf')} color={colors.GREEN_COLOR} style={[gs.underline, {lineHeight: 18}]}>«Памяткой по популярным вопросам»</IfgText>.</IfgText>,
  },
  {
    id: 14,
    question: 'У вас предложение по улучшению качества обслуживания?',
    answer: <IfgText style={[gs.fontCaption2]}>На сайте <IfgText onPress={()=>Linking.openURL('https://ifeelgood.life')} color={colors.GREEN_COLOR} style={[gs.underline,{lineHeight: 18}]}>ifeelgood.life</IfgText> вы сможете найти большую часть информации, которая поможет вам разобраться в вопросах о вашем страховом полисе, а также вы сможете получить полезный контент для улучшения вашего самочувствия. Если у вас возникнут предложения, то отправляйте их на <IfgText onPress={()=>Linking.openURL('mailto:strahvopros@ifeelgood.life')} color={colors.GREEN_COLOR} style={[gs.underline,{lineHeight: 18}]}>strahvopros@ifeelgood.life</IfgText> или посетите раздел <IfgText onPress={()=>Linking.openURL('https://ifeelgood.life/presents')} color={colors.GREEN_COLOR} style={[gs.underline, {lineHeight: 18}]}>«Конкурсы»</IfgText> на нашем сайте и заполните там форму «Оставить предложение» мы передадим информацию в страховую компанию! Также вы можете обратиться напрямую к страховщику через форму «Оставить отзыв» на сайте: <IfgText onPress={()=>Linking.openURL('https://aslife.ru/feedback/')} color={colors.GREEN_COLOR} style={[gs.underline, {lineHeight: 18}]}>https://aslife.ru/feedback/</IfgText>или написать обращение по почте и отправить по адресу: 115162, г. Москва, ул. Шаболовка, д. 31, стр. Б.</IfgText>,
  },
  {
    id: 15,
    question: 'Через какое время после оформления полиса я могу сдать анализы?',
    answer: <IfgText style={[gs.fontCaption2]}>После оформления обычно необходимо подождать несколько дней, чтобы информация о вашем договоре появилась в наших системах. После этого вы регистрируете <IfgText onPress={()=>Linking.openURL('https://dms.aslife.ru/#lk')} color={colors.GREEN_COLOR} style={[gs.underline,{lineHeight: 18}]}>личный кабинет</IfgText>, получаете онлайн консультацию врача, далее получаете направление на анализы!</IfgText>,
  },

];
const carouselItems = [
    {
        number: '01',
        title: 'Утрата трудоспособности',
        subTitle: '',
        description: 'Выплата производится за каждый день нахождения на больничном',
        description2: '',
        icon: <Clocks2 />,
        bgColor: '#DAEBFF',
    },
    {
        number: '02',
        title: 'Получение травм',
        subTitle: '',
        description: 'Выплата производится по каждой травме отдельно',
        description2: '',
        icon: <Ins2 />,
        bgColor: colors.WHITE_COLOR,
    },
    {
        number: '03',
        title: 'Потеря работы',
        subTitle: '',
        description: 'Выплата производится за каждый день нахождения в статусе безработного',
        description2: '',
        icon: <Ins3 />,
        bgColor: '#f6d8e4',
    },
    {
        number: '04',
        title: 'Установление инвалидности',
        subTitle: '',
        description: 'Производится единовременная выплата напрямую клиенту',
        description2: '',
        icon: <Ins4 />,
        bgColor: '#c3decb',
    },
    {
        number: '05',
        title: 'Уход из жизни',
        subTitle: '',
        description: 'Наследникам клиента производится единовременная выплата напрямую',
        description2: '',
        icon: <Ins5 />,
        bgColor: '#f5e6d1',
    },
    {
      number: '06',
      title: 'Болезни и лечение',
      subTitle: '',
      description: 'Организация процесса установаления диагноза и обеспечение лечения',
      description2: '',
      icon: <Ins6 />,
      bgColor: colors.WHITE_COLOR,
    },
  ];

const accidentSteps = [
  {
    index: 0,
    number: '01',
    title: 'Позвоните в страховую компанию',
    text: <IfgText style={[gs.fontCaption2]}>Если наступил страховой случай, позвоните по номеру: <IfgText onPress={()=>Linking.openURL('tel:88003338448')} color={colors.GREEN_COLOR} style={[gs.underline, gs.bold, {lineHeight: 18}]}>8-800-333-84-48</IfgText> и получите консультацию о том, какие документы необходимо собрать по Вашему случаю, также информацию вы можете найти на сайте: <IfgText onPress={()=>Linking.openURL('https://aslife.ru')} color={colors.GREEN_COLOR} style={[gs.underline,{lineHeight: 18}]}>aslife.ru</IfgText></IfgText>,
},
{
    index: 1,
    number: '02',
    title: 'Соберите и отправьте документы',
    text: 'Пакет документов по страховому случаю отправьте в ООО "АльфаСтрахование-Жизнь" по адресу: 115280, г. Москва, вн.тер. г. муниципальный округ Даниловский, пр-кт. Лихачёва, д. 15, помещ. 2/10',
},
{
    index: 2,
    number: '03',
    title: 'Получите выплату',
    text: 'С момента получения полного пакета документов у страховой компании 10 рабочих дней на принятие решения. В случае принятия положительного решения выплата осуществляется в течение 5 рабочих дней',
},
{
    index: 3,
    number: '04',
    title: 'Используйте выплату на приоритетные цели',
    text: 'В зависимости от условий договора выплата может быть или напрямую потрачена для погашения кредитной задолженности или направлена на другие приоритетные нужды.',
},
];
const howToUseSteps = [
  {
      index: 0,
      number: '01',
      title: 'Оформите полис',
      text: 'Оформите полис ООО \n"АльфаСтрахование-Жизнь" с возможностью получения медицинских услуг!',
  },
  {
      index: 1,
      number: '02',
      title: 'Подключите личный кабинет',
      text: <IfgText style={[gs.fontCaption2]}>Зарегистрируйтесь в <IfgText onPress={()=>Linking.openURL('https://dms.aslife.ru/#lk')} color={colors.GREEN_COLOR} style={[gs.underline]}>личном кабинете</IfgText>. Это позволит вам в удобном формате выбрать время и место для сдачи необходимых анализов.</IfgText>,
  },
  {
      index: 2,
      number: '03',
      title: 'Получите направление',
      text: 'Воспользуйтесь бесплатной онлайн консультацией врача для подбора необходимых вам исследований и получите направление на анализы.',
  },
  {
      index: 3,
      number: '04',
      title: 'Сдайте анализы',
      text: 'Сдайте необходимые анализы, дождитесь результатов и получите повторную консультацию у врача в онлайн формате.',
},
];
const documents = [
    {
        index: 0,
        url: 'https://ifeelgood.life/baz_standart.pdf',
        text: 'Базовый стандарт защиты прав и интересов физических и юридических лиц',
    },
    {
        index: 1,
        url: 'https://ifeelgood.life/standart_finoperac.pdf',
        text: 'Базовый стандарт совершения страховыми организациями операций на финансовом рынке',
    },
    {
        index: 2,
        url: 'https://ifeelgood.life/минималльный%20объем.pdf',
        text: 'Минимальный объем предоставляемой страховой организацией информации на сайте',
    },
    {
        index: 3,
        url: 'https://ifeelgood.life/document32613.pdf',
        text: 'Указание ЦБ РФ от 17.05.2022 N 6139-У , О минимальных (стандартных) требованиях',
    },
    {
        index: 4,
        url: 'https://ifeelgood.life/Памятка%20по%20популярным%20вопросам.pdf',
        text: 'Памятка по популярным вопросам',
    },
];

const benefits = [
  {
      index: 0,
      title: 'Выплата клиенту или наследнику',
      text: 'Выгодоприобретателем всегда будет являться клиент, либо его наследники. Клиент сам решает как потратить выплату от страховой компании.',
  },
  {
      index: 1,
      title: 'Всегда под защитой',
      text: 'Программы страхования работают 24 часа 7 дней в неделю. Зоны покрытия зависят от условий программы страхования, это может быть весь мир или РФ.',
  },
  {
      index: 2,
      title: 'Защита кредитной истории',
      text: 'Благодаря своевременным выплатам клиент сможет погасить задолженность в срок и не испортить кредитную историю.',
  },
  {
      index: 3,
      title: 'Защита имущества и накоплений',
      text: 'При наступлении страхового случая клиенту производится выплата, поэтому не придется использовать имущество или накопления для погашения кредита.',
  },
  {
      index: 4,
      title: 'Защита семьи',
      text: 'Семья клиента получает значительные средства для погашения задолженности при наступлении страхового случая.',
  },
  {
      index: 5,
      title: 'Минимальный пакет документов',
      text: 'Для получения выплаты не нужно собирать большое количество документов и справок.',
  },
];

const lastNews = [
  {
    title: 'Ценности кредитного страхования',
    imageUrl: 'https://ifeelgood.life/images/sincerely-media-3KEF.jpeg',
    url: 'https://vk.com/@asliferu-cennosti-kreditnogo-strahovaniya',
  },
  {
    title: 'Кредит с финансовой защитой - какие в этом есть преимущества для клиента?',
    imageUrl: 'https://ifeelgood.life/images/marcel-strauss-ocAo7.jpeg',
    url: 'https://vk.com/@asliferu-kredit-s-finansovoi-zaschitoi-kakie-v-etom-est-preimusches',
  },
  {
    title: 'Как оформить отказ от страховки АльфаСтрахование-Жизнь в период охлаждения?',
    imageUrl: 'https://ifeelgood.life/images/pexels-anna-shvets-4.jpeg',
    url: 'https://dzen.ru/a/X85LIqXmhE9JtHou',
  },
];

const paymentHistory = [
    {
        index: 0,
        name: 'Максим Ф.',
        title: 'Смертельное заболевание',
        text: '18 марта 2021 года Максим Ф. 1974 г.р. обратился в банк для получения кредита на сумму 750 000 рублей для покупки дачи. 20 июля 2021 года он обратился в поликлинику из-за постоянных сильных болей в животе. В итоге ему был поставлен диагноз - онкологическое заболевание. Врачи только разводили руками – была обнаружена неоперабельная опухоль (рак желудка 4 степени). К сожалению, спустя 2 месяца Максим ушёл из жизни по причине данного заболевания. Еще через полгода супруга вступила в наследство. АльфаСтрахование-Жизнь выплатила всю первоначальную сумму кредита - 750 000 рублей. Таким образом, супруге Максима не пришлось продавать приобретенный в кредит дачный участок.',
    },
    {
        index: 1,
        name: 'Сергей Л.',
        title: 'Трагедия на даче',
        text: '14 мая 2021 г. Сергей Л. оформил кредит в размере 895 тыс. руб. на строительство дачного дома. Закончив строительство в октябре, Сергей позвал родных на шашлыки, чтобы отметить это событие. Ожидая гостей, он попытался развести огонь, используя жидкость для розжига. В итоге бутылка с жидкостью взорвалась в руках Сергея, и огонь перебросился на него. Самостоятельно справиться с ситуацией он не смог и в итоге получил ожог 35% тела. Прибывшие родные доставили его в больницу. После продолжительного лечения Сергею установили инвалидность 1 группы, на прежнюю работу он уже выйти не мог по состоянию здоровья. Супруга, узнав, что кредит был защищён, обратилась в страховую компанию, отправила необходимые документы и благодаря этому семья получила страховую компенсацию в размере всей первоначальной суммы кредита - 895 тыс. руб. Семье не пришлось продавать дачу, чтобы оплачивать долги по кредиту.',
    },
    {
        index: 2,
        name: 'Татьяна К.',
        title: 'Сокращение с работы',
        text: '11 февраля 2021 года Татьяна К. 1981 г. р. обратилась в банк за кредитом на покупку гаража в размере 350 тыс. руб. на 4 года. В апреле этого же года работодатель Татьяны начал процедуру сокращения штата сотрудников, так как организация не справилась с последствиями пандемии. В итоге Татьяна потеряла работу. Она обратилась в банк, чтобы еще раз уточнить условия полиса. Получив разъяснения в банке и в страховой компании, она начала поиск новой работы, параллельно собрав и отправив нужный пакет документов для получения выплаты по страховому случаю. Через полгода Татьяна устроилась на новое место, за время поиска она получила от страховой компании общую компенсацию в размере 26 253 руб. Этих средств хватило на погашение ежемесячного платежа, и можно было продолжать поиск работы, не переживая, что придётся продавать недавно приобретённый гараж для того, чтобы справиться с неприятной ситуацией.',
    },
];
export const Coverage = observer(() => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<any>();
    const url = 'https://getfile.dokpub.com/yandex/get/https://disk.yandex.ru/i/82jQ8PQ_rRCJeg';
    const [activeSlide, setActiveSlide] = useState(0);

    const onBack = () => {
      navigation.goBack();
    };

    useEffect(() => {
    }, []);
    const Card = ({ item, index }) => {
        return (
          <View key={index.toString()} style={[s.card, {paddingBottom: 16,backgroundColor: item.bgColor, height: '100%'}]}>
            <View style={gs.mt32} />

            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption,  {textAlign: 'center', alignSelf:'center'}]}>
                {item.number}
            </IfgText>

            {/* <View style={gs.mt12} /> */}
            {item.title && <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.bold, gs.mt12,  {textAlign: 'center' , alignSelf:'center', maxWidth: 200  }]}>
                {item.title}
            </IfgText>}
            <View style={gs.mt16} />
            <View style={s.icon}>
            {item.icon}
            </View>
            <View style={gs.mt16} />
            {item.subTitle && <IfgText color={colors.SECONDARY_COLOR} style={[gs.fontCaption, gs.mt12,  {textAlign: 'center' , alignSelf:'center', maxWidth: '70%' }]}>
                {item.subTitle}
            </IfgText>}
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.mt12, {textAlign: 'center', alignSelf:'center'}]}>{item.description}</IfgText>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.mt12, {textAlign: 'center', alignSelf:'center'}]}>{item.description2}</IfgText>
          </View>
        );
      };
      const LastNewsCard = ({ item, index }) => {
        const openUrl = ()=>Linking.openURL(item.url);
        return (
          <View key={index.toString()}>
          <Image style={{position: 'absolute', borderRadius: 26}} width={width - 32}  height={189} source={{uri: item.imageUrl}} />
          <CardContainer style={{marginTop: 120, minHeight: 120}} >
            <IfgText onPress={openUrl} style={[gs.h3, gs.bold, gs.mt12]}>
              {item.title}
            </IfgText>
          </CardContainer>
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
        return <CardContainer key={index.toString()} style={[index === 0 && gs.ml16,gs.mr12,{width: 220, minHeight:270}]} >
            <CheckedFilled />
            <IfgText style={[gs.fontCaption, gs.bold]}>
            {item.title}
            </IfgText>
            <IfgText style={[gs.fontCaption2]}>
            {item.text}
            </IfgText>
        </CardContainer>;
    };
    const renderDocument = ({item, index}) => {
        return <CardContainer key={index.toString()} onPress={()=>Linking.openURL(item.url)} style={[index === 0 && gs.ml16,gs.mr12,{width: 220, height: 'auto', alignItems: 'center', justifyContent: 'center'}]} >
            <View style={{marginTop: 20}}><PDF/></View>

            <IfgText style={[gs.fontCaption2, {textAlign: 'center', marginTop: 18}]}>{item.text}</IfgText>
        </CardContainer>;
    };
    const renderPaymentHistory = ({item, index}) => {
        return <CardContainer key={index.toString()} style={[index === paymentHistory.length - 1 && gs.mr16,gs.ml16,{width: width - 32, height: 'auto'}]} >
        <View style={{columnGap: 4}}>
            <IfgText style={[gs.fontCaption3, gs.bold]}>{item.name}</IfgText>
            <IfgText style={[gs.fontCaption, gs.bold, gs.mt12]}>{item.title}</IfgText>
        </View>
        <IfgText style={[gs.fontCaption2, gs.mt12]}>{item.text}</IfgText>
        {/* <ButtonTo style={{width: 114, height: 26}} title="Подробнее" /> */}
        </CardContainer>;
    };
    return <>

     <ScrollView
      style={s.container}>
        <Button style={[s.buttonBack, {marginTop: Platform.OS === 'ios' ? insets.top - 16 : 0}]} onPress={onBack}>
            <>
                <ArrowBack />
                <IfgText color={colors.GRAY_COLOR3} style={gs.fontBody2}>Назад</IfgText>
            </>
        </Button>
        <View style={gs.mt16} />

        <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.h2, gs.bold]}>
         Страхование кредита
        </IfgText>
        <View style={gs.mt16} />
        <ImageBackground
        resizeMode="stretch"
         source={require('../../../assets/backgrounds/gradient3.png')}
        style={[s.cardGradientContainer]}
         >
            <IfgText color={colors.WHITE_COLOR} style={[gs.h3, gs.bold]}>Получите консультацию по договору ООО "АльфаСтрахование-Жизнь"</IfgText>
            <IfgText color={colors.WHITE_COLOR} style={gs.fontCaptionSmall}>Узнайте ответы на самые популярные вопросы о вашем страховом полисе на данной странице. Если у вас остались вопросы после изучения информации, то задать их можно по телефону или эл. почте!</IfgText>
            <Button onPress={onBack} style={s.howItWorksButton}>
                <>
                    <IfgText color={colors.WHITE_COLOR} style={gs.fontCaption}>Вернуться на главную</IfgText>
                    <ArrowRight />
                </>
            </Button>
        {/* <VideoPlayer disabled thumbnailName="coverage1" source={url} title={'О страховании'}/> */}
        {/* <View style={{borderBottomLeftRadius: 20, overflow: 'hidden', width: '100%',
    height: 200 }}> */}
        <YoutubeVideo videoId={youtube_parser('https://www.youtube.com/embed/wu6LPVzjOjw') || ''} />
        {/* </View> */}
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
        <CardContainer style={{padding: 0, overflow: 'hidden',  alignItems:'center'}} >
            {/* <Pagination
              dotsLength={carouselItems.length}
              activeDotIndex={activeSlide}
              containerStyle={s.paginationContainer}
              dotStyle={s.dotStyle}
              inactiveDotStyle={s.inactiveDotStyle}
            /> */}
            <Carousel
                data={carouselItems}
                renderItem={({ item, index }) => <Card item={item} index={index} />}
                sliderWidth={width - 28}
                itemWidth={width - 28}
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
        Узнайте больше о своем здоровье!
        </IfgText>
        <IfgText style={[gs.fontCaption2]}>
        Получите консультацию врача и сдайте необходимые анализы в рамках условий вашего договора страхования от "АльфаСтрахование-Жизнь"
        </IfgText>
        <Button onPress={()=>Linking.openURL('https://dms.aslife.ru/#lk')} style={{borderColor: colors.GREEN_COLOR, borderWidth: 1, borderRadius: 12, paddingHorizontal: 16}} >
          <View style={gs.buttonContent} >
            <View style={gs.buttonContentRow} >
              <IfgText>На сайте</IfgText>
              <ArrowRightGreen />
            </View>
          </View>
        </Button>
        <Image height={100} style={{bottom: -16 , right: -16 }} source={{uri: 'https://ifeelgood.life/images/mockup-graphics-WcJB.jpg' }} />
      </CardContainer>
      <View style={gs.mt24} />
      <IfgText style={[gs.h3, gs.bold]}>
      Как воспользоваться услугой?
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
                        {howToUseSteps.map(({index, number})=> <View key={index.toString()} style={[s.circle, { left: 240 * index   + 16  + 24 * index }]} >
                            <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption2]}>{number}</IfgText>
                            </View>)
                        }
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 16}} >
                        {howToUseSteps.map(({text, title, index})=><CardContainer style={[index === 0 && gs.ml16,gs.mr24,{width: 240, height: 'auto'}]} >
                        <IfgText style={[gs.fontCaption, gs.bold]}>{title}</IfgText>
                        <IfgText style={[gs.fontCaption2]}>{text}</IfgText>
                        </CardContainer>)}
                    </View>
                </ScrollView>

      <View style={gs.mt24} />
      <IfgText style={[gs.h3, gs.bold]}>
        Что получает клиент, оформив страхование?
      </IfgText>
      <View style={gs.mt16} />
      <FlatList
      keyExtractor={(item, index)=>index.toString()}
      style={{marginHorizontal: -16}}
      contentContainerStyle={{flexGrow: 1, flexDirection: 'row'}}
      showsHorizontalScrollIndicator={false}
      data={benefits}
      horizontal
      renderItem={renderBenefits}
      />
      <View style={gs.mt24} />
      <CardContainer>
        <RutubeView  url="https://rutube.ru/play/embed/bc205caefab8b699172cf74020817155/?p=EK1pf1GIUYk0qP3_sZKqvQ"/>
        <IfgText style={[gs.h3, gs.bold]}>
        Что думают люди о финансовой защите?
        </IfgText>
        <IfgText style={[gs.h5, gs.regular]}>
        Оформляя страхование, вы заботитесь не только о себе, но и о своих близких!
        </IfgText>
        <Button onPress={()=>Linking.openURL('mailto:strahvopros@ifeelgood.life')} outlined style={{borderWidth: 1,borderRadius: 12,paddingHorizontal: 20, borderColor: colors.GREEN_COLOR}}>
            <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
            <IfgText style={[gs.fontCaption, gs.medium]}>Задать вопрос</IfgText>
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
                        {accidentSteps.map(({index, number})=> <View key={index.toString()} style={[s.circle, { left: 240 * index   + 16  + 24 * index }]} >
                            <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption2]}>{number}</IfgText>
                            </View>)
                        }
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 16}} >
                        {accidentSteps.map(({text, title, index})=><CardContainer style={[index === 0 && gs.ml16,gs.mr24,{width: 240, height: 'auto'}]} >
                        <IfgText style={[gs.fontCaption, gs.bold]}>{title}</IfgText>
                        {typeof (text) === 'string' ?
                        <IfgText style={[gs.fontCaption2]}>{text}</IfgText>
                        :
                        text }
                        </CardContainer>)}
                    </View>
                </ScrollView>
        <View style={gs.mt24} />
        <IfgText style={[gs.h3, gs.bold]}>
        Часто задаваемые вопросы:
        </IfgText>
        <View style={gs.mt16} />
        <CardContainer>
            <Accordion items={faqData} />
        {/* <IfgText onPress={()=>setShowMore((val)=>!val)} color={colors.GREEN_LIGHT_COLOR} style={[gs.fontCaption2, gs.underline]}>{showMore ? 'Скрыть' : 'Показать больше'}</IfgText> */}
        </CardContainer>
        <View style={gs.mt24} />
        {/* <View style={[gs.flexRow, {justifyContent: 'space-between', alignItems: 'center'}]}>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontBodyMedium, gs.bold]}>Последние новости</IfgText>
            <ButtonTo onPress={()=>navigation.navigate('Материалы', {resetParams: 'articles'})} title="Все материалы" />
          </View>
          <View style={gs.mt16} />
          <FlatList
                horizontal
                style={{marginHorizontal: -16}}
                contentContainerStyle={{flexGrow: 1, flexDirection: 'row'}}
                showsHorizontalScrollIndicator={false}
                data={articlesStore.articlesMainList.articles}
                renderItem={({item, index})=>MaterialCard(item, index)}
        /> */}
        <IfgText style={[gs.h3, gs.bold]}>
        Будьте в курсе последних новостей компании
        </IfgText>
        <View style={gs.mt12} />
        <IfgText color={colors.SECONDARY_COLOR} style={[gs.fontCaption2]}>
        Узнайте еще больше информации в полезных статьях от компании
        </IfgText>
        <View style={gs.mt24} />
        <Carousel
                data={lastNews}
                renderItem={({ item, index }) => <LastNewsCard item={item} index={index} />}
                sliderWidth={width - 32}
                itemWidth={width - 32}
                loop={true}
                // useScrollView={false}
                autoplayDelay={0.5}
                // autoplayInterval={0.5}
                autoplay={true} // Зацикливание слайдера
                layout={'default'} // Расположение карточек
                // onSnapToItem={(index) => setActiveSlide(index) }
                // enableMomentum={false}
                // lockScrollWhileSnapping={true}
                />
        <View style={gs.mt24} />
        <IfgText style={[gs.h3, gs.bold]}>
        Базовые стандарты
        </IfgText>
        <View style={gs.mt12} />
        <IfgText color={colors.SECONDARY_COLOR} style={[gs.fontCaption2]}>
        Официальная информация и вспомогательные материалы.
        </IfgText>
        <View style={gs.mt12} />
        <CardContainer>
        <IfgText style={[gs.fontBodyMedium, gs.bold]}>
        Базовые стандарты
        </IfgText>
        <IfgText style={[gs.fontCaption2]}>
        — это обязательные требования к страховым агентам и компаниям, которые продают страховые продукты. Все агенты и страховые специалисты обязаны знать и соблюдать стандарт. Если у вас есть вопросы по стандартам или ваши права были нарушены, получите конкусльтацию у нас!
        </IfgText>
        </CardContainer>
        <View style={gs.mt24} />
        <IfgText style={[gs.fontBodyMedium, gs.bold]}>
        Регламентирующая документация
        </IfgText>
        <View style={gs.mt16} />
        <FlatList
            keyExtractor={(item, index)=>index.toString()}
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
            {/* <Image style={{width: '100%', height: 280, bottom: -16, marginTop: -16}} source={require('../../../assets/backgrounds/coverageMan.png')}/> */}
        </CardContainer>
        <View style={gs.mt24} />

        <CardContainer>
            <RutubeView url="https://rutube.ru/play/embed/d3d910a3ad482af2ec387890dd3252a7/?p=htYEgseXRxwnCuqpX1KFPQ"/>
            <IfgText style={[gs.h3, gs.bold]}>
            Как работает страхование заемщиков кредитов!
            </IfgText>
            <IfgText style={[gs.h5, gs.regular]}>
            Специально для Вас мы подготовили мультфильм о том, как работает страхование!
            </IfgText>
            <Button onPress={()=>Linking.openURL('tel:88007003320')} outlined style={{borderWidth: 1,borderRadius: 12,paddingHorizontal: 20, borderColor: colors.GREEN_COLOR}}>
                <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                <IfgText style={[gs.fontCaption, gs.medium]}>Получить консультацию</IfgText>
                <ArrowRightGreen />
                </View>
            </Button>
        </CardContainer>
        <View style={gs.mt24} />
        <IfgText style={[gs.fontBodyMedium, gs.bold]}>
        Истории выплат клиентам
        </IfgText>
        <View style={gs.mt16} />
        <FlatList
            keyExtractor={(item, index)=>index.toString()}
            style={{marginHorizontal: -16}}
            contentContainerStyle={{flexGrow: 1, flexDirection: 'row'}}
            showsHorizontalScrollIndicator={false}
            data={paymentHistory}
            horizontal
            snapToInterval={width - 16}
            renderItem={renderPaymentHistory}
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
                <CardContainer style={[{width: 190, height: 236, padding:14, borderWidth: 1, borderColor: '#E7E7E7', justifyContent: 'space-between' }, gs.mr12, index === 0 && gs.ml16 ]} >
                    <IfgText numberOfLines={2} style={[gs.fontCaption2, gs.bold]}>{item.title}</IfgText>
                    <Image resizeMode="contain"  source={{uri: `https://ifeelgood.life${item.media[0].full_path[1]}`}}
                    style={{ height: 114, width: '100%' }}
                    />
                <Button onPress={()=>navigation.navigate('ContestView', {contestId: item.id})} fullWidth style={[gs.flexRow, gs.alignCenter,{paddingHorizontal: 12, height: 30,borderWidth: 0.75, borderRadius: 6, borderColor: '#E6E6E6', justifyContent: 'space-between' }]}>
                  <>
                  <IfgText style={gs.fontBody2}>{!item.winners ? 'Как получить приз?' : 'К результатам'}</IfgText>
                  <View style={{marginTop:2}}>
                    <ArrowRightBlack width={12} />
                  </View>
                  </>

                </Button>
            </CardContainer>}
        />
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
      <CardContainer>
        <IfgText style={[gs.h2, {textAlign: 'center'}]}>Остались вопросы?</IfgText>
        <IfgText style={[gs.fontCaption2]}>
        Напишите нам на <IfgText onPress={()=>Linking.openURL('mailto:strahvopros@ifeelgood.life')} color={colors.GREEN_COLOR} style={[gs.underline, gs.bold,{lineHeight: 18}]}>strahvopros@ifeelgood.life</IfgText> или позвоните <IfgText onPress={()=>Linking.openURL('tel:88007003320')} color={colors.GREEN_COLOR} style={[gs.underline, gs.bold,{lineHeight: 18}]}>8-800-700-33-20</IfgText>
        </IfgText>
        <Image resizeMode="contain" height={200} source={{uri: 'https://ifeelgood.life/images/IMG_1683_.png'}}/>
      </CardContainer>
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
            // justifyContent: 'center',
            alignContent: 'center',
            paddingHorizontal: 16,
            width: '100%',
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
