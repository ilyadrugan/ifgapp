import React, { FC } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import colors from '../../core/colors/colors';
import gs from '../../core/styles/global';
import { Graphs } from './blocks/graphs';
import { IfgText } from '../../core/components/text/ifg-text';



export const CalendarScreen = () =>{
    return <>
    <ScrollView style={s.container}>
        <View style={gs.mt16} />
        <IfgText style={[gs.h2, gs.bold]} >{'Календарь'}</IfgText>
        <View style={gs.mt16} />
        <Graphs />
    </ScrollView>
    </>;
};

const s = StyleSheet.create({
    container:{
        padding: 16,
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
  });
