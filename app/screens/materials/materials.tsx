import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View, Image, SafeAreaView, TouchableOpacity, RefreshControl } from 'react-native';
import { IfgText } from '../../core/components/text/ifg-text';
import gs from '../../core/styles/global';
import { TabInterface, TabsMaterials } from './components/tabs';
import { Materials, MaterialType } from '../individualProgramm/recomendationData/recomendationData';
import { CardContainer, HashtagContainer } from '../../core/components/card/cardContainer';
import colors from '../../core/colors/colors';
import { ButtonTo } from '../../core/components/button/button';
import DropdownBlock from './components/dropdown';
import { hashTags, interViews, InterViewType, switchs } from './data/data';
import articlesStore from '../../../store/state/articlesStore/articlesStore';
import { ArticleModel } from '../../../store/state/articlesStore/models/models';
import { observer } from 'mobx-react';
// import { SafeAreaView } from 'react-native-safe-area-context';

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

export const MaterialsScreen = observer(() => {
    const navigation = useNavigation<any>();
    const [activeTab, setActiveTab] = useState(0);
    const [activeSwitch, setSwitch] = useState(0);
    const [activeHashTag, setActiveHashTag] = useState<number>();
    const [artciles, setArticles] = useState<ArticleModel[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const onSwitch = (id: number) => {
        setSwitch(id);
    };
    const onTabClick = (id: number) => {
        setActiveTab(id);
    };

    useEffect(() => {
      articlesStore.getArticles().then((res)=>{
        console.log(res);
      });
    }, []);

    const renderArtcileItem = (item: ArticleModel) => {
        return <CardContainer key={item.id.toString()} style={{marginTop: 16,overflow: 'hidden', gap: 18,padding: 0, borderRadius: 16, borderWidth: 1, borderTopWidth: 0, borderColor: '#E7E7E7', flexDirection: 'row'}}>
            <Image resizeMode="cover" source={require('../../../assets/backgrounds/material1.png')}
            style={{ width: '40%', height: '100%' }}
            />
            <View style={{paddingRight: 15,paddingVertical: 12, flexDirection: 'column'}}>
            <IfgText numberOfLines={3} color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption2, gs.bold, {maxWidth: '75%'}]}>{item.title}</IfgText>
            <IfgText numberOfLines={3} color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaptionSmall, gs.mt8, {maxWidth: '65%'}]}>{item.subtitle}</IfgText>
            <View style={gs.mt12}><ButtonTo style={{width: 114, height: 26}} title="Подробнее" /></View>
            </View>
        </CardContainer>;
      };
      const renderInterviewItem = (item: InterViewType) => {
        return <CardContainer key={item.id.toString()} style={{
            height: 160,
            padding: 0,
            marginTop: 16,
            overflow: 'hidden',
            gap: 0,
            borderRadius: 22,
            flexDirection: 'row'}}>
            {(item.id % 2) && <Image resizeMode="cover" source={item.img}
            style={{ width: '40%', height: '100%' }}
            />}
            <View style={{flex: 1,justifyContent: 'space-between', paddingHorizontal: 15,paddingVertical: 12, flexDirection: 'column'}}>
            <View>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption2, gs.bold ]}>{item.person}</IfgText>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaptionSmall, gs.mt8   ]}>{item.title}</IfgText>
            </View>
            <ButtonTo style={{width: 114, height: 26}} title="Подробнее" />
            </View>
            {!(item.id % 2) && <Image resizeMode="cover" source={item.img}
            style={{ width: '40%', height: '100%' }}
            />}

        </CardContainer>;
      };
    const onHashTag = (id: number) => {
        setActiveHashTag(id);
    };
    const onRefresh = async () => {
        setRefreshing(true);
        await articlesStore.getArticles();
        setRefreshing(false);
    };
return <>
      <ScrollView style={s.container}  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={gs.mt16} />
            <IfgText style={[gs.h2, gs.bold]} >{'Материалы'}</IfgText>
        <View style={gs.mt16} />
        <TabsMaterials activeTab={activeTab} onTabClicked={onTabClick} tabs={tabss} />
        <View style={gs.mt16} />
        <DropdownBlock themes={articlesStore.articleThemesList} />
        <View style={gs.mt16} />


        {activeTab === 0 &&
        <>
        <View style={s.hashtagsContainer}>
            {articlesStore.articleTagList.map(item => <TouchableOpacity key={item.id.toString()} onPress={()=>onHashTag(item.id)} style={[s.hashtag, activeHashTag === item.id && {backgroundColor: colors.GREEN_COLOR}]}>
                <IfgText color={activeHashTag === item.id ? colors.WHITE_COLOR : '#878787'} style={gs.fontLightSmall}>#{item.name}</IfgText>
            </TouchableOpacity>)}
        </View>
        {!articlesStore.isLoading && articlesStore.articlesList.map((item:ArticleModel)=>renderArtcileItem(item))}
        </>
        }

        {activeTab === 1 &&
        <>
        <View style={s.hashtagsContainer}>
            {switchs.map(item => <TouchableOpacity key={item.id.toString()} onPress={()=>onSwitch(item.id)} style={[s.interview, activeSwitch === item.id && {backgroundColor: colors.GREEN_COLOR}]}>
                <IfgText color={activeSwitch === item.id ? colors.WHITE_COLOR : '#878787'} style={gs.fontLightSmall}>{item.name}</IfgText>
            </TouchableOpacity>)}
        </View>
        {interViews.map(item=>renderInterviewItem(item))}
        {/* {Materials.map((item:MaterialType)=>renderItem(item))} */}
        </>
        }

        <View style={{height: 100}}/>
      </ScrollView>
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
});
