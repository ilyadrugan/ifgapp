import React, { useRef, useEffect } from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Убедитесь, что вы используете подходящую библиотеку для иконок.
import ArrowRight from '../../../../assets/icons/arrow-right.svg';

const AnimatedArrow = () => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: -20, // Двигаем стрелку вправо
          duration: 1000,
          easing: Easing.inOut(Easing.quad), // Плавное движение туда
          useNativeDriver: true,
        }),
        Animated.delay(500),
        Animated.timing(animation, {
          toValue: 0, // Возвращаем стрелку обратно с замедлением
          duration: 1000,
          easing: Easing.out(Easing.quad), // Замедление перед остановкой
          useNativeDriver: true,
        }),
        Animated.delay(500), // Пауза перед повторением
      ])
    ).start();
  }, [animation]);

  const translateX = animation;

  return (
        <Animated.View
          style={[
            styles.arrowContainer,
            { transform: [{ translateX }] }, // Анимация движения
          ]}
        >
          <ArrowRight />
        </Animated.View>
  );
};

const styles = StyleSheet.create({
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnimatedArrow;
