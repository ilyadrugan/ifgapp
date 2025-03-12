import React, { FC, useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Image, Animated, RefreshControl } from 'react-native';
import colors from '../../core/colors/colors';
import gs from '../../core/styles/global';
import { Graphs } from './blocks/graphs';
import { IfgText } from '../../core/components/text/ifg-text';
import { CalendarBlock } from './blocks/calendarBlock';
import WeekCalendar from './blocks/weekCalendar';
import { CardContainer } from '../../core/components/card/cardContainer';
import Open from '../../../assets/icons/open-down.svg';
import { TimeToDrinkBlock } from '../ifg-home/blocks/timeToDrink';
import { ArticleHeader } from '../ifg-home/components/articleHeader';
import { AnimatedGradientButton, ButtonNext } from '../../core/components/button/button';
import Fish18 from '../../../assets/icons/fish18.svg';
import Moon18 from '../../../assets/icons/moon18.svg';
import Antistress18 from '../../../assets/icons/antistress18.svg';
import PhysicalActivity18 from '../../../assets/icons/physical-activity.svg';
import { ShadowGradient } from '../../core/components/gradient/shadow-gradient';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import testingStore from '../../../store/state/testingStore/testingStore';
import { observer } from 'mobx-react';
import recommendationStore from '../../../store/state/recommendationStore/recommendationStore';
import { PersonalRecommendationModel } from '../../../store/state/recommendationStore/models/models';
import { categoryColors } from '../../core/colors/categoryColors';
import dailyActivityStore from '../../../store/state/activityGraphStore/activityGraphStore';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { ScreenWidth } from '../../hooks/useDimensions';
import { formatDate } from '../../core/utils/formatDateTime';
import { Easing } from 'react-native-reanimated';
import AnimatedArrow from '../../core/components/animatedArrow/animatedArrow';
import ifgScoreStore from '../../../store/state/ifgScoreStore/ifgScoreStore';
import { RecommendationCategoryToEng } from '../../core/utils/recommendationFormatter';
import { TimeToDrinkNewBlock } from '../ifg-home/blocks/timeToDrinkNew';
import watterStore from '../../../store/state/watterStore/watterStore';
import { RecommendationBlock } from '../ifg-home/blocks/recommendationBlock';
import { RecommendationsBlock } from './blocks/recommendationsBlock';

export const CalendarScreen = () =>{
  // console.log('🔄 Рендер CalendarScreen');
    const [refreshing, setRefreshing] = useState(false);
    const [choosedDate, setChoosedDate] = useState(formatDate());

    const navigation = useNavigation<any>();

      const onRefresh = async () => {
        if (refreshing) {return;}
        setRefreshing((prev)=>!prev);
        // await recommendationStore.getPersonalRecommendations();
        console.log('refresh', choosedDate);
        await dailyActivityStore.getDailyTodayActivity(choosedDate);
        await dailyActivityStore.getDailyActivity(choosedDate);
        setRefreshing((prev)=>!prev);
      };

    return <>
    <ScrollView style={s.container}
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >

        <View style={gs.mt16} />
        <IfgText style={[gs.h2, gs.bold]} >{'Календарь'}</IfgText>
        {/* {(watterStore.cupsData) ?
              <TimeToDrinkNewBlock />
            : <ShimmerPlaceholder style={{borderRadius: 22}} height={450} width={ScreenWidth - 32} />} */}
        <View style={gs.mt16} />
        <Graphs refresh={refreshing}/>
        <View style={gs.mt24} />
        <IfgText style={[gs.fontBodyMedium, gs.bold]}>План по дням</IfgText>
        <View style={gs.mt12} />
        <IfgText style={[gs.fontCaptionSmall]}>Предстоящие и прошедшие рекомендации</IfgText>
        <View style={gs.mt16} />
        <CalendarBlock setChoosedDate={setChoosedDate} refresh={refreshing}/>
        {(watterStore.cupsData) ?
              <TimeToDrinkNewBlock />
            : <ShimmerPlaceholder style={{borderRadius: 22, marginTop: 16}} height={450} width={ScreenWidth - 32} />}
                <View style={gs.mt24} />
                <RecommendationsBlock />

        <View style={{height: 200}} />
    </ScrollView>
    <View style={s.footer}>
        <AnimatedGradientButton style={s.buttonNext}
                onPress={()=>navigation.navigate('IndividualProgramm')}
                >
                <View style={gs.buttonContent}>
                    <View style={gs.buttonContentRow}>
                    <IfgText color={colors.WHITE_COLOR} style={[gs.fontBodyMedium]}>{'Моя программа'}</IfgText>
                       <AnimatedArrow />
                    </View>
                    <View />
                </View>

      </AnimatedGradientButton>
    </View>
    <ShadowGradient opacity={0.3} />
    </>;
};

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
