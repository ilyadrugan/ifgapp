import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, View, Image, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, FlatList, ActivityIndicator } from 'react-native';
import { Button, ButtonTo } from '../../core/components/button/button';
import { useNavigation } from '@react-navigation/native';
import colors from '../../core/colors/colors';
import { CardContainer } from '../../core/components/card/cardContainer';
import { IfgText } from '../../core/components/text/ifg-text';
import gs from '../../core/styles/global';
import { ContestType } from './models/models';
import ArrowBack from '../../../assets/icons/arrow-back.svg';
import Winner from '../../../assets/icons/winner.svg';
import { dataContests } from './contests';
import { FeedBack } from './components/feedback';
import ArrowRightBlack from '../../../assets/icons/arrow-right-black.svg';
import presentsStore from '../../../store/state/presentsStore/presentsStore';
import { PresentModel, WinnerModel } from '../../../store/state/presentsStore/models/models';
import { stripHtmlTags } from '../../core/utils/stripHtmlTags';
import { observer } from 'mobx-react';


export const ContestView = observer(({route}) => {
    const navigation = useNavigation<any>();
    const onBack = () => {
      presentsStore.clearCurrentPresent();
      navigation.goBack();

    };
    const { contestId } = route.params;
    useEffect(() => {
      if (contestId !== undefined) {loadPresentById(); console.log('presentsStore.currentPresent',contestId);}
    }, [contestId]);

    const loadPresentById = async () => await presentsStore.getPresentViewById(contestId);

    return <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}><>
    {presentsStore.isLoading && <View style={{justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <ActivityIndicator size={'large'} animating/>
      </View>}
      { presentsStore.currentPresent.id !== 0 && <ScrollView
      style={s.container}>
        <Button style={s.buttonBack} onPress={onBack}>
            <>
                <ArrowBack />
                <IfgText color={colors.GRAY_COLOR3} style={gs.fontBody2}>Назад</IfgText>
            </>
        </Button>
        <View style={gs.mt16} />
        <IfgText style={[gs.h2, gs.bold]}>{presentsStore.currentPresent?.title}</IfgText>
        {presentsStore.currentPresent.winners && <>
        <View style={gs.mt16} />
        <CardContainer>
            <IfgText style={[gs.fontCaption, gs.bold]}>
            Победители конкурса
            </IfgText>
            {presentsStore.currentPresent.winners?.map((winner: WinnerModel)=>
            <CardContainer style={s.winnerCard}>
                <Winner />
                <IfgText style={[gs.fontCaption2, gs.medium, gs.ml16]}>{winner.name}</IfgText>
            </CardContainer>)}

        </CardContainer>
        </>}
        <View style={gs.mt24} />
        {presentsStore.currentPresent.media.length > 0 && <ImageBackground
            style={[s.cardGradientContainer]}
            source={require('../../../assets/backgrounds/gradientCard5.png')}
             >
            <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaptionMedium, gs.bold]}>{stripHtmlTags(presentsStore.currentPresent.mintext)}</IfgText>
            {/* <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaptionSmall]}>Участвуйте в конкурсе, и победителям мы отправим подарки.</IfgText> */}
             <Image
                style={{alignSelf: 'center', height: 300, width: '100%'}}
                source={{uri: `https://ifeelgood.life${presentsStore.currentPresent.media[0].full_path[0]}`}}
            />
        </ImageBackground>}
        <View style={gs.mt24} />
        <CardContainer>
            <IfgText style={[gs.fontCaption, gs.bold]}>Описание приза</IfgText>
            <IfgText style={gs.fontCaption2}>{stripHtmlTags(presentsStore.currentPresent.subtitle)}</IfgText>
        </CardContainer>
        <View style={gs.mt24} />
        <CardContainer>
            <IfgText style={[gs.fontCaption, gs.bold]}>Описание конкурса</IfgText>
            <IfgText style={gs.fontCaption2}>{stripHtmlTags(presentsStore.currentPresent.desc)}</IfgText>
        </CardContainer>
        <View style={gs.mt24}/>
        <FeedBack />

        <View style={gs.mt24} />
          <View style={[gs.flexRow, {justifyContent: 'space-between', alignItems: 'center'}]}>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontBodyMedium, gs.bold]}>Конкурсы</IfgText>
            <ButtonTo onPress={onBack} title="Все конкурсы" />
          </View>
        <View style={gs.mt24}/>
        <FlatList
                horizontal
                style={{marginHorizontal: -16}}
                contentContainerStyle={{flexGrow: 1, flexDirection: 'row'}}
                showsHorizontalScrollIndicator={false}
                data={presentsStore.presentsList.presents.filter((item)=>item.id !== presentsStore.currentPresent.id)}
                renderItem={({item, index})=>{
               return <CardContainer style={[{width: 190, height: 236, padding:14, borderWidth: 1, borderColor: '#E7E7E7', justifyContent: 'space-between' }, gs.mr12, index === 0 && gs.ml16 ]} >
                    <IfgText numberOfLines={2} style={[gs.fontCaption2, gs.bold]}>{item.title}</IfgText>
                    <Image resizeMode="contain"  source={{uri: `https://ifeelgood.life${item.media[0].full_path[1]}`}}
                    style={{ height: 114, width: '100%' }}
                    />
                <Button onPress={()=>navigation.replace('ContestView', {contestId: item.id})} fullWidth style={[gs.flexRow, gs.alignCenter,{paddingHorizontal: 12, height: 30,borderWidth: 0.75, borderRadius: 6, borderColor: '#E6E6E6', justifyContent: 'space-between' }]}>
                  <>
                  <IfgText style={gs.fontBody2}>{item.deleted_at ? 'Как получить приз' : 'К результатам'}</IfgText>
                  <View style={{marginTop:2}}>
                    <ArrowRightBlack width={12} />
                  </View>
                  </>

                </Button>
            </CardContainer>;}}
        />
        <View style={{height: 100}} />
    </ScrollView>}</>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>;});

const s = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        padding: 16,
    },
    cardGradientContainer:{
        flex: 1,
        padding: 16,
        flexDirection: 'column',
        gap: 10,
        overflow: 'hidden',
        borderRadius: 22,
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
      winnerCard: {
        borderRadius: 12,
        backgroundColor: colors.BLUE_COLOR,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 0,
      },
});
