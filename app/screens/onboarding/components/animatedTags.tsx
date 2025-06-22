import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Animated, Easing } from 'react-native';
import colors from '../../../core/colors/colors';
import { AnimatedHashtagContainer, HashtagContainer } from '../../../core/components/card/cardContainer';
import { IfgText } from '../../../core/components/text/ifg-text';
import gs from '../../../core/styles/global';
import { perfectSize } from '../../../core/utils/pixelPerfect';

const width = Dimensions.get('screen').width;


export const AnimatedTags = () => {

    const hashtags = [
        {
            name: '#питание',
            style: {
                top: perfectSize(30), left: width * 0.3,  width: perfectSize(100),
            },
            bgColor: colors.ORANGE_COLOR,
            startAngle: 0,
            angle: 10,
        },
        {
            name: '#антистресс',
            style: {
                top: perfectSize(50), right:width * 0.05, transform: [{ rotate: '-17deg' }],
            },
            bgColor: '#C3E154',
            startAngle: -17,
            angle: 17,
        },
        {
            name: '#сон',
            style: {
                top: perfectSize(110), right: width * 0.12, width: perfectSize(80), height: 34,
            },
            bgColor: colors.OCEAN_COLOR,
            startAngle: 0,
            angle: -45,
        },
        {
            name: '#мотивация',
            style: {
                top: perfectSize(210), left: width * 0.05 , width: perfectSize(120) , transform: [{ rotate: '-50deg' }],
            },
            bgColor: '#FDCD00',
            startAngle: -50,
            angle: -35,
        },
        {
            name: '#Физическая активность',
            style: {
                top: perfectSize(260), right: width * 0.11,
            },
            bgColor: colors.PINK_COLOR,
            startAngle: 0,
            angle: -12,
        },
    ];

    const animations = hashtags.map(() => new Animated.Value(0));
    const startRotation = (index: number, angle: number) => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(animations[index], {
              toValue: 1, // Анимация поворота до угла
              duration: 1000,
              easing: Easing.inOut(Easing.quad), // Плавное движение туда
              useNativeDriver: true,
            }),
            Animated.delay(1000),
            Animated.timing(animations[index], {
              toValue: 0, // Возврат в исходное положение
              duration: 1000,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.delay(1000),
          ])
        ).start();
      };
      useEffect(() => {
        hashtags.forEach((hashtag, index) =>
          startRotation(index, hashtag.angle)
        );
      }, [hashtags]);
    return <>
        {/* <HashtagContainer style={[s.hashtagContainer, {top: 40, left: width * 0.3,  width: 100}]} bgcolor={colors.ORANGE_COLOR} >
        <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption2, gs.light, {lineHeight: 16}]}>{'#питание'}</IfgText>
        </HashtagContainer>
        <HashtagContainer style={[s.hashtagContainer, {top: 50, right: width * 0.05, transform: [{ rotate: '-17deg' }]}]} bgcolor={'#C3E154'} >
        <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption2, gs.light, {lineHeight: 16}]}>{'#антистресс'}</IfgText>
        </HashtagContainer>
        <HashtagContainer style={[s.hashtagContainer, {top: 110, right: width * 0.12, width: 80, height: 34}]} bgcolor={colors.OCEAN_COLOR} >
        <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption2, gs.light, {lineHeight: 16}]}>{'#сон'}</IfgText>
        </HashtagContainer>
        <HashtagContainer style={[s.hashtagContainer, {top: 210, left: width * 0.05 , width: 110 , transform: [{ rotate: '-50deg' }]}]} bgcolor={'#FDCD00'} >
        <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption2, gs.light, {lineHeight: 16}]}>{'#мотивация'}</IfgText>
        </HashtagContainer>
        <HashtagContainer style={[s.hashtagContainer, {top: 260, right: width * 0.11  }]} bgcolor={colors.PINK_COLOR} >
        <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption2, gs.light, {lineHeight: 16}]}>{'#Физическая активность'}</IfgText>
        </HashtagContainer> */}
        {hashtags.map((hashtag, index)=>
        {
            const rotate = animations[index].interpolate({
                inputRange: [0, 1],
                outputRange: [ `${hashtag.startAngle}deg`, `${hashtag.angle}deg`], // Углы в градусах как строки
              });
            return <AnimatedHashtagContainer key={index.toString()} style={[s.hashtagContainer, hashtag.style,
            {transform: [
                { translateX: index === 0 ? -50 : 0 }, // Смещаем центр вращения влево
                { rotate },          // Применяем поворот
                { translateX: index === 0 ? 50 : 0  },  // Возвращаем элемент обратно
              ]} ]}
             bgcolor={hashtag.bgColor} >
                    <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption2, gs.light, {fontSize: perfectSize(16), lineHeight: perfectSize(16)}]}>{hashtag.name}</IfgText>
                </AnimatedHashtagContainer>;

        }
        )}
    </>;
};


const s = StyleSheet.create({
    hashtagContainer: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        position: 'absolute',
        borderRadius: 18,
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
    },
  });
