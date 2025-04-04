import recommendationStore from '../../../store/state/recommendationStore/recommendationStore';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
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
import { observer } from 'mobx-react';



export const PersonalRecommendations = observer(() =>{
    const navigation = useNavigation<any>();
    const onBack = () => {
        navigation.goBack();
    };
    const onCompleted =  async (rec: PersonalRecommendationModel) => {
      if (rec) {
       await recommendationStore.completeRecommendation(`${rec.id}`);
      }
     };
     useEffect(()=>{
      recommendationStore.getPersonalRecommendations()
     },[])
    const renderRecommendation = (rec:PersonalRecommendationModel) => {
      return <CardContainer key={rec.id.toString()} style={gs.mt16}
      onPress={()=>{
        recommendationStore.readRecommendation(rec.id);
        navigation.navigate('ArticleView', {articleId: rec.article.id});}}
    
      >
      <ArticleHeader
        // isCicleBadge={!rec.is_viewed}
        isNew={!rec.is_viewed}
                  time={rec.publish_time}
                  hashTagColor={categoryColors[rec.category]}
                  hashTagText={'#' + rec.category}
                />
                <IfgText style={[gs.fontCaption, gs.bold]}>{rec.title}</IfgText>
                <View style={[gs.flexRow, gs.alignCenter]}>
                  <View style={{backgroundColor: colors.WHITE_COLOR,borderRadius: 8, borderWidth: 1, borderColor: '#F4F4F4', width: 46, height: 46, overflow: 'hidden', alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                            resizeMode="cover"
                            style={{width: 42, height: 42, borderRadius: 8}}
                            source={{uri: `https://ifeelgood.life${rec.article.media[0].full_path[2]}`}}
                            />
                  </View>
                {rec.description && <IfgText style={[gs.fontCaptionSmall, gs.ml12, {width: '80%'}]}>{rec.description}</IfgText>}
                </View>
                {rec.status === 'pending' &&
                <ButtonNext disabled={recommendationStore.isCompleteLoading.isLoading} isLoading={recommendationStore.isCompleteLoading.isLoading && recommendationStore.isCompleteLoading.recId === rec.id} onPress={async()=> await onCompleted(rec)}  title="Сделано" oliveTitle="+ 1 балл" />}
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
