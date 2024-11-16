import React, { FC, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import colors from '../../colors/colors';
import { IfgText } from '../text/ifg-text';
import gs from '../../styles/global';
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const CircularProgress: FC<{
  value: number,
  maxValue: number,
}> = ({ value, maxValue }) => {
  const size = 80; // Размер круга
  const strokeWidth = 6; // Толщина окружности
  const radius = (size - strokeWidth) / 2; // Радиус круга
  const circumference = 2 * Math.PI * radius; // Длина окружности

  // Анимация для прогресса
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Анимация заполнения
    Animated.timing(animatedValue, {
      toValue: value / maxValue,
      duration: 5000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false, // SVG не поддерживает native driver
    }).start();
  }, [value]);

  // Интерполяция strokeDashoffset
  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Фоновый круг */}
        <Circle
          stroke={'rgba(255, 255, 255, 0.25)'}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke="#FFFFFF"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth + 1}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - value / maxValue * circumference}
          strokeLinecap="round"
          transform={`rotate(90 ${size / 2} ${size / 2})`}
        />
        {/* Прогресс */}
        {/* <AnimatedCircle
          stroke="#FFFFFF"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth + 1}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset} // Здесь передаем Animated значение
          strokeLinecap="round"
           transform={`rotate(90 ${size / 2} ${size / 2})`}
        /> */}
      </Svg>
      {/* Текст внутри круга */}
      <View style={styles.textContainer}>
        <IfgText style={[gs.fontBody1, gs.medium, {lineHeight: 30}]}>{value}</IfgText>
        <IfgText color="rgba(255, 255, 255, 0.55)" style={gs.fontCaptionSmallSmall}>из {maxValue}</IfgText>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
