import React, { useEffect, useState } from 'react';
import { CardContainer } from '../../../core/components/card/cardContainer';
import { IfgText } from '../../../core/components/text/ifg-text';
import gs from '../../../core/styles/global';
import { TabInterface, TabsMaterials } from '../../materials/components/tabs';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import colors from '../../../core/colors/colors';
import VictoryGraph from './victoryGraph';
import dailyActivityStore from '../../../../store/state/activityGraphStore/activityGraphStore';
import { observer } from 'mobx-react';
import { DailyCaloriesModel, DailyCommonModel, DailyIfgScoreModel, GraphDataType } from '../../../../store/state/activityGraphStore/models/models';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { useFocusEffect } from '@react-navigation/native';
import healthStore from '../../../../store/state/healthStore/healthStore';
const tabss: TabInterface[] = [
    {
        id: 0,
        name: 'Неделя',
    },
    {
        id: 1,
        name: 'Месяц',
    },
];
const switchs = [
    {
        id: 0,
        name: 'ifg-баллы',
    },
    {
        id: 1,
        name: 'Шаги',
    },
    {
        id: 2,
        name: 'Калории',
    },
];


export const Graphs = observer(({refresh}) =>{
    // console.log('🔄 Рендер Graphs');

    const [activeTab, setActiveTab] = useState(0);
    const [activeSwitch, setSwitch] = useState(0);
    const [graphData, setGraphData] = useState<GraphDataType[]>([]);
    useEffect(() => {
        gettingData();
    }, [refresh]);
    // useFocusEffect(
    //     React.useCallback(() => {
    //        gettingData()
    //       return () => console.log('Ушли с Graphs'); // Опционально: Cleanup при уходе со страницы
    //     }, [])
    //   );
    const gettingData = () => {
        console.log('refresh GRAPHS');
        console.log('activeTab', activeTab);
        console.log('activeSwitch', activeSwitch);
        dailyActivityStore.getIfgScoreActivity('month').then(()=>{
            if (activeTab === 0) {
                switch (activeSwitch) {
                    case 0:
                        convertToGraphDataType(dailyActivityStore.graphIfgScoreActivities.slice(-7));
                        break;
                    case 1:
                        convertToGraphDataType(healthStore.stepsData.slice(-7));
                        break;
                    case 2:
                        convertToGraphDataType(healthStore.caloriesData.slice(-7));
                        break;
                }
            }
            else {
                switch (activeSwitch) {
                    case 0:
                        convertToGraphDataType(dailyActivityStore.graphIfgScoreActivities);
                        break;
                    case 1:
                        convertToGraphDataType(healthStore.stepsData);
                        break;
                    case 2:
                        convertToGraphDataType(healthStore.caloriesData);
                        break;
                }
            }
        });
        dailyActivityStore.getGraphCaloriesActivity('month');
        dailyActivityStore.getGraphStepsActivity('month');
    };
    const convertToGraphDataType = (graphsData: DailyCommonModel[]) => {
        // console.log('convertToGraphDataType', graphsData);
        setGraphData(graphsData.map((el)=>{
            return {
                created_at: el.created_at,
                value: el.calories || el.score || el.steps || 0,
            };
        }));
        // graphsData.score?
    };

    const onSwitch = (id: number) => {
        if (id !== activeSwitch){
            if (id === 0) {convertToGraphDataType(activeTab === 0 ? dailyActivityStore.graphIfgScoreActivities.slice(-7) : dailyActivityStore.graphIfgScoreActivities);}
            if (id === 1) {convertToGraphDataType(activeTab === 0 ? healthStore.stepsData.slice(-7) : healthStore.stepsData);}
            if (id === 2) {convertToGraphDataType(activeTab === 0 ? healthStore.caloriesData.slice(-7) : healthStore.caloriesData);}
            setSwitch(id);
        }
    };

    const onTabClick = async (id: number) => {
        // console.log('dailyActivityStore.graphIfgScoreActivities', dailyActivityStore.graphIfgScoreActivities);
        // console.log('dailyActivityStore.graphIfgScoreActivities', dailyActivityStore.graphStepsActivities);
        // console.log('dailyActivityStore.graphIfgScoreActivities', dailyActivityStore.graphCaloriesActivities);
        if (id !== activeTab){
            if (activeSwitch === 0) {convertToGraphDataType(id === 0 ? dailyActivityStore.graphIfgScoreActivities.slice(-7) : dailyActivityStore.graphIfgScoreActivities);}
            if (activeSwitch === 1) {convertToGraphDataType(id === 0 ? healthStore.stepsData.slice(-7) : healthStore.stepsData);}
            if (activeSwitch === 2) {convertToGraphDataType(id === 0 ? healthStore.caloriesData.slice(-7) : healthStore.caloriesData);}
            setActiveTab(id);
        }
    };

    return <CardContainer>
        <IfgText style={[gs.fontBodyMedium, gs.bold]}>График активности</IfgText>
        <IfgText style={gs.fontCaptionSmall}>Мои результаты:</IfgText>
        <TabsMaterials activeTab={activeTab} onTabClicked={onTabClick} tabs={tabss} />
        <VictoryGraph graphData={graphData} monthly={activeTab === 1} />
        <IfgText style={gs.fontCaptionSmall}>Активность</IfgText>
        <View style={gs.flexRow}>
            {switchs.map(item => <TouchableOpacity key={item.id.toString()} onPress={()=>onSwitch(item.id)} style={[s.switch, activeSwitch === item.id && {backgroundColor: colors.GREEN_COLOR}]}>
                <IfgText color={activeSwitch === item.id ? colors.WHITE_COLOR : '#878787'} style={[gs.fontLightSmall]}>{item.name}</IfgText>
            </TouchableOpacity>)}
        </View>
        </CardContainer>;
});

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
