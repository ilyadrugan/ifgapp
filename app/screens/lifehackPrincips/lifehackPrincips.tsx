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
import { princips, qualities } from './consts';
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
            <IfgText style={[gs.h2,gs.bold, ]}>О принципах подбора лайфхаков</IfgText>
            <IfgText style={gs.fontCaption}>Каждый материал на нашем портале отмечен специальным знаком научного качества.</IfgText>
        </CardContainer>
        {qualities.map((item)=>
        <CardContainer style={{alignItems: 'center', backgroundColor: item.bgColor, marginTop: 16}}>
            <View style={gs.mt16} />
            <item.icon width={80} height={80}/>
            <View style={gs.mt8} />
            <IfgText style={[gs.fontBody1, {textAlign: 'center'}]}>{item.title}</IfgText>
            <IfgText style={[gs.fontCaption, {textAlign: 'center'}]}>{item.desc}</IfgText>
        </CardContainer>)}
        <View style={gs.mt16} />
        <CardContainer>
            <IfgText style={[gs.h2, gs.bold, gs.mb12]}>Создавая материалы для вас мы придерживаемся следующих принципов:</IfgText>
            {princips.map((item, index)=>
            <View key={index} style={{width: '100%', flexDirection: 'row', flex: 1, alignItems:'center', gap: 12}}>
                <CheckIcon />
                <IfgText style={[{ flex: 1, flexShrink: 1 }, gs.regular]}>{item.desc}</IfgText>
            </View>)}
        </CardContainer>
        <CardContainer style={{alignItems: 'center', backgroundColor: '#54B676', marginTop: 16}}>
            <View style={gs.mt16} />
            <LupaIcon width={75} height={75} />
            <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption]}>{'Для проверки данных мы используем рекомендации '}
            <IfgText onPress={()=>linkTo('https://www.who.int')} color={colors.ORANGE_COLOR} style={gs.underline}>{'Всемирной организации здравоохранения'}</IfgText>
            {', научную базу медицинских статей '}
            <IfgText onPress={()=>linkTo('https://www.wolterskluwer.com/en/solutions/uptodate')} color={colors.ORANGE_COLOR} style={gs.underline}>{'UpToDate'}</IfgText>
            {', сайт для врачей с разборами исследований и клиническими рекомендациями '}
            <IfgText onPress={()=>linkTo('https://www.medscape.com')} color={colors.ORANGE_COLOR} style={gs.underline}>{'Medscape'}</IfgText>
            {', научную базу '}
            <IfgText onPress={()=>linkTo('https://www.ncbi.nlm.nih.gov')} color={colors.ORANGE_COLOR} style={gs.underline}>{'Национального центра биотехнологической информации США'}</IfgText>
            {' и другие ресурсы с доказательной базой.'}
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
