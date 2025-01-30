import React, { FC, useState } from 'react';
import { CardContainer } from '../../../core/components/card/cardContainer';
import { IfgText } from '../../../core/components/text/ifg-text';
import gs from '../../../core/styles/global';
import colors from '../../../core/colors/colors';
import 'react-native-gesture-handler';
import CustomCalendar from './calendar';
import { IFGScoreLine } from '../../../core/components/ifg-score/ifg-score-line';
import { IFGActivity } from '../../../core/components/ifg-score/ifg-activity';
import ifgScoreStore from '../../../../store/state/ifgScoreStore/ifgScoreStore';
import dailyActivityStore from '../../../../store/state/activityGraphStore/activityGraphStore';
import { observer } from 'mobx-react';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import recommendationStore from '../../../../store/state/recommendationStore/recommendationStore';
import { formatDate } from '../../../core/utils/formatDateTime';
const width = Dimensions.get('screen').width;

export const CalendarBlock: FC = observer(() =>{
    useFocusEffect(
        React.useCallback(() => {
            console.log('CalendarBlock');
            recommendationStore.getPersonalRecommendations();
            dailyActivityStore.getDailyTodayActivity(formatDate());
          return () => console.log('Ушли с CalendarBlock'); // Опционально: Cleanup при уходе со страницы
        }, [])
      );
    return <CardContainer>
        <CustomCalendar />
        {!dailyActivityStore.isLoading ? <>
        <IFGScoreLine score={dailyActivityStore.dailyActivityData ? dailyActivityStore.dailyActivityData.score.score : ifgScoreStore.todayScore} title={'IFG-баллы'} />
         <IFGActivity today={false} dailyActivities={dailyActivityStore.dailyActivityData}/>
         </> :
         <ShimmerPlaceholder style={{borderRadius: 16}} height={145} width={width - 64} />}
    </CardContainer>;
});

