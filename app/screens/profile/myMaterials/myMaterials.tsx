import React, { FC, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { CardContainer } from '../../../core/components/card/cardContainer';
import gs from '../../../core/styles/global';
import { IfgText } from '../../../core/components/text/ifg-text';
import colors from '../../../core/colors/colors';
import { Button } from '../../../core/components/button/button';
import Star from '../../../../assets/icons/star.svg';
import articlesStore from '../../../../store/state/articlesStore/articlesStore';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';



export const MyMaterials = observer(() =>{
    const navigation = useNavigation<any>();

    useEffect(() => {

        articlesStore.articlesUserList.length === 0 && articlesStore.getUserArticles();

    }, []);
    const CardMaterial: FC<{title: string, subtitle: string, img?: string, id: number}> = ({subtitle, title, img, id}) => {
        return <CardContainer onPress={()=> navigation.navigate('ArticleView', {articleId: id})} key={title} style={{overflow: 'hidden', gap: 18,padding: 0, borderRadius: 16, borderWidth: 1, borderTopWidth: 0, borderColor: '#E7E7E7', flexDirection: 'row'}}>
                    {img ? <Image resizeMode="cover" source={{uri: img}}
                    style={{ width: 122, height: '100%' }}
                    /> :
                    <View style={{ width: 122, height: '100%', backgroundColor: 'gray' }} />
                    }
                    <View style={{paddingRight: 15,paddingVertical: 15, flexDirection: 'column'}}>
                    <IfgText numberOfLines={3} color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption2, gs.bold, {maxWidth: '75%'}]}>{title}</IfgText>
                    <IfgText numberOfLines={3} color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaptionSmall, gs.mt8, {maxWidth: '75%'}]}>{subtitle}</IfgText>
                    </View>
                <Button disabled={articlesStore.isLoading} onPress={async()=>articlesStore.changeUserArticle(id)} style={s.starButton}>
                    <Star />
                </Button>

        </CardContainer>;
    };

    return articlesStore.articlesUserList.map(({title, subtitle, id, media})=><View key={id.toString()}>
    <CardMaterial id={id} subtitle={subtitle} title={title} img={`https://ifeelgood.life${media[0].full_path[0]}`}/>
    <View style={gs.mt16} />
    </View>);
});

const s = StyleSheet.create({
    dateContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.GREEN_COLOR,
        height: 24,
        borderRadius: 6,
        paddingHorizontal: 8.5,
    },
    timeContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
        height: 22,
        borderRadius: 6,
        paddingHorizontal: 6,
        gap: 4,
    },
    buttonResult: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 'auto',
        padding: 20,
        borderWidth: 1,
        borderColor: colors.GREEN_COLOR,
        borderRadius: 16,
    },
    starButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 10,
        top: 10,
        backgroundColor: colors.WHITE_COLOR,
    },
  });
