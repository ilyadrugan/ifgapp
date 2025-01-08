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

export const CalendarBlock: FC = observer(() =>{

    return <CardContainer>
        <CustomCalendar />
        <IFGScoreLine score={dailyActivityStore.dailyActivityData.score.score} title={'IFG-баллы'} />
        {!dailyActivityStore.isLoading && <IFGActivity dailyActivities={dailyActivityStore.dailyActivityData}/>}
    </CardContainer>;
});

