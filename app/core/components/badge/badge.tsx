import { FC, ReactNode } from 'react';
import { StyleProp, StyleSheet, TouchableHighlight, View, ViewStyle } from 'react-native';
import { IfgText } from '../text/ifg-text';



export const Badge: FC<{
    children?: ReactNode,
    style?: StyleProp<ViewStyle>,
    disabled?: boolean
}> = ({children, style, disabled}) => {



    return <>
    <TouchableHighlight
      style={[
        s.button,
        style,
      ]}
      disabled={disabled}
    >
      <View style={s.content} />
      <View>
      {children &&
            <IfgText style={[s.text, {
              color: 'white',
            }]}>
              {children}
            </IfgText>
          }
      </View>
    </TouchableHighlight>
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
    text: {
      color: 'white',
      fontFamily: 'TildaSans-Semibold',
      fontSize: 16,
      textAlign: 'center',
    },
    caption: {
      color: 'white',
    },
    secondLine: {
      textAlign: 'center',
      marginTop: -4,
    },
    fullWidth: {
      width: '100%',
    },
  });
