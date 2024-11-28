import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LineChart, Grid, YAxis, AreaChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import Svg, { Circle, Defs, G, LinearGradient, Stop, Text as SVGText } from 'react-native-svg';

const data = [0, 25, 40, 30, 58, 50, 20];

const CustomChart = () => {
  const CustomDot = ({ x, y, data }) =>
    data.map((value, index) =>
      value === Math.max(...data) ? (
        <G key={index}>
          <Circle cx={x(index)} cy={y(value)} r={6} fill="#80E3A2" />
          <Circle cx={x(index)} cy={y(value)} r={3} fill="#fff" />
          <SVGText
            x={x(index)}
            y={y(value) - 20}
            fontSize={14}
            fill="#fff"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {value}
          </SVGText>
        </G>
      ) : null
    );

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <YAxis
          data={data}
          contentInset={{ top: 10, bottom: 10 }}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          numberOfTicks={5}
          formatLabel={(value) => `${value}`}
        />

        {/* Контейнер для AreaChart и LineChart */}
        <View style={{ flex: 1, marginLeft: 10 }}>
          {/* Градиент для заливки */}
          <Svg style={StyleSheet.absoluteFill}>
    {/* Градиент для заливки */}
    <Defs>
      <LinearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0%" stopColor="#80E3A2" stopOpacity={0.3} />
        <Stop offset="100%" stopColor="#80E3A2" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>

          {/* AreaChart */}
          <AreaChart
            style={StyleSheet.absoluteFill} // Накладываем AreaChart под LineChart
            data={data}
            contentInset={{ top: 10, bottom: 10 }}
            curve={shape.curveMonotoneX}
            svg={{
               fill: 'url(#gradientFill)',
            }}
          />

          {/* LineChart */}
          <LineChart
            style={{ flex: 1 }}
            data={data}
            svg={{
              stroke: '#80E3A2',
              strokeWidth: 2,
              strokeDasharray: [4, 4], // Пунктирная линия
            }}
            contentInset={{ top: 10, bottom: 10 }}
            curve={shape.curveMonotoneX} // Плавная линия
          >
            <CustomDot />
            <Grid />
          </LineChart>
        </View>
      </View>

      {/* Ось X */}
      <View style={styles.xAxis}>
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((label, index) => (
          <Text key={index} style={styles.xAxisLabel}>
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
      },
      chartContainer: {
        flexDirection: 'row',
        height: 200,
      },
      chart: {
        flex: 1,
        marginLeft: 10,
      },
      xAxis: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
      },
      xAxisLabel: {
        fontSize: 12,
        color: 'grey',
      },
});

export default CustomChart;
