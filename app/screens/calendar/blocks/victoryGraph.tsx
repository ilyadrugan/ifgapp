import React, { FC, useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {VictoryChart, VictoryArea, VictoryLine, VictoryScatter, VictoryTooltip, VictoryAxis} from 'victory-native';
import colors from '../../../core/colors/colors';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import gs from '../../../core/styles/global';

const dataWeeks = [
  { x: 'Пн', y: 20 },
  { x: 'Вт', y: 40 },
  { x: 'Ср', y: 30 },
  { x: 'Чт', y: 60 },
  { x: 'Пт', y: 78 }, // Выделенная точка
  { x: 'Сб', y: 50 },
  { x: 'Вс', y: 30 },
];
const dataMonths = [
    { x: '1', y: 20 },
    { x: '2', y: 40 },
    { x: '3', y: 30 },
    { x: '4', y: 60 },
    { x: '5', y: 78 }, // Выделенная точка
    { x: '6', y: 50 },
    { x: '7', y: 30 },
    { x: '8', y: 78 }, // Выделенная точка
    { x: '9', y: 50 },
    { x: '10', y: 30 },
    { x: '11', y: 78 }, // Выделенная точка
    { x: '12', y: 50 },
    { x: '13', y: 20 },
    { x: '14', y: 40 },
    { x: '15', y: 30 },
    { x: '16', y: 60 },
    { x: '17', y: 78 }, // Выделенная точка
    { x: '18', y: 50 },
    { x: '19', y: 30 },
    { x: '20', y: 78 }, // Выделенная точка
    { x: '21', y: 50 },
    { x: '22', y: 30 },
    { x: '23', y: 78 }, // Выделенная точка
    { x: '24', y: 50 },
    { x: '25', y: 50 },
    { x: '26', y: 30 },
    { x: '27', y: 78 }, // Выделенная точка
    { x: '28', y: 50 },
    { x: '29', y: 30 },
    { x: '30', y: 78 }, // Выделенная точка
  ];
type DotType = {
    _x: number,
    _y: number,
    x: string,
    xName: string,
    y: number | string,
}
const CustomDoubleCircle = ({ x, y }) => {
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
const VictoryGraph: FC<{monthly?: boolean}> = ({monthly}) => {
  const [selectedPoint, setSelectedPoint] = useState<DotType>();
  const [data, setData] = useState(monthly ? dataMonths : dataWeeks);

  const handlePress = (datum) => {
    console.log(datum);
    setSelectedPoint(datum); // Устанавливаем выбранную точку
  };

  useEffect(() => {
    // const today = new Date().getDay() === 0 ? 8 : new Date().getDay();
    const today = new Date().getDay();
    const todayDot: DotType = {
        _x: today === 0 ? 7 : today,
        _y: dataWeeks[today - 1].y,
        x:  dataWeeks[today - 1].x,
        xName: dataWeeks[today - 1].x,
        y: dataWeeks[today - 1].y,
    };
    setSelectedPoint(todayDot);
  }, []);

  return (
    <View style={styles.container}>

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
          style={{
            axis: { stroke: 'transparent' },
            tickLabels: {fill: '#B8B8B8', fontSize: 14, fontFamily: 'tilda-sans_medium' },
            // tickLabels: [gs.fontCaptionSmall, gs.medium,{ fill: '#B8B8B8' }],
          }}
        />
        {/* Ось Y */}
        <VictoryAxis
          dependentAxis
          tickValues={[0, 50, 100]} // Фиксированные значения
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

    <VictoryScatter
        data={selectedPoint ? [selectedPoint] : []} // Показывать только выбранную точку
        size={8}
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
        labels={({ datum }) => `${datum.y}`}
        labelComponent={
          <VictoryTooltip
            flyoutStyle={{
              stroke: '#30C376',
              fill: '#30C376',

            }}
            flyoutHeight={24}
            flyoutWidth={29}
            dx={-10}
            active
            orientation={'left'}
            style={{ fill: '#ffffff', fontSize: 14, fontFamily: 'tilda-sans_medium' }}
            pointerLength={3}
          />
          }
      />

      {/* Событие клика для выбора точки */}
      <VictoryScatter
        data={data}
        size={10}
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
    </View>
  );
};

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
