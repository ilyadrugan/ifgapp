import React, { FC, ReactNode } from 'react';
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import colors from '../../colors/colors';
import gs from '../../styles/global';
import { IfgText } from '../text/ifg-text';
import ArrowRight from '../../../../assets/icons/arrow-right.svg';
import ArrowRight12 from '../../../../assets/icons/arrow-right12.svg';
import ArrowTo from '../../../../assets/icons/arrow-to.svg';


export const ButtonNext:FC<{
  onPress?: ()=>void,
  title?: string,
  oliveTitle?: string,
  style?: StyleProp<ViewStyle>,
  textStyle?: StyleProp<TextStyle>,
}> = ({onPress, title, oliveTitle, style, textStyle}) => <Button style={[s.buttonNext, style && style]}
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
                         <IfgText color={colors.OLIVE_COLOR} style={[gs.fontCaptionSmallMedium, gs.ml12, {lineHeight: 16} ]}>{oliveTitle}</IfgText>
                    </View>
                        <ArrowRight />
                    </View>

                    <View />
                </View>

        </Button>;

export const ButtonTo:FC<{
  onPress?: ()=>void,
  title?: string,
  style?: StyleProp<ViewStyle>,
  textColor?: string,
  whiteIcon?: boolean,
}> = ({onPress, title, style, textColor, whiteIcon}) => <Button style={[s.buttonTo, style]} onPress={onPress}>
<>
<IfgText color={textColor || colors.GRAY_COLOR3} style={gs.fontBody2}>{title}</IfgText>

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
