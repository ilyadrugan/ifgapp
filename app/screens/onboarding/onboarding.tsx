// import { useNavigation } from "@react-navigation/native";
import { ImageBackground, StyleSheet, View} from 'react-native';
import { IfgText } from '../../core/components/text/ifg-text';
import gs from '../../core/styles/global';
import { Step1 } from './steps/step1';
import { Step2 } from './steps/step2';
import { Step3 } from './steps/step3';

import React, {useEffect, useState} from 'react';
import { Button } from '../../core/components/button/button';
import ArrowRight from '../../../assets/icons/arrow-right.svg';
import colors from '../../core/colors/colors';
import { Dot } from '../../core/components/dot/dot';
import LinearGradient from 'react-native-linear-gradient';
import { Step4 } from './steps/step4';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import authStore from '../../../store/state/authStore/authStore';


export const Onboarding = () => {
    const navigation = useNavigation<any>();
    const [step, setStep] = useState<number>(0);

    const nextStep = () => setStep(step + 1);
    const toLogin = () => navigation.navigate('Login');
    const toTest = () => navigation.navigate('AboutTest');
    useFocusEffect(
        React.useCallback(() => {
          if (authStore.isOnBoarded) {
            navigation.replace('Login');
          }
        }, [authStore.isOnBoarded])
      );
    return (  <>

        <ImageBackground
            source={require('../../../assets/backgrounds/imageShort.png')}
            style={[s.container]} >
        <View style={{zIndex: 99, elevation: 10}}>
            {step === 0 && <Step1 />}
            {step === 1 && <Step2 />}
            {step === 2 && <Step3 />}
            {step === 3 && <Step4 />}
        </View>
        <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 0.75)' ]}
            style={s.shadowGradient}
        />
        <View style={s.footer}>
         <Button style={s.buttonNext}
                onPress={step === 3 ? toTest : nextStep}
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
                         <IfgText color={colors.WHITE_COLOR} style={[gs.fontBody1, { fontSize: 21}]}>{step < 3 ? 'Далее' : 'Начать знакомство'}</IfgText>
                         {step < 3 && <IfgText color={colors.OLIVE_COLOR} style={[gs.fontBody1, gs.ml12, { fontSize: 16 } ]}>Шаг {step + 1} из 4</IfgText>}
                    </View>
                        <ArrowRight />
                    </View>

                    <View />
                </View>

            </Button>
            {step === 3 &&
            <Button style={[gs.mt16,s.buttonOutline]}
                onPress={toLogin}
                >
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    }}>
                    <IfgText color={colors.WHITE_COLOR} style={[gs.fontBody1, { fontSize: 21}]}>Уже есть аккаунт</IfgText>
                </View>

            </Button>}
            <View style={[gs.mt16,{flexDirection:'row', alignItems:'center', gap: 12}]}>
                <Dot active={step === 0}/>
                <Dot active={step === 1}/>
                <Dot active={step === 2}/>
                <Dot active={step === 3}/>
            </View>

        </View>

        </ImageBackground>

    </>
    );
  };
const s = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',

      },
    footer: {
        position: 'absolute',
        bottom: 55,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 9999,
        elevation: 100,
    },

    shadowGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 160,
        zIndex:99,
        elevation: 10,
      },
      buttonNext: {
        backgroundColor: colors.GREEN_COLOR,
        borderRadius: 16,
        paddingHorizontal: 24,
        height: 78,
        width: '86%',
      },
      buttonOutline: {
        backgroundColor: 'transparent',
        borderRadius: 16,
        borderColor: colors.WHITE_COLOR,
        paddingHorizontal: 24,
        height: 78,
        width: '86%',
        borderWidth: 1,
      },

  });

