import { FC, ReactNode } from 'react';
import { GestureResponderEvent, StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import colors from '../../colors/colors';

export const IfgText: FC<{
  children: ReactNode,
  style?: StyleProp<TextStyle>,
  color?: string,
  numberOfLines?: number,
  wrap?: boolean,
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}> = ({ children, style, color, numberOfLines, wrap, onPress }) => {

  return (<>
    <Text numberOfLines={numberOfLines} onPress={onPress} style={[s.text, wrap && s.wrap, style, {color: color || colors.PLACEHOLDER_COLOR }]}>{children}</Text>
  </>);
};

const s = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'tilda-sans_medium',
  },
  wrap: {
    flex: 1,
    flexWrap: 'wrap',
  },
});
