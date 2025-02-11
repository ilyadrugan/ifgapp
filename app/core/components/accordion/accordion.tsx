import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import gs from '../../styles/global';
import React from 'react';
import { IfgText } from '../text/ifg-text';
import colors from '../../colors/colors';

interface AccordionProps {
  items: AccordionItem[];
}

interface AccordionItem {
  question: string;
  answer: ReactNode | string;
}

export const Accordion: FC<AccordionProps> = ({ items }) => {

  const [opened, setOpened] = useState<Set<AccordionItem>>(new Set());

  function open(item: AccordionItem) {
    setOpened(new Set(opened.add(item)));
  }

  function close(item: AccordionItem) {
    opened.delete(item);
    setOpened(new Set(opened));
  }

  function toggle(item: AccordionItem) {
    opened.has(item) ? close(item) : open(item);
  }

  return (<>
    <View>
      {items.map((x, index) =>
        <TouchableWithoutFeedback key={index.toString()} onPress={() => toggle(x)}>
          <View>
            <Item item={x} isOpened={opened.has(x)}/>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  </>);
};

const Item: FC<{
  item: AccordionItem,
  isOpened: boolean
}> = ({
  item,
  isOpened,
}) => {

  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    isOpened
      ? Animated.timing(progress, {
        duration: 200,
        toValue: 1,
        useNativeDriver: true,
      }).start()
      : Animated.timing(progress, {
        duration: 200,
        toValue: 0,
        useNativeDriver: true,
      }).start();
  }, [isOpened]);

  const interpolatedRotation = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <View style={s.container}>
      <View style={s.header}>
        <View style={{ flexShrink: 1 }}>
          <IfgText style={[gs.fontCaption, gs.bold]}>{item.question}</IfgText>
        </View>
        {/* <Animated.View style={[gs.ml16, s.button, isOpened ? s.buttonSuccess : s.buttonAdditional, {
          transform: [{
            rotate: interpolatedRotation,
          }],
        }]}> */}
            <View style={s.toggleButton}>
              <IfgText color={colors.GREEN_COLOR} style={[gs.fontBody1, {top:2}]}>{isOpened ? '−' : '+'}</IfgText>
            </View>
          {/* </Animated.View> */}
      </View>
      {isOpened &&
        <Animated.View style={[s.text]}>
          {typeof (item.answer) === 'string' ?
          <IfgText style={gs.fontCaption2}>
          {item.answer}
          </IfgText> :
          item.answer
          }
        </Animated.View>
      }
    </View>
  );
};


const s = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    marginTop: -1,
    borderColor: '#B4B4B4',
    borderStyle: 'dashed',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    height: 38,
    width: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSuccess: {
    backgroundColor: colors.GREEN_COLOR,
    borderColor: colors.GREEN_COLOR,
  },
  buttonAdditional: {
    backgroundColor: 'white',
    borderColor: colors.PLACEHOLDER_COLOR,
    borderWidth: 1,
  },
  text: {
    marginTop: 12,
  },
  toggleButton: {
              width: 36,
              height: 36,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              borderColor: colors.GREEN_LIGHT_COLOR,
              borderWidth: 1,
            },
});
