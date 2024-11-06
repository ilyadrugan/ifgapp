
import { StyleSheet, View, Image } from 'react-native';
import { IfgText } from '../../../core/components/text/ifg-text';
import React from 'react';
import { FC}  from 'react';
import gs from '../../../core/styles/global';

export const Step4:FC = () => {



    return <>
    <View style={[s.container,{ zIndex: 99, elevation: 10}]}>
    <View>
      <IfgText style={[gs.h1Intro,  {textAlign: 'center', top: 44}]}>
              Начните прямо сейчас
      </IfgText>
      {/* <BlurView style={s.blurContainer} blurType="light" blurAmount={1} reducedTransparencyFallbackColor="white"> */}
      <View style={s.bubble}>
        <IfgText style={[gs.fontBody1,  {textAlign: 'center'}]}>Правильное вложение – это вклад в здоровье</IfgText>
      </View>
      <View style={s.tail} />
      {/* </BlurView> */}
    </View>
      <Image
          resizeMode="contain"
          style={{ width: '100%', bottom: 100}}
          source={require('../../../../assets/backgrounds/girl.png')}/>
    </View>
    </>;
};

const s = StyleSheet.create({
    container: {
      height: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    bubble:{
      maxWidth: '80%',
      padding: 15,
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
      alignItems: 'center',
      borderRadius: 16,
      top: 64,
    },
    tail: {
      position: 'absolute',
      bottom: 0,
      left: 26, // Позиция хвостика; можно изменить для другого расположения
      width: 0,
      height: 0,
      // borderLeftWidth: 15,
      borderRightWidth: 25,
      borderTopWidth: 25,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderTopColor: 'rgba(255, 255, 255, 0.12)', // Цвет, совпадающий с цветом фона облака
      transform: [{ translateY: 25 + 64 }], // Смещение хвостика для точного позиционирования
    },
    blurContainer: {
      borderRadius: 10, // Радиус для сглаживания углов
      overflow: 'hidden', // Обрезка, чтобы эффект размытия не выходил за границы
    },
  });
