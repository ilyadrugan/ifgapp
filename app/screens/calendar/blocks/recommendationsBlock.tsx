import { observer } from 'mobx-react';
import React, { FC, useEffect, useRef, useState  } from 'react';
import { Animated, Dimensions, Easing, TouchableOpacity, View, StyleSheet, GestureResponderEvent } from 'react-native';
import { CardContainer } from '../../../core/components/card/cardContainer';
import PhysicalActivity18 from '../../../../assets/icons/physical-activity.svg';

import Open from '../../../../assets/icons/open-down.svg';
import Fish18 from '../../../../assets/icons/fish18.svg';
import Moon18 from '../../../../assets/icons/moon18.svg';
import Antistress18 from '../../../../assets/icons/antistress18.svg';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { PersonalRecommendationModel } from '../../../../store/state/recommendationStore/models/models';
import recommendationStore from '../../../../store/state/recommendationStore/recommendationStore';
import { categoryColors } from '../../../core/colors/categoryColors';
import colors from '../../../core/colors/colors';
import { ButtonNext } from '../../../core/components/button/button';
import { IfgText } from '../../../core/components/text/ifg-text';
import gs from '../../../core/styles/global';

import { ArticleHeader } from '../../ifg-home/components/articleHeader';
import { Image } from 'react-native';

export const RecommendationsBlock: FC = observer(() =>{
    const isFocused = useIsFocused();
    const navigation = useNavigation<any>();
    // console.log('🔄 Рендер RecommendationsBlock');
  const dropdowns = [
    'Физическая активность',
    'Питание',
    'Сон',
    'Антистресс',
    ];
    const [expandedIndexes, setExpandedIndexes] = useState(
    dropdowns.map(() => true) // Изначально все списки раскрыты
  );

  const [contentHeights, setContentHeights] = useState<number[]>(
    dropdowns.map(() => 0) // Высота контента для каждого списка
  );

  const animationValues = useRef(
    dropdowns.map(() => new Animated.Value(0)) // Изначально высота 0
  ).current;
  const scaleYValues = useRef(
    dropdowns.map(() => new Animated.Value(1))
  ).current;
  useEffect(() => {
    // Устанавливаем анимации на высоту контента при первом рендере
    contentHeights.forEach((height, index) => {
      if (height > 0) {
        animationValues[index].setValue(height); // Устанавливаем начальную высоту
      }
    });
  }, [animationValues, contentHeights]);
  const onLayoutContent = (index: number, event: any) => {
    const height = event.nativeEvent.layout.height;
    setContentHeights((prev) => {
      const newHeights = [...prev];
      newHeights[index] = height; // Сохраняем высоту контента
      return newHeights;
    });
  };

  const toggleDropdown = (index: number) => {
    const isExpanded = expandedIndexes[index];

if (isExpanded) {
  // Скрыть
  Animated.parallel([
    Animated.timing(animationValues[index], {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
    }),
    Animated.timing(scaleYValues[index], {
        toValue: -1,
        duration: 200,
        useNativeDriver: true,
    }),
]).start();

  // Обновить состояние
  setExpandedIndexes((prev) =>
    prev.map((val, i) => (i === index ? false : val))
  );
} else {
  // Показать
  Animated.parallel([
    Animated.timing(animationValues[index], {
        toValue: contentHeights[index], // Высота контента
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
     }),
     Animated.timing(scaleYValues[index], {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
    }),
    ]).start();

  // Обновить состояние
  setExpandedIndexes((prev) =>
    prev.map((val, i) => (i === index ? true : val))
  );
}
};
const onCompleted = async (rec: PersonalRecommendationModel) => {
  if (rec) {
  await recommendationStore.completeRecommendation(`${rec.id}`);
  }
 };
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
            <ButtonNext
            // disabled={recommendationStore.isCompleteLoading.isLoading}
            isLoading={recommendationStore.isCompleteLoading.isLoading && recommendationStore.isCompleteLoading.recId === rec.id} onPress={(e: GestureResponderEvent)=> {
                              e.stopPropagation();
                              onCompleted(rec);
                              }} title="Сделано" oliveTitle="+ 1 балл" />}
        </CardContainer>;
};
    return <>
                {/* Питание */}
                <CardContainer onPress={() => toggleDropdown(0)} style={{borderRadius: 12}}>
            <View style={[gs.flexRow, gs.alignCenter, {justifyContent: 'space-between'}]}
                >
                <View style={[gs.flexRow, gs.alignCenter]}>
                    <View style={[s.iconContainer, {backgroundColor: colors.GREEN_COLOR}]}>
                        <Fish18/>
                    </View>
                    <IfgText style={[gs.fontCaption, gs.bold, gs.ml12]}>Питание</IfgText>
                </View>
                <TouchableOpacity disabled
                    style={{ transform: [{ scaleY: scaleYValues[0] }] }}
                >
                    <Open />
                </TouchableOpacity>

            </View>
        </CardContainer>
        <Animated.View
              style={{ height: animationValues[0], overflow: 'hidden'}}
            >
            <View
            style={s.content}
            onLayout={(event) => onLayoutContent(0, event)}>
               {/* {(isFocused && watterStore.cupsData) ?
              <TimeToDrinkNewBlock />
            : <ShimmerPlaceholder style={{borderRadius: 22, marginTop: 16}} height={450} width={ScreenWidth - 32} />} */}
            {recommendationStore.personalRecomendationList.filter((rec)=>(rec.category === 'Питание')).map((rec)=>
            renderRecommendation(rec))}
            </View>
        </Animated.View>
        <View style={gs.mt24} />
        {/* Физическая активность */}
        <CardContainer onPress={() => toggleDropdown(1)} style={[{borderRadius: 12}]} >
            <View style={[gs.flexRow, gs.alignCenter, {justifyContent: 'space-between'}]}
                >
                <View style={[gs.flexRow, gs.alignCenter]}>
                    <View style={[s.iconContainer, {backgroundColor: colors.PINK_COLOR}]}>
                        <PhysicalActivity18/>
                    </View>
                    <IfgText style={[gs.fontCaption, gs.bold, gs.ml12]}>Физическая активность</IfgText>
                </View>
                <TouchableOpacity disabled
                    style={{ transform: [{ scaleY: scaleYValues[1] }] }}
                    >
                    <Open />
                </TouchableOpacity>

            </View>
        </CardContainer>
        <Animated.View
              style={{ height: animationValues[1], overflow: 'hidden'}}
            >
            <View
            style={s.content}
            onLayout={(event) => onLayoutContent(1, event)}>
        {recommendationStore.personalRecomendationList.filter((rec)=>rec.category === 'Физическая активность').map((rec)=>
        renderRecommendation(rec))}
        </View>
        </Animated.View>
        <View style={gs.mt24} />
        {/* Антистресс */}
        <CardContainer onPress={() => toggleDropdown(2)} style={{borderRadius: 12}}>
            <View style={[gs.flexRow, gs.alignCenter, {justifyContent: 'space-between'}]}>
                <View style={[gs.flexRow, gs.alignCenter]}>
                    <View style={[s.iconContainer, {backgroundColor: colors.OLIVE_COLOR}]}>
                        <Antistress18/>
                    </View>
                    <IfgText style={[gs.fontCaption, gs.bold, gs.ml12]}>Антистресс</IfgText>
                </View>
                <TouchableOpacity disabled
                    style={{ transform: [{ scaleY: scaleYValues[2] }] }}
                    >
                    <Open />
                </TouchableOpacity>

            </View>
        </CardContainer>
        <Animated.View
              style={{ height: animationValues[2], overflow: 'hidden'}}
            >
            <View
            style={s.content}
            onLayout={(event) => onLayoutContent(2, event)}>
        {recommendationStore.personalRecomendationList.filter((rec)=>rec.category === 'Антистресс').map((rec)=>
        renderRecommendation(rec))}
        </View>
        </Animated.View>

        <View style={gs.mt24} />
        {/* Сон */}
        <CardContainer onPress={() => toggleDropdown(3)} style={{borderRadius: 12}}>
            <View style={[gs.flexRow, gs.alignCenter, {justifyContent: 'space-between'}]}>
                <View style={[gs.flexRow, gs.alignCenter]}>
                    <View style={[s.iconContainer, {backgroundColor: colors.ORANGE_COLOR}]}>
                        <Moon18/>
                    </View>
                    <IfgText style={[gs.fontCaption, gs.bold, gs.ml12]}>Сон</IfgText>
                </View>
                <TouchableOpacity disabled
                    style={{ transform: [{ scaleY: scaleYValues[3] }] }}
                    >
                    <Open />
                </TouchableOpacity>

            </View>
        </CardContainer>
        <Animated.View
              style={{ height: animationValues[3], overflow: 'hidden'}}
            >
            <View
            style={s.content}
            onLayout={(event) => onLayoutContent(3, event)}>
        {recommendationStore.personalRecomendationList.filter((rec)=>rec.category === 'Сон').map((rec)=>
        renderRecommendation(rec))}
        </View>
        </Animated.View>
    </>;
});

const s = StyleSheet.create({
    container:{
        padding: 16,
    },
    iconContainer: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        zIndex: 99,
        elevation: 99,
        padding: 30,
    },
    stickyHeader: {
        height: 60,
        backgroundColor: 'white',
        zIndex: 10,
        justifyContent: 'center',
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5, // Для Android
      },
    content: {
        position: 'absolute', // Контент позиционируется для замера высоты
        top: 0,
        left: 0,
        right: 0,
      },
      buttonNext: {
        backgroundColor: colors.GREEN_COLOR,
        borderRadius: 16,
        paddingHorizontal: 24,
        height: 78,
        width: '100%',
      },
  });
