import { FC, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import colors from '../../../../core/colors/colors';
import { IfgText } from '../../../../core/components/text/ifg-text';
import gs from '../../../../core/styles/global';
import React from 'react';
import { AnimatedGradientButton, Button } from '../../../../core/components/button/button';
import ArrowRight from '../../../../../assets/icons/arrow-right.svg';
import Benefit from '../../../../../assets/icons/benefit.svg';
import { useNavigation } from '@react-navigation/native';
import tariffsStore from '../../../../../store/state/tariffsStore/tariffsStore';
import { observer } from 'mobx-react';
import AnimatedArrow from '../../../../core/components/animatedArrow/animatedArrow';
import { SubscribeTariffs } from './subscribeTariffs';
import { SubscribeInputs } from './subscribeInputs';
import { SubscribeEmailConfirm } from './subscribeEmailConfirm';
import ConfirmEmailGirl from '../../../../../assets/icons/images/confirmEmailGirl.svg';

export const SubscribeReg: FC = observer(() => {
    const navigation = useNavigation<any>();

    const [onStep, setOnStep] = useState<number>(0);
    const [activeDiscount, setActiveDiscount] = useState<number>(0);

    const onNext = () => {
      setOnStep((prev)=>prev + 1);
    };
    const onBack = () => {
      setOnStep((prev)=>prev - 1);
    };
    const onChange = (id: number) => setActiveDiscount(id);

    return <View>
      {onStep === 0 &&
        <SubscribeTariffs
          activeDiscount={activeDiscount}
          onChangeDiscount={onChange}
          onNext={onNext} />}

      {onStep === 1 && <SubscribeInputs onNext={onNext} tarrif_id={tariffsStore.tariffs[activeDiscount].id} />}
      {/* {onStep === 2 && <>
        <View style={{zIndex: -1000, elevation: -20}}>
                <ConfirmEmailGirl />
            </View>
            <SubscribeEmailConfirm onNext={onNext} />
      </>} */}

      {onStep === -1 && <>
        <View
      style={{height: 400, marginBottom: 100}}
    />
        <Button style={s.buttonLogin}
                onPress={()=>navigation.replace('SuccessfulReg')}
                >
                <View style={s.buttonContent}>
                    <View style={s.buttonContentRow}>
                    <View style={[gs.flexRow, gs.alignCenter]}>
                         <IfgText color={colors.WHITE_COLOR} style={gs.fontBodyMedium}>Далее</IfgText>
                    </View>
                        <ArrowRight />
                    </View>

                    <View />
                </View>

            </Button>
      </> }
    </View>;
  });

  const s = StyleSheet.create({
    discounts: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        width: '100%',
        gap: 12,
      },
      dicountValue: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        backgroundColor: colors.WHITE_COLOR,
        alignItems:'center',
        width: '50%',
        height: 36,
        borderRadius: 8,
      },
      discountValueActive: {
        backgroundColor: colors.GREEN_COLOR,
      },
      discountPercents: {
        backgroundColor: colors.ORANGE_COLOR,
        borderRadius: 22,
        width: 48,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
      },
      discountPercentsBig: {
        backgroundColor: colors.ORANGE_COLOR,
        borderRadius: 22,
        width: 65,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
      },
      personalRecommendation: {
        borderWidth: 1,
        borderColor: colors.GREEN_LIGHT_COLOR,
        borderStyle: 'dashed',
        borderRadius: 12,
        height: 104,
        marginTop: 18,
        // alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 24,
        paddingLeft: 30,
      },
      plusContainer:{
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.GREEN_LIGHT_COLOR,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonLogin: {
        backgroundColor: colors.GREEN_COLOR,
        borderRadius: 16,
        paddingHorizontal: 24,
        height: 78,
      },
      buttonNext: {
        backgroundColor: colors.GREEN_COLOR,
        borderRadius: 16,
        paddingHorizontal: 24,
        height: 78,
        width: '86%',
      },
      buttonContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      buttonContentRow: {
        width:'100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
  });
