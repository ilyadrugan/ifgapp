import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { IfgText } from '../../../core/components/text/ifg-text';
import { FC } from 'react';

const height = Dimensions.get('screen').height;

export const Step1:FC = () => {
    return <>
      <View style={[s.scrollContainer,{ zIndex: 99, elevation: 10}]}>

        <Image
            resizeMode="contain"
            style={{ width: '90%', top: -200}}
            source={require('../../../../assets/ifeelgood.png')}/>
        <Image
            resizeMode="contain"
            style={{ width: '76%', bottom: 600}}
            source={require('../../../../assets/backgrounds/phone0.5.png')}/>
        </View>
    </>;
};

const s = StyleSheet.create({
    phone:{
        width: 300,
        // bottom: 0,
        // left: 0,
        // right: 0,
        // position: 'absolute',
    },
    scrollContainer: {
        // flex: 1,
        height: height,
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginVertical: 120,
      },
  });
