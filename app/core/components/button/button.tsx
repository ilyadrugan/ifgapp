import React, { FC, ReactNode, useEffect, useRef } from 'react';
import { ActivityIndicator, Animated, StyleProp, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import colors from '../../colors/colors';
import gs from '../../styles/global';
import { IfgText } from '../text/ifg-text';
import ArrowRight from '../../../../assets/icons/arrow-right.svg';
import ArrowRight12 from '../../../../assets/icons/arrow-right12.svg';
import ArrowTo from '../../../../assets/icons/arrow-to.svg';
import LinearGradient from 'react-native-linear-gradient';
import AnimatedArrow from '../animatedArrow/animatedArrow';

export const AnimatedGradientButton:FC<{
  children?: ReactNode,
  disabled?: boolean,
  onPress?: () => void,
  style?: StyleProp<ViewStyle>,
  fullWidth?: boolean
  outlined?: boolean
  isLoading?: boolean,
}> = (
  {
    children,
    onPress,
    style,
    disabled,
    fullWidth,
    outlined,
    isLoading,
  }) => {
    const colorAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      // Бесконечная анимация переливания цвета
      Animated.loop(
        Animated.sequence([
          Animated.timing(colorAnimation, {
            toValue: 1, // Переход ко второму цвету
            duration: 1000, // Длительность переливания (в миллисекундах)
            useNativeDriver: false, // Для анимации цвета false
          }),
          Animated.delay(500),
          Animated.timing(colorAnimation, {
            toValue: 0, // Возврат к первому цвету
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.delay(500),
        ])
      ).start();
    }, []);

    // Интерполяция для перехода между двумя цветами
    const backgroundColor = colorAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['#54B676', 'rgb(80,232,132)'], // Начальный и конечный цвета
    });
  return (
    <TouchableOpacity
    disabled={disabled}
    onPress={onPress}
  >
    <Animated.View style={[
      s.button,
      style,
      fullWidth && s.fullWidth,
      outlined && s.outline,
      {backgroundColor: backgroundColor},
    ]}
   >

           {children ? children : null}

      </Animated.View>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  gradientButton: {
    borderRadius: 25,
    overflow: 'hidden', // Градиент не выходит за границы кнопки
  },
  gradientBackground: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export const ButtonNext:FC<{
  onPress?: ()=>void,
  title?: string,
  oliveTitle?: string,
  style?: StyleProp<ViewStyle>,
  textStyle?: StyleProp<TextStyle>,
  disabled?: boolean,
  isLoading?: boolean,
  animated?: boolean,
}> = ({onPress, title, oliveTitle, style, textStyle, disabled, animated, isLoading}) =>
        <Button disabled={disabled} style={[s.buttonNext, style && style]}
                onPress={onPress}
                >
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    }}>
                    <View style={{
                        width:'100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <View style={{flexDirection: 'row', alignItems:'center'}}>
                         <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption, gs.medium, textStyle && textStyle]}>{title}</IfgText>
                         {oliveTitle && <IfgText color={colors.OLIVE_COLOR} style={[gs.fontCaptionSmallMedium, gs.ml12, {lineHeight: 16} ]}>{oliveTitle}</IfgText>}
                    </View>
                    {isLoading ? <ActivityIndicator/> :
                      animated ? <AnimatedArrow/> : <ArrowRight />}
                    </View>

                    <View />
                </View>

        </Button>;

export const ButtonTo:FC<{
  onPress?: ()=>void,
  title?: string,
  style?: StyleProp<ViewStyle>,
  textColor?: string,
  textStyle?: StyleProp<TextStyle>,
  whiteIcon?: boolean,
}> = ({onPress, title, style, textColor, textStyle, whiteIcon}) => <Button style={[s.buttonTo, style]} onPress={onPress}>
<>
<IfgText color={textColor || colors.GRAY_COLOR3} style={textStyle || gs.fontBody2}>{title}</IfgText>

    {whiteIcon ? <ArrowRight12 /> : <ArrowTo />}
    </>
</Button>;

export const Button: FC<{
    children?: ReactNode,
    disabled?: boolean,
    onPress?: () => void,
    style?: StyleProp<ViewStyle>,
    fullWidth?: boolean
    outlined?: boolean
  }> = (
    {
      children,
      onPress,
      style,
      disabled,
      fullWidth,
      outlined,
    }) => {
    return <>
    <TouchableOpacity
      style={[
        s.button,
        style,
        fullWidth && s.fullWidth,
        outlined && s.outline,
      ]}
      disabled={disabled}
      onPress={onPress}
    >

          {children ? children : null }

    </TouchableOpacity>
    </>;
};

const s = StyleSheet.create({
    button: {
      height: 56,
      justifyContent: 'center',
      borderRadius: 8,
    },
    content: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    activityIndicator: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    fullWidth: {
      width: '100%',
    },
    outline: {
      backgroundColor: 'transparent',
    },
    buttonNext: {
      backgroundColor: colors.GREEN_COLOR,
      borderRadius: 16,
      paddingHorizontal: 24,
      height: 60,
    },
    buttonTo: {
      flexDirection: 'row',
      gap: 6,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: colors.BORDER_COLOR3,
      borderWidth: 0.75,
      borderRadius: 8,
      paddingHorizontal: 12,
      // paddingVertical: 8,
      height: 30,
      },
  });
