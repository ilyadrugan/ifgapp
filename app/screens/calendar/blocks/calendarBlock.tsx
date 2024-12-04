import React, { useState } from 'react';
import { CardContainer } from '../../../core/components/card/cardContainer';
import { IfgText } from '../../../core/components/text/ifg-text';
import gs from '../../../core/styles/global';
import { TouchableOpacity, View, StyleSheet, Text, Dimensions, Animated } from 'react-native';
import colors from '../../../core/colors/colors';
import 'react-native-gesture-handler';
import CustomCalendar from './calendar';
import { IFGScoreLine } from '../../../core/components/ifg-score/ifg-score-line';
import { IFGActivity } from '../../../core/components/ifg-score/ifg-activity';

export const CalendarBlock = () =>{

    return <CardContainer>
        <CustomCalendar />
        <IFGScoreLine score={86} title={'IFG-баллы'} />
        <IFGActivity/>
    </CardContainer>;
};

const s = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
      },
  });
