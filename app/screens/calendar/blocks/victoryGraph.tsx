import React, { FC, useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import {VictoryChart, VictoryArea, VictoryLine, VictoryScatter, VictoryTooltip, VictoryAxis} from 'victory-native';
import colors from '../../../core/colors/colors';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import gs from '../../../core/styles/global';
import { GraphDataType } from '../../../../store/state/activityGraphStore/models/models';
import dailyActivityStore from '../../../../store/state/activityGraphStore/activityGraphStore';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { useFocusEffect } from '@react-navigation/native';
import { observer } from 'mobx-react';

const width = Dimensions.get('screen').width;
const dataWeekNames = ['Вс','Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

type DotType = {
    _x: number,
    _y: number,
    x: string,
    xName: string,
    y: number | string,
}

type DotDataType = {
  x: string,
  y: number,
}
const CustomDoubleCircle = ({ x, y }) => {
  // console.log('CustomDoubleCircle', x, y);
    return (
      <Svg>
        {/* Внешний круг с прозрачностью */}
        <Circle cx={x} cy={y} r={11} fill="#D3FFE0" />
        {/* Внутренний круг для зеленой обводки */}
        <Circle cx={x} cy={y} r={5} fill={colors.GREEN_COLOR} />
        {/* Центральный белый круг */}
        <Circle cx={x} cy={y} r={3} fill="#ECFFF2" />
      </Svg>
    );
  };
const VictoryGraph: FC<{monthly?: boolean, graphData:GraphDataType[]}> = observer(({monthly, graphData}) => {
  const [selectedPoint, setSelectedPoint] = useState<DotType | null>(null);
  const [data, setData] = useState<DotDataType[]>([]);
  const [maxValue, setMaxValue] = useState<number>(0);
  const [isGraphLoading, setIsGraphLoading] = useState(false);
  const [rendered, setRendered] = useState(false);

  const convertGraphData = () => {
    return graphData.map((el, index)=>{
      return {x: monthly ? new Date(el.created_at).getDate().toString() + '.' + new Date(el.created_at).getMonth().toString() : new Date(el.created_at).getDate().toString(), y: el.value};
    });
  };

  const handlePress = (datum) => {
    setSelectedPoint(datum); // Устанавливаем выбранную точку
  };
  const customRound = (number: number) => {
    if (number >= 0 && number < 100) {
      return Math.ceil(number / 10) * 10; // Округление до ближайшего десятка
    } else if (number >= 100 && number < 1000) {
      return Math.ceil(number / 100) * 100; // Округление до ближайшей сотни
    } else if (number >= 1000 && number < 10000) {
      return Math.ceil(number / 500) * 500; // Округление до ближайших 500
    } else if (number >= 10000) {
      return Math.ceil(number / 1000) * 1000; // Округление до ближайшей тысячи
    }
    return number; // Если число меньше 0, просто возвращаем его
  };
  useEffect(() => {
    console.log('graphdata', graphData, 'monthly', monthly);
    setSelectedPoint(null);
    setRendered(false);
    if (graphData.length === 0) {return;}
    // setSelectedPoint(null);

    const  convertedData = convertGraphData();
    const convertedDataLen = convertedData.length;

    const today = new Date().getDay();
    const todayDot: DotType = {
        _x: convertedData.length,
        _y: convertedData[convertedDataLen - 1].y,
        x:  convertedData[convertedDataLen - 1].x,
        xName: convertedData[convertedDataLen - 1].x,
        y: convertedData[convertedDataLen - 1].y,
    };
    setSelectedPoint(todayDot);
    console.log('todayDot', todayDot);
    // setMaxValue(findMaxValue(convertedData));
    setData(convertedData);
    console.log();
  }, [graphData, monthly]);

  return (
    ((data.length > 0 && (data.length === 7 && !monthly) || (data.length > 0 && monthly) && !dailyActivityStore.isGraphLoading)) ? <View
    // onLayout={() => {
    //   setRendered(true);
    //   console.log('График завершил рендеринг!');
    // }}
    style={styles.container}>

       <VictoryChart
        // domainPadding={{ x: 10, y: 10 }} // Отступы для осей
        height={200}

      >
    <Defs>
      <LinearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0%" stopColor={'#D3FFE0'}/>
        <Stop offset="100%" stopColor="white"/>
     </LinearGradient>
   </Defs>
        {/* Ось X */}
        <VictoryAxis
        tickFormat={(t, index) => {
          return monthly ? (((index + 1) % 3) === 0 ? t.split('.')[0] : '') : dataWeekNames[Math.abs(new Date().getDay() - 6 + index)];}} // Показать каждую пятую метку
          style={{
            axis: { stroke: 'transparent' },
            tickLabels: {fill: '#B8B8B8', fontSize: 14, fontFamily: 'tilda-sans_medium' },
            // tickLabels: [gs.fontCaptionSmall, gs.medium,{ fill: '#B8B8B8' }],
          }}
        />
        {/* Ось Y */}
        <VictoryAxis
          dependentAxis
          tickValues={data.reduce((acc, curr) => acc.y > curr.y ? acc : curr).y === 0 ? [0, 50, 100]
             : [0, customRound(data.reduce((acc, curr) => acc.y > curr.y ? acc : curr).y) / 2, customRound(data.reduce((acc, curr) => acc.y > curr.y ? acc : curr).y)]} // Фиксированные значения
          style={{
            axis: { stroke: 'transparent' },
            grid: { stroke: '#F2EDEE' },
            tickLabels: {fill: '#B8B8B8', fontSize: 14, fontFamily: 'tilda-sans_medium' },
          }}
        />

        {/* Область под линией */}
        <VictoryArea
          data={data}
        //   interpolation="monotoneX"
          style={{
            data: {
              fill: 'url(#gradientFill)', // Используем ID градиента
              stroke: 'transparent',
            },
          }}
        />

        {/* Пунктирная линия */}
        <VictoryLine
          data={data}
        //   interpolation="monotoneX"
          style={{
            data: {
              stroke: colors.GREEN_COLOR,
              strokeWidth: 2,
              strokeDasharray: '5, 5', // Пунктирная линия
            },
          }}
        />

    {(selectedPoint) && <VictoryScatter
        data={[selectedPoint]} // Показывать только выбранную точку
        size={10}

        style={{
          data: {
            fill: '#ECFFF2',
            stroke: colors.GREEN_COLOR,
            strokeWidth: 4,
            borderColor: '#D3FFE0',
            borderWidth: 5,
          },
        }}
        dataComponent={<CustomDoubleCircle />}
        labels={({ datum }) => {
          return `${datum.y}`;
          // return `${selectedPoint ? selectedPoint._y : ''}`;
        }}
        labelComponent={
          <VictoryTooltip
            flyoutStyle={{
              stroke: '#30C376',
              fill: '#30C376',

            }}
            flyoutHeight={24}
            flyoutWidth={29}
            dx={-10}
            // dx={(datum, index) => (index>14 ? -10 : 10)}
            active
            orientation={'left'}
            style={{ fill: '#ffffff', fontSize: 14, fontFamily: 'tilda-sans_medium' }}
            pointerLength={3}
          />
          }
      />}

      {/* Событие клика для выбора точки */}
      <VictoryScatter
        data={data}
        size={20}
        style={{
          data: {
            fill: 'transparent',
            stroke: 'transparent',
          },
        }}
        events={[
          {
            target: 'data',
            eventHandlers: {
              onPress: (_, props) => {
                handlePress(props.datum);
                return [];
              },
            },
          },
        ]}
      />
      </VictoryChart>
    </View> :
    <ShimmerPlaceholder style={{borderRadius: 22}} height={200} width={width - (32 * 2)} />
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingLeft: 24,
  },
});

export default VictoryGraph;
