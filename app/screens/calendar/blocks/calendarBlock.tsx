import React, { FC, useEffect, useState } from 'react';
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

export const CalendarBlock: FC<{setChoosedDate: (date: string)=>void, refresh: boolean}> = observer(({setChoosedDate, refresh}) =>{
  // console.log('🔄 Рендер CalendarBlock');
      // useFocusEffect(
      //   React.useCallback(() => {
      //       console.log('CalendarBlock');
      //       recommendationStore.getPersonalRecommendations();
      //       dailyActivityStore.getDailyTodayActivity(formatDate());
      //     return () => console.log('Ушли с CalendarBlock'); // Опционально: Cleanup при уходе со страницы
      //   }, [])
      // );
      useEffect(()=>{
        getDailyActivities();
      },[refresh]);
      const getDailyActivities = async()=> {
        if (!dailyActivityStore.dailyActivityData)
          {await dailyActivityStore.getDailyActivity(formatDate());}
        console.log('dailyActivityStore.dailyActivityData', dailyActivityStore.dailyActivityData);

      };
    return <CardContainer>
        <CustomCalendar setChoosedDate={setChoosedDate} />
        {(dailyActivityStore.isLoading || !dailyActivityStore.dailyActivityData) ? <>
          <ShimmerPlaceholder style={{borderRadius: 16}} height={145} width={width - 64} />
         </> :
         <>
         <IFGScoreLine score={dailyActivityStore.dailyActivityData ? dailyActivityStore.dailyActivityData.score.score : ifgScoreStore.todayScore} title={'ifg-баллы'} maximum={dailyActivityStore.dailyActivitySettings.ifg_scores>dailyActivityStore.dailyActivitySettings.max_ifg?dailyActivityStore.dailyActivitySettings.max_ifg:dailyActivityStore.dailyActivitySettings.ifg_scores}/>
         <IFGActivity today={formatDate() === dailyActivityStore.dailyActivityData.date} dailyActivities={dailyActivityStore.dailyActivityData}/></>
}
    </CardContainer>;
});
