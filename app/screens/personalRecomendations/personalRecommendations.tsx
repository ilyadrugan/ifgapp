import { observer } from 'mobx-react';
import recommendationStore from '../../../store/state/recommendationStore/recommendationStore';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Image, FlatList, StyleSheet } from 'react-native';
import { categoryColors } from '../../core/colors/categoryColors';
import { Button, ButtonNext } from '../../core/components/button/button';
import { CardContainer } from '../../core/components/card/cardContainer';
import { IfgText } from '../../core/components/text/ifg-text';
import gs from '../../core/styles/global';
import { ArticleHeader } from '../ifg-home/components/articleHeader';
import { PersonalRecommendationModel } from '../../../store/state/recommendationStore/models/models';
import colors from '../../core/colors/colors';
import ArrowBack from '../../../assets/icons/arrow-back.svg';



export const PersonalRecommendations = observer(() =>{
    const navigation = useNavigation<any>();
    const onBack = () => {
        navigation.goBack();
    };
    const renderRecommendation = (rec:PersonalRecommendationModel) => {
        console.log('rec', rec.article.id);
        return <CardContainer style={gs.mt16} onPress={()=>navigation.navigate('ArticleView', {articleId: rec.article.id})} >
        <ArticleHeader
          // isNew
          time={'10:00'}
          hashTagColor={categoryColors[rec.category]}
          hashTagText={'#' + rec.category}
        />
        <IfgText style={[gs.fontCaption, gs.bold]}>{rec.article.title}</IfgText>
        <View style={[gs.flexRow, gs.alignCenter]}>
          <View style={{backgroundColor: colors.WHITE_COLOR,borderRadius: 10, borderWidth: 1, borderColor: '#F4F4F4', width: 49, height: 49,alignItems: 'center', justifyContent: 'center'}}>
          <Image
          resizeMode="cover"
          style={{width: 44, height: 44, borderRadius: 6}}
          source={{uri: `https://ifeelgood.life${rec.article.media[0].full_path[2]}`}}
          />
          </View>

         {rec.article.subtitle && <IfgText style={[gs.fontCaptionSmall, gs.ml12, {width: '80%'}]}>{rec.article.subtitle}</IfgText>}
        </View>
        {rec.status === 'pending' && <ButtonNext onPress={()=>navigation.navigate('ArticleView', {articleId: rec.article.id})} title="Читать статью" oliveTitle="+ 1 балл" />}

      </CardContainer>;
    };

    return  <FlatList
                style={s.container}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={ <Button style={s.buttonBack} onPress={onBack}>
                <>
                    <ArrowBack />
                    <IfgText color={colors.GRAY_COLOR3} style={gs.fontBody2}>Назад</IfgText>
                </>
                </Button>}
                ListFooterComponent={<View style={{height: 100}} />}
                data={ recommendationStore.personalRecomendationList}
                keyExtractor={(item, index)=>index.toString()}
                renderItem={({item})=>renderRecommendation(item)}
             />;
});

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
});
