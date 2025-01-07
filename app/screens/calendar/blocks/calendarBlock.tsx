import React, { useState } from 'react';
import { CardContainer } from '../../../core/components/card/cardContainer';
import { IfgText } from '../../../core/components/text/ifg-text';
import gs from '../../../core/styles/global';
import colors from '../../../core/colors/colors';
import 'react-native-gesture-handler';
import CustomCalendar from './calendar';
import { IFGScoreLine } from '../../../core/components/ifg-score/ifg-score-line';
import { IFGActivity } from '../../../core/components/ifg-score/ifg-activity';
import ifgScoreStore from '../../../../store/state/ifgScoreStore/ifgScoreStore';

export const CalendarBlock = () =>{

    return <CardContainer>
        <CustomCalendar />
        <IFGScoreLine score={ifgScoreStore.todayScore} title={'IFG-баллы'} />
        {/* <IFGActivity/> */}
    </CardContainer>;
};

