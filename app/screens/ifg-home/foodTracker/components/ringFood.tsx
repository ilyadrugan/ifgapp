import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { IfgText } from '../../../../core/components/text/ifg-text';
import colors from '../../../../core/colors/colors';
import { hexToRgba } from '../../../../core/utils/hexToRGBA';

interface RingFoodType {
  color: string;
  label: string;
  value: number;
  goal: number;
  big?: boolean;
}

export const RingFoodComponent: FC<RingFoodType> = ({
  color,
  label,
  value,
  goal,
  big,
}) => {
  const sizee = big ? 80 : 60;
  const strokeWidth = big ? 10 : 8; // Толщина окружности
  const radius = (sizee - strokeWidth) / 2; // Радиус круга
  const circumference = 2 * Math.PI * radius;
  const filled = circumference - value / goal * circumference < 0 ? 0 : circumference - value / goal * circumference;
  return (
    <View style={styles.container}>
      <Svg width={sizee} height={sizee}>
        {/* Фоновый круг */}
        <Circle
          stroke={'#0000001A'}
          fill="none"
          cx={sizee / 2}
          cy={sizee / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={color}
          fill="none"
          cx={sizee / 2}
          cy={sizee / 2}
          r={radius}
          strokeWidth={strokeWidth + 1}
          strokeDasharray={circumference}
          strokeDashoffset={filled}
          strokeLinecap="round"
          transform={`rotate(-90 ${sizee / 2} ${sizee / 2})`}
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
        /> */}<View style={[
        styles.innerBox,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          width: big ? 36 : 24,
          height: big ? 36 : 24,
          borderRadius: big ? 8 : 6,
          alignSelf: 'center',
          marginTop: big ? radius - 12 : radius - 8 ,
          backgroundColor: hexToRgba(color, 0.3),
        },
      ]}>
        <IfgText color={colors.BLACK_COLOR} style={{fontSize: big ? 26 : 21, textAlign: 'center', top:2}}>{label}</IfgText>
      </View>
      </Svg>
      <IfgText color={colors.PLACEHOLDER_COLOR} style={{fontSize: 16}}>{value}</IfgText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerBox: {

    alignItems: 'center',
    justifyContent: 'center',

  },
  label: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
});
