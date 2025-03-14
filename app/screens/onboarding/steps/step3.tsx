import {Animated, ScrollView, StyleSheet, View } from 'react-native';
import { IfgText } from '../../../core/components/text/ifg-text';
import { FC, useRef, useEffect, useState } from 'react';
import gs from '../../../core/styles/global';
import React from 'react';
import colors from '../../../core/colors/colors';

export const Step3:FC = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const [scrollable, setScrollable] = useState(false);
    useEffect(() => {
        const scrollAnimation = Animated.timing(scrollX, {
          toValue: 1400, // Конечная позиция прокрутки
          duration: 6000, // Длительность анимации (в миллисекундах)
          useNativeDriver: true,
        });
        // const scrollAnimationBack = Animated.timing(scrollX, {
        //     toValue: 0, // Конечная позиция прокрутки
        //     duration: 8000, // Длительность анимации (в миллисекундах)
        //     useNativeDriver: true,
        //   });
        scrollAnimation.start();
        scrollAnimation.start(() => {
            // scrollAnimationBack.start();
            setScrollable(true);
        });
      }, [scrollX]);

      const data = [
        {
            index: 0,
            title: 'Регулярно',
            text: 'поможем сформировать привычку заниматься своим здоровьем',
        },
        {
            index: 1,
            title: 'Системно',
            text: 'обеспечиваем комплексный подход к хорошему самочувствию',
        },
        {
            index: 2,
            title: 'Научно обосновано',
            text: 'все материалы проходят проверку на соответствие принципам доказательности',
        },
        {
            index: 3,
            title: 'Легко',
            text: 'понятным и доступным языком объясняем сложные вещи',
        },
        {
            index: 4,
            title: 'Постепенно',
            text: 'работаем с вами в комфортном темпе шаг за шагом',
        },
    ];

    return <View style={[s.container, gs.mt44]}>
            <IfgText color={colors.WHITE_COLOR} style={[gs.h1Intro, gs.ml16]}>
                Принципы платформы
            </IfgText>
            <View style={gs.mt48} />
            <Animated.ScrollView
                scrollEventThrottle={16}
                contentOffset={{ x: scrollX }}
                scrollEnabled={scrollable}
                horizontal
                contentContainerStyle={{flexGrow: 1, flexDirection: 'column', justifyContent: 'center'}}
                showsHorizontalScrollIndicator={false}

                >
                    <View style={s.line}>
                        <View style={s.dottedLine} />
                        {data.map(({index})=> <View key={index.toString()} style={[s.circle, { left: 290 * index   + 16  + 80 * index }]} />)
                        }
                    </View>
                    <View style={{flexDirection: 'row', gap:80, left: 16}} >
                        {data.map(({title, text, index})=><View key={index.toString()} style={{width: 290,height: 200}}>
                        <IfgText color={colors.WHITE_COLOR} style={[gs.h2Intro, gs.mt72]}>{title}</IfgText>
                        <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption, gs.mt16]}>{text}</IfgText>
                        </View>)}
                    </View>
                </Animated.ScrollView>

        </View>
    ;
};

const s = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems:'flex-start',
        justifyContent: 'center',
    },
    line: {
        position: 'relative',
        width: '100%',
        height: 30, // Высота полосы с точками
        justifyContent: 'center',
        alignItems: 'center',
      },
      dottedLine: {
        position: 'absolute',
        top: '50%',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: 'white',
        borderStyle: 'dashed', // пунктирная линия
        zIndex: 0,
      },
      circle: {
        position: 'absolute',
        width: 18,
        height: 18,
        borderRadius: 10, // радиус для круглой формы
        backgroundColor: 'white',
        zIndex: 1,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#D0D0D0',
      },
  });
