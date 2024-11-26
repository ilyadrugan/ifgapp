import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, View, Image, ImageBackground } from 'react-native';
import { IfgText } from '../../core/components/text/ifg-text';
import gs from '../../core/styles/global';
import { CardContainer } from '../../core/components/card/cardContainer';
import colors from '../../core/colors/colors';
import { ButtonTo } from '../../core/components/button/button';
import { ContestType } from './models/models';
// import { SafeAreaView } from 'react-native-safe-area-context';

export const dataContests: ContestType[] = [
    {
        id: 0,
        title: '3 коврика для йоги и занятий спортом',
        description: 'C Xiaomi MiBand 8 вы сможете узнать об улучшениях своей физической формы...',
        img: require('../../../assets/backgrounds/carpet.png'),
        isOver: false,
    },
    {
        id: 1,
        title: 'Фитнес браслет',
        description: 'C Xiaomi MiBand 8 вы сможете узнать об улучшениях своей физической формы...',
        img: require('../../../assets/backgrounds/braclet.png'),
        isOver: false,
    },
    {
        id: 2,
        title: '3 коврика для йоги и занятий спортом',
        description: 'C Xiaomi MiBand 8 вы сможете узнать об улучшениях своей физической формы...',
        img: require('../../../assets/backgrounds/carpet.png'),
        isOver: false,
    },
    {
        id: 3,
        title: 'Фитнес браслет',
        description: 'C Xiaomi MiBand 8 вы сможете узнать об улучшениях своей физической формы...',
        img: require('../../../assets/backgrounds/braclet.png'),
        isOver: false,
    },
    {
        id: 4,
        title: '3 коврика для йоги и занятий спортом',
        description: 'C Xiaomi MiBand 8 вы сможете узнать об улучшениях своей физической формы...',
        img: require('../../../assets/backgrounds/carpet.png'),
        isOver: true,
        winners: ['Иван Иванов'],
    },
    {
        id: 5,
        title: 'Фитнес браслет',
        description: 'C Xiaomi MiBand 8 вы сможете узнать об улучшениях своей физической формы...',
        img: require('../../../assets/backgrounds/braclet.png'),
        isOver: true,
        winners: ['Иван Иванов', 'Иван Иванов'],
    },
];

export const ContestsScreen = () => {
    const navigation = useNavigation<any>();

    const renderItem = (item: ContestType) => <CardContainer style={s.contestContainer} >
        <View style={{justifyContent: 'space-between', height: '100%', width: '60%'}} >
            <View>
                <IfgText style={[gs.fontCaption2, gs.bold]}>{item.title}</IfgText>
                <IfgText style={[gs.fontCaption3, gs.mt12]}>{item.description}</IfgText>
            </View>
            <ButtonTo onPress={()=>navigation.navigate('ContestView', {contestId: item.id})} title="Как получить приз" style={{width: 157}} />
        </View>
        <Image
            resizeMode="contain"
            source={item.img}
            style={{ width: '65%', height: '140%', marginTop: 30 }}
        />
        {item.isOver && <View style={s.isOver}>
            <IfgText style={[gs.fontCaptionSmallMedium,gs.light]}>Конкурс завершен</IfgText>
        </View>}
    </CardContainer>;

    return <>
      <FlatList
      style={s.container}
            data={dataContests}
            ListHeaderComponent={<>
            <View style={gs.mt16} />
            <IfgText style={[gs.h2, gs.bold]} >{'Конкурсы'}</IfgText>
            <View style={gs.mt16} />
            <ImageBackground
            resizeMode="stretch"
            source={require('../../../assets/backgrounds/gradientCard4.png')}
            style={[s.cardGradientContainer]}
            >
                <View style={{width: '60%'}}>
                <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption, gs.bold]}>Призы и подарки</IfgText>
                <IfgText  color={colors.WHITE_COLOR} style={[gs.fontCaptionSmall, gs.mt12]}>В каждом интервью с экспертами разыгрываются призы! Будьте активными, выполняйте задания от экспертов и получайте призы!</IfgText>
                <ButtonTo style={[s.buttonTo, gs.mt16]} textColor={colors.WHITE_COLOR} title="Смотреть" whiteIcon/>
                </View>
                <Image resizeMode="contain" style={{width: '55%', height: '130%', marginLeft: -16, marginTop: -12}} source={require('../../../assets/backgrounds/manWithGift.png')}/>
            </ImageBackground>
            </>
            }
            renderItem={({item})=>renderItem(item)}
            ListFooterComponent={<View style={{height: 100}} />}
        />
      </>;};

const s = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        padding: 16,
    },
    hashtagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    hashtag: {
        padding: 8,
        backgroundColor: colors.WHITE_COLOR,
        borderRadius: 8,
    },
    interview: {
        width: 94,
        backgroundColor: colors.WHITE_COLOR,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    cardGradientContainer:{
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        gap: 10,
        overflow: 'hidden',
        borderRadius: 22,
      },
      buttonTo: {
        justifyContent:'space-between',
        flexDirection: 'row',
        width: 111,
        height: 26,
        borderColor: 'white',
      },
    contestContainer: {
        height: 180,
        marginTop: 16,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    isOver:{
        position: 'absolute',
        top: 24,
        right: 0,
        backgroundColor: '#FFDADA',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
});
