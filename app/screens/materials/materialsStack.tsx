import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View, Image, SafeAreaView, TouchableOpacity, RefreshControl, ActivityIndicator, ImageBackground, Platform, BackHandler } from 'react-native';
import { IfgText } from '../../core/components/text/ifg-text';
import gs from '../../core/styles/global';
import { TabInterface, TabsMaterials } from './components/tabs';
import { CardContainer, HashtagContainer } from '../../core/components/card/cardContainer';
import colors from '../../core/colors/colors';
import { Button, ButtonTo } from '../../core/components/button/button';
import DropdownBlock from './components/dropdown';
import { hashTags, interViews, InterViewType, switchs } from './data/data';
import articlesStore from '../../../store/state/articlesStore/articlesStore';
import { ArticleModel, InterViewModel } from '../../../store/state/articlesStore/models/models';
import { observer } from 'mobx-react';
// import { SafeAreaView } from 'react-native-safe-area-context';
import {stripHtmlTags} from '../../core/utils/stripHtmlTags';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { ScreenWidth } from '../../hooks/useDimensions';
import { Input, TextInputWithIcon } from '../../core/components/input/input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ArrowBack from '../../../assets/icons/arrow-back.svg';

const tabss: TabInterface[] = [
    {
        id: 0,
        name: 'Статьи',
    },
    {
        id: 1,
        name: 'Интервью',
    },
];

export const MaterialsStackScreen = observer(({route}) => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<any>();
    const [activeTab, setActiveTab] = useState(0);
    const [activeSwitch, setSwitch] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const [resetParam, setResetParam] = useState(0);
    const onBack = () => {
      navigation.goBack();
    };
    const onSwitch = async (id: number) => {
        if (id === 1) {
            // await articlesStore.clearInterViews('actual');
            await articlesStore.loadMoreFinishedInterviews(articlesStore.getInterViewsQueryParamsString());
        }
        if (id === 0) {

            // await articlesStore.clearInterViews('finished');
            await articlesStore.loadMoreActualInterviews(articlesStore.getInterViewsQueryParamsString());
        }
        setSwitch(id);
    };
    const onTabClick = (id: number) => {
        // articlesStore.clearParams();
        setActiveTab(id);
    };

    useEffect(() => {
        console.log('route.params', route.params);
        // const state = navigation.getState();
        // console.log(JSON.stringify(state, null, 2));
        if (route.params){
            if (route.params.toInterViews) {
                setActiveTab(1);
            }
            if (route.params.toArticles) {
                setActiveTab(0);
            }
            if (route.params.resetParams) {
                console.log('route.params.resetParams', route.params.resetParams);
                switch (route.params.resetParams){
                    case 'articles':
                        articlesStore.clearArticleParams();
                        setResetParam(1);
                        break;
                    case 'interviews':
                        articlesStore.clearInterViewsParams();
                        break;
                }
                onRefresh();
            }
            if (route.params.tagId) {
                console.log('route.params.tagId', route.params.tagId);
                articlesStore.setArticleQueryParam('tag', route.params.tagId);
                onRefresh();
            }

        }

        articlesStore.getMaterialFilters().then((res)=>{
            // console.log('res', res);
          });
        articlesStore.getMaterialHashtags().then((res)=>{
            // console.log('res', res);
          });
        onLoadMore();
        // articlesStore.loadMoreActualInterviews().then((res)=>{
        //     console.log(res);
        // });
        console.log(`getQueryParamsString ${articlesStore.articlesQueryParams}`);
        return () => BackHandler.removeEventListener('hardwareBackPress', () => {
                    navigation.navigate(route.params.fromPage);
                    return true;
                });
    }, [route.params]);

    const renderArtcileItem:FC<{item: ArticleModel, index: number}> = ({item, index}) => {

        return <CardContainer
                onPress={()=>{
                articlesStore.readArticle(item.id);
                navigation.navigate('ArticleView', {articleId: item.id});
                }}
                key={activeTab + index + activeTab} style={s.articleCard}>
            {item.media.length > 0 ? <Image resizeMode="cover" source={{uri: `https://ifeelgood.life${item.media[0].full_path[0]}`}}
            style={{ width: '40%'}}
             /> : <View />}
            {(item.is_new) &&
            <View style={{width: 26, height: 16, alignItems:'center', justifyContent: 'center', borderBottomLeftRadius: 6, borderTopLeftRadius: 6, backgroundColor:'#FA5D5D', position: 'absolute', top: 14, left: 0.4 * (ScreenWidth - 32) - 26.5 }}>
                <IfgText color={colors.WHITE_COLOR} style={gs.fontTiny}>NEW</IfgText>
            </View>}
            <View style={{paddingRight: 15,paddingVertical: 12, flexDirection: 'column'}}>
            <IfgText numberOfLines={3} color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption2, gs.bold, {maxWidth: '75%'}]}>{item.title}</IfgText>
            <IfgText numberOfLines={3} color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaptionSmall, gs.mt8, {maxWidth: '65%'}]}>{item.subtitle}</IfgText>
                <View style={[gs.mt12]}>
                <ButtonTo onPress={()=>{
                    articlesStore.readArticle(item.id);
                    navigation.navigate('ArticleView', {articleId: item.id});
                    }}
                    style={{width: 114, height: 26}} title="Подробнее" />

                </View>
            </View>
            {(!item.is_viewed) && <View style={{width: 6, height: 6, borderRadius: 6, backgroundColor:'#FA5D5D', position: 'absolute', right: 16, bottom: 18 }}/>}

        </CardContainer>;
      };
    const renderInterviewItem:FC<{item: InterViewModel, index:number}> = ({item, index}) => {
        return <CardContainer onPress={()=>navigation.navigate('InterviewView', {interviewId: item.id})} key={activeTab + index + activeTab} style={s.interviewCard}>
                <>
            {(index % 2 === 0 && item.media.length > 0) && <Image resizeMode="cover" source={{uri: `https://ifeelgood.life${item.media[0].full_path[0]}`}}
            style={{ width: '40%', height: '100%' }}
            />}
            <View style={{flex: 1,justifyContent: 'space-between', paddingHorizontal: 15,paddingVertical: 12, flexDirection: 'column'}}>
                <View>
                <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption2, gs.bold ]}>{stripHtmlTags(item.thumb_title)}</IfgText>
                <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaptionSmall, gs.mt8   ]}>{stripHtmlTags(item.thumb_desc)}</IfgText>
                </View>
            <ButtonTo onPress={()=>navigation.navigate('InterviewView', {interviewId: item.id})} style={{width: 114, height: 26}} title="Подробнее" />
            </View>
            {(index % 2 === 1 && item.media.length > 0) && <Image resizeMode="cover" source={{uri: `https://ifeelgood.life${item.media[0].full_path[0]}`}}
            style={{ width: '40%', height: '100%' }}
            />}
</>
        </CardContainer>;
      };

    const onRefresh = async () => {
        setRefreshing(true);
        if (activeTab === 0) {
            await articlesStore.clearArticles();
            await articlesStore.loadMoreArticles(articlesStore.getArticleQueryParamsString());
        }
        // if (activeTab === 1) {
        //     await articlesStore.clearInterViews();
        //     await articlesStore.loadMoreInterviews(articlesStore.getQueryParamsString());
        // }
        // console.log(articlesStore.interViews);
        setRefreshing(false);
    };
    const onLoadMore = async () => {
        if (activeTab === 0 && articlesStore.articlesList.hasMore) {
            articlesStore.articlesQueryParams.page =  `${articlesStore.articlesList.current_page}`;
            await articlesStore.loadMoreArticles(articlesStore.getArticleQueryParamsString());
        }
        if (activeTab === 1) {
            if (activeSwitch === 0 && articlesStore.interViewsActual.hasMore) {
                articlesStore.interViewsQueryParams.page =  `${articlesStore.interViewsActual.current_page}`;
                await articlesStore.loadMoreActualInterviews(articlesStore.getInterViewsQueryParamsString());
            }
            if (activeSwitch === 1 && articlesStore.interViewsFinished.hasMore) {
                articlesStore.interViewsQueryParams.page =  `${articlesStore.interViewsFinished.current_page}`;
                await articlesStore.loadMoreFinishedInterviews(articlesStore.getInterViewsQueryParamsString());
            }
        }
    };

return <>
       <FlatList
       style={s.container}
       keyExtractor={(item, index)=>activeTab + index.toString() + activeTab}

    //    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
       ListFooterComponent={<>
       <View style={gs.mt16} />
       {(articlesStore.interViewsFinished.isLoading || articlesStore.interViewsActual.isLoading || articlesStore.articlesList.isLoading) && <ActivityIndicator animating size={'large'} />}
       <View style={{height: 140}} /></>}
       ListEmptyComponent={(!articlesStore.interViewsActual.isLoading && !articlesStore.interViewsFinished.isLoading && !articlesStore.articlesList.isLoading) &&
       <View style={[gs.mt16, {justifyContent: 'center'}]}>
        <IfgText>Ничего не найдено</IfgText>
       </View>}
       ListHeaderComponentStyle={{zIndex: 999, elevation: 999}}
       ListHeaderComponent={<>
            {/* <View style={gs.mt16} /> */}
            <Button style={[s.buttonBack, {marginTop: Platform.OS === 'ios' ? insets.top - 16 : 0}]} onPress={onBack}>
            <>
                <ArrowBack />
                <IfgText color={colors.GRAY_COLOR3} style={gs.fontBody2}>Назад</IfgText>
            </>
        </Button>
        <View style={gs.mt16} />
                    <IfgText style={[gs.h2, gs.bold, {marginTop: Platform.OS === 'ios' ? insets.top - 16 : 0}]} >{'Материалы'}</IfgText>
                <View style={gs.mt16} />
                <TabsMaterials activeTab={activeTab} onTabClicked={onTabClick} tabs={tabss} />
                {/* <View style={gs.mt16} /> */}
                {/* <TextInputWithIcon
                placeholderTextColor="rgba(55, 55, 55, 0.45)"
                placeholder={`Поиск по ${activeTab === 0 ? 'статьям' : 'интервью'}`}/> */}
                <View style={gs.mt16} />
            {(articlesStore.articleThemesList.length > 0) ?
                    <DropdownBlock defaultTheme={route.params?.tagId || null} activeSwitch={activeSwitch} activeTab={activeTab} themes={articlesStore.articleThemesList} resetParams={resetParam} setResetParams={setResetParam}/> :
                    <ShimmerPlaceholder height={200} width={ScreenWidth - 32} />
                    }
                <View style={s.hashtagsContainer}>

                {activeTab === 1 && switchs.map(item => <TouchableOpacity key={item.id.toString() + 'l'} onPress={()=>onSwitch(item.id)} style={[s.interview, activeSwitch === item.id && {backgroundColor: colors.GREEN_COLOR}]}>
                        <IfgText color={activeSwitch === item.id ? colors.WHITE_COLOR : '#878787'} style={gs.fontLightSmall}>{item.name}</IfgText>
                    </TouchableOpacity>)}

                </View>
       </>}

       data={activeTab === 0 ? articlesStore.articlesList.articles :
            activeSwitch === 0 ?
            articlesStore.interViewsActual.interviews :
            articlesStore.interViewsFinished.interviews}
       renderItem={activeTab === 0 ? renderArtcileItem : renderInterviewItem}
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
        zIndex: -100,
        elevation: -100,
    },
    hashtag: {
        padding: 8,
        backgroundColor: colors.WHITE_COLOR,
        borderRadius: 8,
    },
    interview: {
        minWidth: 94,
        backgroundColor: colors.WHITE_COLOR,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    interviewCard: {
        height: 160,
        padding: 0,
        marginTop: 16,
        overflow: 'hidden',
        gap: 0,
        borderRadius: 22,
        flexDirection: 'row',
    },
    articleCard:{
        marginTop: 16,
        overflow: 'hidden',
        gap: 18,
        padding: 0,
        borderRadius: 16,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: '#E7E7E7',
        flexDirection: 'row',
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
});
