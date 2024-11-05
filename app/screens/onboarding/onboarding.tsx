// import { useNavigation } from "@react-navigation/native";
import {   Dimensions, Image, ImageBackground, StatusBar, StyleSheet, Text, View} from 'react-native';
import { IfgText } from '../../core/components/text/ifg-text';
import gs from '../../core/styles/global';
import Carousel from 'react-native-snap-carousel';
import { Step1 } from './steps/step1';
import { Step2 } from './steps/step2';
import React, {Children, ReactNode} from 'react';
import { Button } from '../../core/components/button/button';
import ArrowRight from '../../../assets/icons/arrow-right.svg';
import colors from '../../core/colors/colors';
import { Dot } from '../../core/components/dot/dot';
import LinearGradient from 'react-native-linear-gradient';
export const Onboarding = () => {
    // const navigation = useNavigation<any>();

    const data = [
        Step1, Step2,
    ];
    // const renderItem = (children: ReactNode) => {
    //     return<>{children}</>
    // }
    return (  <>
        <StatusBar hidden={true} />
        <ImageBackground
            source={require('../../../assets/backgrounds/imageShort.png')}
            style={[s.container]} >

        <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 0.75)' ]}
            style={s.shadowGradient}
        />
        <View style={s.footer}>
            <Button style={{
                backgroundColor: colors.GREEN_COLOR,
                borderRadius: 16,
                paddingHorizontal: 24,
                height: 78,
                width: '86%',
                }}
                >
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    }}>
                    <View style={{
                        width:'100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <View style={{flexDirection: 'row', alignItems:'center'}}>
                         <IfgText style={[gs.fontBody1, { fontSize: 21}]}>Далее</IfgText>
                         <IfgText style={[gs.fontBody1, gs.ml12, { fontSize: 16, color: colors.OLIVE_COLOR } ]}>Шаг 1 из 4</IfgText>
                    </View>
                        <ArrowRight />
                    </View>

                    <View />
                </View>

            </Button>
            <View style={[gs.mt16,{flexDirection:'row', alignItems:'center', gap: 12}]}>
                <Dot active/>
                <Dot />
                <Dot />
                <Dot />
            </View>

        </View>
        {/* <View style={s.shadowContainer} /> */}

        </ImageBackground>
        {/* <View style={{position: 'absolute',  bottom: 0}}>
        <Image
            resizeMode="contain"
            style={s.phone}
            source={require('../../../assets/backgrounds/phone0.5.png')}/>
        </View> */}
    </>
    );
  };
const s = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
        flexDirection: 'column',
        alignItems:'center',
      },
    footer: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        alignItems: 'center',
        // zIndex: 9999,
    },
    // phone:{
    //     zIndex:999,
    //     width: 300,
    //     bottom: 0,
    //     // position: 'absolute',
    // },
    shadowGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 160,
        // zIndex:99,
      },
  });

