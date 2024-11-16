import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { Easing, useSharedValue, useAnimatedProps, withTiming } from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const CircularProgress = ({ value, maxValue }) => {
  const size = 120; // Размер круга
  const strokeWidth = 10; // Толщина окружности
  const radius = (size - strokeWidth) / 2; // Радиус круга
  const circumference = 2 * Math.PI * radius; // Длина окружности

  const progress = useSharedValue(0);

//   useEffect(() => {
//     // Анимация заполнения
//     progress.value = withTiming((value / maxValue) * circumference, {
//       duration: 1000,
//       easing: Easing.out(Easing.ease),
//     });
//   },);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference - progress.value,
  }));

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Фоновый круг */}
        <Circle
          stroke="#B0E5D6"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Прогресс окружности */}
        <AnimatedCircle
          stroke="#FFFFFF"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
        />
      </Svg>
      {/* Текст внутри окружности */}
      <View style={styles.textContainer}>
        <Text style={styles.valueText}>{value}</Text>
        <Text style={styles.maxText}>из {maxValue}</Text>
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
  valueText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  maxText: {
    fontSize: 14,
    color: '#DFF5EE',
  },
});

