import { FC, ReactNode } from 'react';
import { GestureResponderEvent, StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

export const IfgText: FC<{
  children: ReactNode,
  style?: StyleProp<TextStyle>,
  numberOfLines?: number,
  wrap?: boolean,
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}> = ({ children, style, numberOfLines, wrap, onPress }) => {

  return (<>
    <Text numberOfLines={numberOfLines} onPress={onPress} style={[s.text, wrap && s.wrap, style]}>{children}</Text>
  </>);
};

const s = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'tilda-sans_medium',
  },
  wrap: {
    flex: 1,
    flexWrap: 'wrap',
  },
});
