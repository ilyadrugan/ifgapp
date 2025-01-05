import { FC, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import colors from '../../../../core/colors/colors';
import { IfgText } from '../../../../core/components/text/ifg-text';
import gs from '../../../../core/styles/global';
import React from 'react';
import { Button } from '../../../../core/components/button/button';
import ArrowRight from '../../../../../assets/icons/arrow-right.svg';
import Benefit from '../../../../../assets/icons/benefit.svg';
import { useNavigation } from '@react-navigation/native';

export const SubscribeReg: FC = () => {
  const navigation = useNavigation<any>();

  const discounts = [
    {
      id: 0,
      name: 'Год',
      value: 76,
    },
    {
      id: 1,
      name: 'Месяц',
      value: 14,
    },
  ];
    const [onPayment, setOnPayment] = useState<boolean>(false);
    const [activeDiscount, setActiveDiscount] = useState<number>(0);

    const onChange = (id: number) => setActiveDiscount(id);
    const onSubscribe = () => setOnPayment(true);

    return <View>
      {!onPayment && <><View style={s.discounts}>
      <TouchableOpacity onPress={()=>onChange(0)} style={[s.dicountValue, activeDiscount === 0 && s.discountValueActive]} >
          <IfgText color={activeDiscount === 0 ? colors.WHITE_COLOR : colors.BLACK_COLOR}>{discounts[0].name}</IfgText>
          <View style={s.discountPercents}>
            <IfgText color={colors.BLACK_COLOR} style={gs.fontCaptionSmall}>−{discounts[0].value}%</IfgText>
          </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>onChange(1)} style={[s.dicountValue, activeDiscount === 1 && s.discountValueActive]} >
          <IfgText color={activeDiscount === 1 ? colors.WHITE_COLOR : colors.BLACK_COLOR}>{discounts[1].name}</IfgText>
          <View style={s.discountPercents}>
            <IfgText color={colors.BLACK_COLOR} style={gs.fontCaptionSmall}>−{discounts[1].value}%</IfgText>
          </View>
      </TouchableOpacity>
      </View>
      <View style={gs.mt16}/>
      <IfgText color={colors.SECONDARY_COLOR} style={gs.h2}>Подписка IFeelGood Pro</IfgText>
      <View style={gs.mt16}/>
      <View style={[gs.flexRow, gs.alignCenter]}>
        <IfgText color={colors.SECONDARY_COLOR} style={gs.h1Intro}>
          3500 ₽
        </IfgText>
        <View style={[s.discountPercentsBig, gs.ml24]}>
            <IfgText color={colors.BLACK_COLOR} style={gs.fontCaption}>
              −{discounts[activeDiscount].value}%
            </IfgText>
        </View>
      </View>
      <View style={gs.mt12}/>
        <IfgText color={colors.GRAY_COLOR2} style={[gs.fontLight, gs.lineThrough]}>
          4 800 ₽
        </IfgText>
      <View style={gs.mt4}/>
      <IfgText color={colors.GRAY_COLOR} style={gs.fontCaption3}>
      цена за месяц при оплате сразу за первый год*
      </IfgText>
      <View style={gs.mt16}/>
      <View style={[gs.flexRow, gs.alignCenter, gs.mt16]}>
        <Benefit />
        <IfgText color={colors.SECONDARY_COLOR} style={[gs.fontCaption, gs.ml16]}>
        Эксклюзивные материалы
        </IfgText>
      </View>
      <View style={[gs.flexRow, gs.alignCenter, gs.mt16]}>
        <Benefit />
        <IfgText color={colors.SECONDARY_COLOR} style={[gs.fontCaption, gs.ml16]}>
        Интервью с экспертами
        </IfgText>
      </View>
      <View style={[gs.flexRow, gs.alignCenter, gs.mt16]}>
        <Benefit />
        <IfgText color={colors.SECONDARY_COLOR} style={[gs.fontCaption, gs.ml16]}>
        Участие в конкурсах
        </IfgText>
      </View>
      <View style={s.personalRecommendation} >
        <View style={[gs.flexRow, gs.alignCenter]}>
          <View style={s.plusContainer}>
            <IfgText color={colors.GREEN_LIGHT_COLOR} style={[gs.fontBody1, gs.mt4]}>+</IfgText>
          </View>
          <View style={[gs.flexColumn, gs.ml16]}>
            <IfgText color={colors.SECONDARY_COLOR} style={[gs.fontCaption3, {width: 160}]}>
            Персональные рекомендации по ЗОЖ
            </IfgText>
            <IfgText color={colors.GRAY_COLOR} style={[gs.fontCaption3, {width: 160}]}>
            после IFG-тестирования
            </IfgText>
          </View>
        </View>
      </View>
      <View style={gs.mt16} />
      <Button style={s.buttonLogin}
                onPress={onSubscribe}
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
                    <IfgText style={gs.fontBodyMedium}>Подписаться</IfgText>
                        <ArrowRight />
                    </View>
                    <View />
                </View>

      </Button>
      </>
      }
      {onPayment && <>
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
  };

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
