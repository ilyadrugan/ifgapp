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

  // const [opened, setOpened] = useState<Set<AccordionItem>>(new Set());

  // function open(item: AccordionItem) {
  //   setOpened(new Set(opened.add(item)));
  // }

  // function close(item: AccordionItem) {
  //   opened.delete(item);
  //   setOpened(new Set(opened));
  // }

  // function toggle(item: AccordionItem) {
  //   opened.has(item) ? close(item) : open(item);
  // }
  const [openedItem, setOpenedItem] = useState<AccordionItem | null>(null);

  function toggle(item: AccordionItem) {
    setOpenedItem(openedItem === item ? null : item);
  }
  return (<>
    <View>
      {items.map((x, index) =>
        <TouchableWithoutFeedback key={index.toString()} onPress={() => toggle(x)}>
          <View>
            <Item item={x} isOpened={openedItem === x} index={index}/>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  </>);
};

const Item: FC<{
  item: AccordionItem,
  isOpened: boolean,
  index: number,
}> = ({
  item,
  isOpened,
  index,
}) => {
  // const animatedHeight = useRef(new Animated.Value(0)).current;
  // const contentRef = useRef<View>(null);
  // const [contentHeight, setContentHeight] = useState(0);
  // const [isMeasured, setIsMeasured] = useState(false);

  // useEffect(() => {
  //   if (isOpened && !isMeasured) {
  //     setTimeout(() => {
  //       contentRef.current?.measure((_, __, ___, height) => {
  //         setContentHeight(height);
  //         setIsMeasured(true);
  //       });
  //     }, 0);
  //   }
  // }, [isOpened]);

  // useEffect(() => {
  //   Animated.timing(animatedHeight, {
  //     toValue: isOpened ? contentHeight : 0,
  //     duration: 300,
  //     useNativeDriver: false,
  //   }).start();
  // }, [contentHeight, isOpened]);

  return (
    <View style={[s.container, {paddingTop: index === 0 ? 0 : 12}]}>
      <View style={s.header}>
        <View style={{ flexShrink: 1 }}>
          <IfgText style={[gs.fontCaption, gs.bold]}>{item.question}</IfgText>
        </View>

            <View style={s.toggleButton}>
              <IfgText color={colors.GREEN_COLOR} style={[gs.fontBody1, {top:2}]}>{isOpened ? '−' : '+'}</IfgText>
            </View>
      </View>
      {isOpened && <View style={[s.answerContainer]}>
        <View style={s.hiddenAnswer}>
          {typeof item.answer === 'string' ? (
            <IfgText style={gs.fontCaption2}>{item.answer}</IfgText>
          ) : (
            item.answer
          )}
        </View>
      </View>}

    </View>
  );
};


const s = StyleSheet.create({
  container: {
    paddingBottom: 12,
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
  answerContainer: {
    overflow: 'hidden',
    marginTop: 12,
  },
  hiddenAnswer: {
    opacity: 1,
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
