import React, { useEffect, useRef, useState } from 'react';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { ScrollView, Platform, View, StyleSheet, Image, FlatList, ActivityIndicator, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../../core/colors/colors';
import { IfgText } from '../../core/components/text/ifg-text';
import gs from '../../core/styles/global';
import { Button } from '../../core/components/button/button';
import ArrowBack from '../../../assets/icons/arrow-back.svg';
import { CardContainer } from '../../core/components/card/cardContainer';
import { observer } from 'mobx-react';
import { princips, qualities, sourceList } from './consts';
import CheckIcon from './icons/check-dashed.svg';
import LupaIcon from './icons/lupa.svg';

export const LifehackPrincipsPage = observer(({route}) => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<any>();

    const onBack = () => navigation.goBack();

    const linkTo = (link: string) => Linking.openURL(link);

    return <>

     <ScrollView
      style={s.container}>
         <Button style={[s.buttonBack, {marginTop: Platform.OS === 'ios' ? insets.top - 16 : insets.top}]} onPress={onBack}>
            <>
                <ArrowBack />
                <IfgText color={colors.GRAY_COLOR3} style={gs.fontBody2}>Назад</IfgText>
                </>
        </Button>
        <View style={gs.mt16} />
        <CardContainer>
            <IfgText style={[gs.h2Intro]}>О принципах подбора лайфхаков</IfgText>
            <IfgText style={gs.fontCaption}>Приложение ifeelgood создано для того, чтобы поддерживать пользователей на пути к здоровому образу жизни, предлагая советы и рекомендации по правильному питанию, физической активности, здоровому сну и управлению стрессом. Однако оно не может и не должно использоваться для постановки диагнозов, а также профилактики или лечения заболеваний. Другими словами, приложение ifeelgood не заменяет консультации врача и не является медицинским приложением.</IfgText>
            <IfgText style={[gs.fontCaption, gs.mt8]}>Важно! Только врач может назначить вам подходящее лечение. Принимая решения, касающиеся вашего здоровья и самочувствия, обязательно проконсультируйтесь со специалистом.</IfgText>
        </CardContainer>
        {qualities.map((item)=>
        <CardContainer style={{backgroundColor: item.bgColor, marginTop: 16}}>
            <View style={[gs.mt16, gs.alignCenter]} >
            <item.icon width={80} height={80}/>
            </View>
            <View style={gs.mt8} />
            <IfgText style={[gs.fontBody1]}>{item.title}</IfgText>
            <IfgText style={[gs.fontCaption2]}>{item.desc}</IfgText>
        </CardContainer>)}
        <View style={gs.mt16} />
        <CardContainer>
            <IfgText style={[gs.h2, gs.mb12]}>Создавая материалы для вас мы придерживаемся следующих принципов:</IfgText>
            {princips.map((item, index)=>
            <View key={index} style={{width: '100%', flexDirection: 'row', flex: 1, alignItems:'center', gap: 12}}>
                <CheckIcon />
                <IfgText style={[{ flex: 1, flexShrink: 1 }, gs.regular]}>{item.desc}</IfgText>
            </View>)}
        </CardContainer>
        <CardContainer style={{paddingBottom: 32, gap:0, backgroundColor: '#54B676', marginTop: 16}}>
            <View style={[gs.mt24, gs.alignCenter]} >
            <LupaIcon width={75} height={75} />
            </View>
            <View style={gs.mt32} />
            <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption2]}>
            {'В ходе проверки данных мы используем рекомендации международных и национальных организаций, среди которых:'}
            </IfgText>

            {sourceList.map((item, index) => (
            <IfgText key={index} color={colors.WHITE_COLOR} style={gs.fontCaption2}>
                {`${index + 1}. `}
                {`${item.title} — `}
                <IfgText onPress={() => linkTo(item.url)} color={colors.ORANGE_COLOR} style={gs.underline}>
                {`${item.url}`}
                </IfgText>
            </IfgText>
            ))}

            <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption, { marginTop: 12 }]}>
            {'Каждая рекомендация в персональном плане подтверждена исследованием. '}
                <IfgText
                    onPress={() =>navigation.navigate('ArticleView', {articleId: 384})}
                    color={colors.ORANGE_COLOR}
                    style={[gs.underline]}
                >
                    Ознакомиться со списком источников.
                </IfgText>
            </IfgText>
        </CardContainer>
      <View style={{height: 100}} />
    </ScrollView>

    </>;});

const s = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        padding: 16,
        },
    buttonBack: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        backgroundColor: 'transparent',
        borderColor: colors.BORDER_COLOR2,
        borderWidth: 0.75,
        borderRadius: 8,
        width: 84,
        height: 26,
      },
    buttonNextBack: {
        width: 60,
        height: 60,
        backgroundColor: 'transparent',
        borderWidth: 0.5,
        borderColor: 'rgba(64, 64, 64, 0.5)',
        alignItems: 'center',
    },

});
