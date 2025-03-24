
import { StyleSheet, View, Image } from 'react-native';
import { IfgText } from '../../../core/components/text/ifg-text';
import React, { useEffect } from 'react';
import { FC}  from 'react';
import gs from '../../../core/styles/global';
import colors from '../../../core/colors/colors';
import { ScreenHeight, ScreenWidth } from '../../../hooks/useDimensions';

export const Step4:FC = () => {

    return <>
    <View style={[s.container,{ zIndex: 99, elevation: 10}]}>
    <View style={{alignItems: 'center'}}>
      <IfgText color={colors.WHITE_COLOR} style={[gs.h1Intro,  {textAlign: 'center', top: 44, paddingHorizontal: 16}]}>
              Начните прямо сейчас
      </IfgText>
      <View style={s.bubble}>
        <IfgText color={colors.WHITE_COLOR} style={[gs.fontBody1,  {textAlign: 'center'}]}>Правильное вложение – это вклад в здоровье</IfgText>
      </View>
      <View style={s.tail} />
    </View>
      <Image
          resizeMode="contain"
          style={{ width: '100%',top: ScreenHeight < 850 ? 0 : '15%',  position: 'absolute', alignSelf: 'center'}}
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
      maxWidth: '85%',
      padding: 15,
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
      alignItems: 'center',
      borderRadius: 16,
      top: 64,
    },
    tail: {
      position: 'absolute',
      bottom: 0,
      left: ScreenWidth * 0.15,
      width: 0,
      height: 0,
      borderRightWidth: 25,
      borderTopWidth: 25,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderTopColor: 'rgba(255, 255, 255, 0.12)',
      transform: [{ translateY: 25 + 64 }],
    },
    blurContainer: {
      borderRadius: 10,
      overflow: 'hidden',
    },
  });
