import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, View, Image, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, FlatList } from 'react-native';
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


export const ContestView = ({route}) => {
    const navigation = useNavigation<any>();
    const onBack = () => navigation.goBack();
    const { contestId } = route.params;
    const [contestInfo, setContestInfo] = useState<ContestType>();
    useEffect(() => {
      if (contestId !== undefined) {setContestInfo(dataContests[contestId]);}
    }, [contestId]);


    return <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}><>
      {contestInfo && <ScrollView
      style={s.container}>
        <Button style={s.buttonBack} onPress={onBack}>
            <>
                <ArrowBack />
                <IfgText color={colors.GRAY_COLOR3} style={gs.fontBody2}>Назад</IfgText>
            </>
        </Button>
        <View style={gs.mt16} />
        <IfgText style={[gs.h2, gs.bold]}>{contestInfo?.title}</IfgText>
        {contestInfo?.isOver && <>
        <View style={gs.mt16} />
        <CardContainer>
            <IfgText style={[gs.fontCaption, gs.bold]}>
            Победители конкурса
            </IfgText>
            {contestInfo.winners?.map((winner: string)=>
            <CardContainer style={s.winnerCard}>
                <Winner />
                <IfgText style={[gs.fontCaption2, gs.medium, gs.ml16]}>{winner}</IfgText>
            </CardContainer>)}

        </CardContainer>
        </>}
        <View style={gs.mt24} />
        <ImageBackground
            style={[s.cardGradientContainer]}
            source={require('../../../assets/backgrounds/gradientCard5.png')}
             >
            <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaptionMedium, gs.bold]}>Смотрите эфир со Станиславом Александровым!</IfgText>
            <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaptionSmall]}>Участвуйте в конкурсе, и победителям мы отправим подарки.</IfgText>
            <Image
                style={{alignSelf: 'center'}}
                source={contestInfo.img}
            />
        </ImageBackground>
        <View style={gs.mt24} />
        <CardContainer>
            <IfgText style={[gs.fontCaption, gs.bold]}>Описание приза</IfgText>
            <IfgText style={gs.fontCaption2}>Коврик для йоги, занятий спортом и отдыха на природе. Закрытая пористая структура материала придаёт ему упругость и эластичность. Коврик не впитывает влагу. Материал прост в использовании: любые загрязнения легко устранить влажной салфеткой. Двухслойный коврик из экополимера обладает максимальным уровнем износостойкости. Срок службы не ограничен.</IfgText>
        </CardContainer>
        <View style={gs.mt24} />
        <CardContainer>
            <IfgText style={[gs.fontCaption, gs.bold]}>Описание конкурса</IfgText>
            <IfgText style={gs.fontCaption2}>Уважаемые участники!
            Присылайте видео с темой “Как Вы интегрировали физическую активность в свою жизнь” нам на ящик ask@ifeelgood.life и наш эксперт Станислав Александров выберет 3 лучших видео, а их авторам мы отправим подарки. Видео принимаются до 30.04.2023 включительно. Список победителей будет опубликован на этой странице до 15.05.2023</IfgText>
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
                data={dataContests}
                renderItem={({item}: ContestType)=>
                <CardContainer style={[{width: 190, height: 236, padding:14, borderWidth: 1, borderColor: '#E7E7E7', justifyContent: 'space-between' }, gs.mr12, item.id === 0 && gs.ml16 ]} >
                    <IfgText style={[gs.fontCaption2, gs.bold]}>{item.title}</IfgText>
                    <Image resizeMode="contain"  source={item.img}
                    style={{ height: 114, width: '100%' }}
                    />
                <Button onPress={()=>navigation.replace('ContestView', {contestId: item.id})} fullWidth style={[gs.flexRow, gs.alignCenter,{paddingHorizontal: 12, height: 30,borderWidth: 0.75, borderRadius: 6, borderColor: '#E6E6E6', justifyContent: 'space-between' }]}>
                  <>
                  <IfgText style={gs.fontBody2}>Как получить приз</IfgText>
                  <View style={{marginTop:2}}>
                    <ArrowRightBlack width={12} />
                  </View>
                  </>

                </Button>
            </CardContainer>}
        />
        <View style={{height: 100}} />
    </ScrollView>}</>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>;};

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
