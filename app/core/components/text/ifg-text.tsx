import { FC, ReactNode } from 'react';
import { GestureResponderEvent, Linking, StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import colors from '../../colors/colors';
import React from 'react';
import gs from '../../styles/global';

export const IfgText: FC<{
  children: ReactNode,
  style?: StyleProp<TextStyle>,
  color?: string,
  numberOfLines?: number,
  wrap?: boolean,
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  disabled?: boolean,
}> = ({ children, style, color, numberOfLines, wrap, onPress,disabled }) => {

  return (<>
    <Text allowFontScaling={false} disabled={disabled} numberOfLines={numberOfLines} onPress={onPress} style={[s.text, wrap && s.wrap, style, {color: color || colors.PLACEHOLDER_COLOR }]}>{children}</Text>
  </>);
};

export const IfgTextWithLinks: FC<{
  children: ReactNode,
  style?: StyleProp<TextStyle>,
  color?: string,
  numberOfLines?: number,
  wrap?: boolean,
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}> = ({ children, style, color, numberOfLines, wrap, onPress }) => {

  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;

  const parts = String(children).split(urlRegex);
  return (<>
    <Text numberOfLines={numberOfLines} onPress={onPress} style={[s.text, wrap && s.wrap, style, {color: color || colors.PLACEHOLDER_COLOR }]}>
    {parts.map((part, index) => {
        if (urlRegex.test(part)) {
          // Если часть является ссылкой
          const formattedUrl = part.startsWith('http') ? part : `https://${part}`;

          return (
            <Text
              key={index}
              style={s.link}
              onPress={() => Linking.openURL(formattedUrl)}
            >
              {part}
            </Text>
          );
        }

        // Если обычный текст, просто рендерим
        return <Text allowFontScaling={false} key={index}>{part}</Text>;
      })}
    </Text>
  </>);
};

const s = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 24,
    ...gs.medium
  },
  wrap: {
    flex: 1,
    flexWrap: 'wrap',
  },
  link: {
    color: colors.GREEN_COLOR, // Цвет ссылки
    textDecorationLine: 'underline', // Подчеркивание ссылки
  },
});
