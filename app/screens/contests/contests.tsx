import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Image, ImageBackground, ActivityIndicator, RefreshControl } from 'react-native';
import { IfgText } from '../../core/components/text/ifg-text';
import gs from '../../core/styles/global';
import { CardContainer } from '../../core/components/card/cardContainer';
import colors from '../../core/colors/colors';
import { ButtonTo } from '../../core/components/button/button';
import { ContestType } from './models/models';
import presentsStore from '../../../store/state/presentsStore/presentsStore';
import { PresentModel } from '../../../store/state/presentsStore/models/models';
import { observer } from 'mobx-react';
// import { SafeAreaView } from 'react-native-safe-area-context';

export const ContestsScreen = observer(() => {
    const navigation = useNavigation<any>();
    const [refreshing, setRefreshing] = useState(false);
    useEffect(()=>{
        onLoadMore();
    },[]);
    const onLoadMore = async () => {
        await presentsStore.loadMorePresents(`page=${presentsStore.presentsList.current_page}`);
    };
    const renderItem = (item: PresentModel) => <CardContainer style={s.contestContainer} >
        <View style={{justifyContent: 'space-between', height: '100%', width: '60%'}} >
            <View>
                <IfgText style={[gs.fontCaption2, gs.bold]}>{item.title}</IfgText>
                {/* <IfgText style={[gs.fontCaption3, gs.mt12]}>{item.description}</IfgText> */}
            </View>
            <ButtonTo onPress={()=>navigation.navigate('ContestView', {contestId: item.id})}
            title={item.winners.length > 0 ? 'К результатам' : 'Как получить приз'} style={{width:item.winners.length > 0 ? 130 : 157}} />
        </View>
        <Image
            resizeMode="cover"
            source={{uri: `https://ifeelgood.life${item.media[0].full_path[3]}`}}
            style={{ width: '65%', height: '130%' ,marginTop: -16 }}
        />
       {item.winners.length > 0 && <View style={s.isOver}>
            <IfgText style={[gs.fontCaptionSmallMedium,gs.light]}>Конкурс завершен</IfgText>
        </View>}
    </CardContainer>;
    const onRefresh = async () => {
        if (refreshing) {return;}
        setRefreshing(true);
        presentsStore.clearPresents();
        await onLoadMore();
        setRefreshing(false);
    };
    return <>
      <FlatList
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            style={s.container}
            data={presentsStore.presentsList.presents}
            ListFooterComponent={<>
                <View style={gs.mt16} />
                {presentsStore.presentsList.isLoading && <ActivityIndicator animating size={'large'} />}
                <View style={{height: 100}} /></>}
            ListHeaderComponent={<>
            {/* <View style={gs.mt16} /> */}
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
                <ButtonTo onPress={()=>navigation.navigate('Материалы', {toInterViews: true})} style={[s.buttonTo, gs.mt16]} textColor={colors.WHITE_COLOR} title="Смотреть" whiteIcon/>
                </View>
                <Image resizeMode="contain" style={{width: '55%', height: '130%', marginLeft: -16, marginTop: -12}} source={require('../../../assets/backgrounds/manWithGift.png')}/>
            </ImageBackground>
            </>
            }
            renderItem={({item})=>renderItem(item)}
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.1}
                  />
      </>;});

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
