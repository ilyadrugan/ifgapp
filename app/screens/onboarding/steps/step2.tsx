
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { IfgText } from '../../../core/components/text/ifg-text';
import React, { useState } from 'react';
import { FC}  from 'react';
import gs from '../../../core/styles/global';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import colors from '../../../core/colors/colors';
import Meditate from '../../../../assets/icons/meditate.svg';
import Testing from '../../../../assets/icons/regulartesting.svg';
import Content from '../../../../assets/icons/trustedcontent.svg';
import Motivation from '../../../../assets/icons/mymotivation.svg';
import PersonalPlan from '../../../../assets/icons/personalplan.svg';
const { width } = Dimensions.get('screen');
export const Step2:FC = () => {
    const [activeSlide, setActiveSlide] = useState(0);

    const carouselItems = [
        {
            number: '01',
            title: 'Подтверждено на практике',
            description: 'Все ifeelgood рекомендации протестированы и легко применимы на практике.',
            icon: <Meditate />,
        },
        {
            number: '02',
            title: 'Регулярное тестирование',
            description: 'Меня тестируют чтобы понять, что нужно именно мне.',
            icon: <Testing />,
        },
        {
            number: '03',
            title: 'Проверенный контент',
            description: 'Я получаю только эксклюзивную и научно-подтвержденную информацию.',
            icon: <Content />,
        },
        {
            number: '04',
            title: 'Моя мотивация',
            description: 'Найду мотивацию заниматься своим здоровьем',
            icon: <Motivation />,
        },
        {
            number: '05',
            title: 'Персональный план',
            description: 'Я получаю четкий и понятный план действий для улучшения своего самочувствия.',
            icon: <PersonalPlan />,
        },
      ];

    const Card = ({ item }) => {
        return (
          <View style={s.card}>
            <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption,  {textAlign: 'center', alignSelf:'center'}]}>
                {item.number}
            </IfgText>
            <IfgText color={colors.WHITE_COLOR} style={[gs.h2Intro, gs.mt36,  {textAlign: 'center', maxWidth: 220, alignSelf:'center' }]}>
                {item.title}
            </IfgText>
            <View />
            <View style={s.icon}>
            {item.icon}
            </View>
            <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption, {textAlign: 'center',maxWidth: width * 0.6, alignSelf:'center'}]}>{item.description}</IfgText>
          </View>
        );
      };
    return <>
        <View style={[s.container, gs.mt44]}>
            <IfgText color={colors.WHITE_COLOR} style={[gs.h1Intro,  {textAlign: 'center'}]}>
                Зачем мне нужен ifeelgood?
            </IfgText>

            <View style={gs.mt44}/>
            <View style={s.roundedScrollCard}>
            <Pagination
              dotsLength={carouselItems.length}
              activeDotIndex={activeSlide}
              containerStyle={s.paginationContainer}
              dotStyle={s.dotStyle}
              inactiveDotStyle={s.inactiveDotStyle}
            />
            <LinearGradient
            colors={[ 'rgba(44, 44, 44, 0.24)','transparent' ]}
            style={s.absolute}
            />
            <Carousel
                data={carouselItems}
                renderItem={({ item }) => <Card item={item} />}
                sliderWidth={width * 0.9}
                itemWidth={width * 0.9}
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
      </View>

        </View>
    </>;
};

const s = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'center',
    },
    roundedScrollCard:{
        width: '90%',
        height: 400,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        overflow: 'hidden',

    },
      absolute: {
        ...StyleSheet.absoluteFillObject,
      },
      icon: {
        marginVertical: 18,
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
      },
      paginationContainer: {
        paddingVertical: 10,
        marginTop: -12,
      },
      dotStyle: {
        width: 0.9 * width / 5,
        height: 6,
        backgroundColor: colors.GREEN_LIGHT_COLOR,
      },
      inactiveDotStyle: {
        width: 0.9 * width / 5,
        height: 6,
        backgroundColor: 'transparent',
      },
  });
