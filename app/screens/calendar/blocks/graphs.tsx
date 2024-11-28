import React, { useState } from 'react';
import { CardContainer } from '../../../core/components/card/cardContainer';
import { IfgText } from '../../../core/components/text/ifg-text';
import gs from '../../../core/styles/global';
import { TabInterface, TabsMaterials } from '../../materials/components/tabs';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import colors from '../../../core/colors/colors';
import VictoryGraph from './victoryGraph';

const tabss: TabInterface[] = [
    {
        id: 0,
        name: 'Неделю',
    },
    {
        id: 1,
        name: 'Месяц',
    },
];
const switchs = [
    {
        id: 0,
        name: 'IFG баллам',
    },
    {
        id: 1,
        name: 'Шагам',
    },
    {
        id: 2,
        name: 'Калориям',
    },
];
export const Graphs = () =>{
    const [activeTab, setActiveTab] = useState(0);
    const [activeSwitch, setSwitch] = useState(0);
    const onSwitch = (id: number) => {
        setSwitch(id);
    };
    const onTabClick = (id: number) => {
        setActiveTab(id);
    };
    return <CardContainer>
        <IfgText style={[gs.fontBodyMedium, gs.bold]}>График активности</IfgText>
        <IfgText style={gs.fontCaptionSmall}>Мои результаты за последнюю:</IfgText>
        <TabsMaterials activeTab={activeTab} onTabClicked={onTabClick} tabs={tabss} />
        <VictoryGraph monthly={activeTab === 1} />
        <IfgText style={gs.fontCaptionSmall}>Активность по:</IfgText>
        <View style={gs.flexRow}>
            {switchs.map(item => <TouchableOpacity key={item.id.toString()} onPress={()=>onSwitch(item.id)} style={[s.switch, activeSwitch === item.id && {backgroundColor: colors.GREEN_COLOR}]}>
                <IfgText color={activeSwitch === item.id ? colors.WHITE_COLOR : '#878787'} style={[gs.fontLightSmall]}>{item.name}</IfgText>
            </TouchableOpacity>)}
        </View>
        </CardContainer>;
};

const s = StyleSheet.create({
    switch: {
        width: 'auto',
        backgroundColor: colors.WHITE_COLOR,
        borderRadius: 8,
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: '#E4E4E4',
        marginRight: 6,
    },
});
