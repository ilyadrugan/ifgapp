import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';


export const ProgressBar:FC<{
    width: number,
    color: string,
    unfilledColor?: string,
  }> = ({width, color, unfilledColor}) =>
    <View style={[s.progressBarContainer, unfilledColor && {backgroundColor: unfilledColor}]}>
                  <View
                    style={[
                      s.progressBar,
                      { width: `${width}%`, backgroundColor: color },
                    ]}
                  />
     </View>;

export const ColumnarProgressBar :FC<{
    height: number,
    color: string,
    unfilledColor?: string
  }> = ({height, color, unfilledColor}) =>
    <View style={[s.progressBarColumnarContainer, unfilledColor && {backgroundColor: unfilledColor}]}>
    <View
      style={[
        s.progressBarColumnar,
        { height: `${height}%`, backgroundColor: color },
      ]}
    />
</View>;

const s = StyleSheet.create({
    progressBarContainer: {
        flex: 1,
        height: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: 6,
    },
    progressBarColumnarContainer: {
        width: 26,
        height: 62,
        justifyContent: 'flex-end',
        backgroundColor: '#F5F5F5',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        overflow: 'hidden',
    },
    progressBarColumnar: {
      height: '100%',
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
  },
});
