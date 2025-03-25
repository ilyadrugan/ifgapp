import React, { FC, useState } from 'react';
import colors from '../../../../core/colors/colors';
import { observer } from 'mobx-react';
import { StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import tariffsStore from '../../../../../store/state/tariffsStore/tariffsStore';
import { IfgText } from '../../../../core/components/text/ifg-text';
import gs from '../../../../core/styles/global';
import Benefit from '../../../../../assets/icons/benefit.svg';
import { AnimatedGradientButton, Button } from '../../../../core/components/button/button';
import AnimatedArrow from '../../../../core/components/animatedArrow/animatedArrow';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '../../../../core/components/input/input';
import authStore from '../../../../../store/state/authStore/authStore';
import Arrow from '../../../../../assets/icons/arrow-right.svg';
import couponStore from '../../../../../store/state/couponStore/couponStore';

export const SubscribeTariffs:
    FC<{
        activeDiscount: number,
        onChangeDiscount: (id:number)=> void,
        onNext: ()=> void,
    }> = observer(({activeDiscount, onChangeDiscount, onNext}) => {
      const [isLoading, setIsLoading] = useState(false);
      const {
              control,
              handleSubmit,
              setValue,
              formState: { errors },
            } = useForm<{coupon: string}>();
     const onSubmitCoupon = handleSubmit(async (data) => {
      setIsLoading(true);
      console.log(data.coupon, activeDiscount + 1);
      if (data.coupon){
        await couponStore.checkCoupon({
          code: data.coupon.trim(),
          tariff_id: activeDiscount + 1,
        });
      }
      setIsLoading(false);
      });
    return tariffsStore.tariffs.length > 0 && <><View style={s.discounts}>
      <TouchableOpacity onPress={()=>onChangeDiscount(0)} style={[s.dicountValue, activeDiscount === 0 && s.discountValueActive]} >
          <IfgText color={activeDiscount === 0 ? colors.WHITE_COLOR : colors.BLACK_COLOR}>{tariffsStore.tariffs[0].title}</IfgText>
          <View style={s.discountPercents}>
            <IfgText color={colors.BLACK_COLOR} style={gs.fontCaptionSmall}>-{ Math.round((tariffsStore.tariffs[0].price - tariffsStore.tariffs[0].price_discount) / tariffsStore.tariffs[0].price * 100)}%</IfgText>
          </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>onChangeDiscount(1)} style={[s.dicountValue, activeDiscount === 1 && s.discountValueActive]} >
          <IfgText color={activeDiscount === 1 ? colors.WHITE_COLOR : colors.BLACK_COLOR}>{tariffsStore.tariffs[1].title}</IfgText>
          {tariffsStore.tariffs[1].price_discount &&
              <View style={s.discountPercents}>
                <IfgText color={colors.BLACK_COLOR} style={gs.fontCaptionSmall}>-{(tariffsStore.tariffs[1].price - tariffsStore.tariffs[1].price_discount) / tariffsStore.tariffs[1].price * 100 }%</IfgText>
              </View>}
      </TouchableOpacity>
      </View>
      <View style={gs.mt16}/>
      <IfgText color={colors.SECONDARY_COLOR} style={gs.h2}>Подписка ifeelgood Pro</IfgText>
      <View style={gs.mt16}/>
      <View style={[gs.flexRow, gs.alignCenter]}>
        <IfgText color={colors.SECONDARY_COLOR} style={gs.h1Intro}>
        {couponStore.couponData[activeDiscount] !== null ?
        (tariffsStore.tariffs[activeDiscount].period === 'year') ?
        Math.round(Math.floor(tariffsStore.tariffs[activeDiscount].price_discount) * 12 / 100) * 100 - 1 - (tariffsStore.tariffs[activeDiscount].price - couponStore.couponData[activeDiscount].discounted_price)
        :
        couponStore.couponData[activeDiscount].discounted_price
        : (tariffsStore.tariffs[activeDiscount].period === 'year') ? Math.round(Math.floor(tariffsStore.tariffs[activeDiscount].price_discount) * 12 / 100) * 100 - 1 : Math.floor(tariffsStore.tariffs[activeDiscount].price_discount) || tariffsStore.tariffs[activeDiscount].price} {`₽${tariffsStore.tariffs[activeDiscount].period === 'year' ? '/год' : '/мес.'}`}
        </IfgText>
        {tariffsStore.tariffs[activeDiscount].description && <View style={[s.discountPercentsBig, gs.ml24]}>
            <IfgText color={colors.BLACK_COLOR} style={gs.fontCaption}>
            -{ Math.round((tariffsStore.tariffs[0].price - tariffsStore.tariffs[0].price_discount) / tariffsStore.tariffs[0].price * 100)}%
            </IfgText>
        </View>}
      </View>
      <View style={gs.mt12}/>
      {couponStore.couponData[activeDiscount] !== null ?
      <IfgText color={colors.GRAY_COLOR2} style={[gs.fontLight, gs.lineThrough]}>
      {tariffsStore.tariffs[activeDiscount].period === 'year' ?
      `${Math.round(Math.floor(tariffsStore.tariffs[activeDiscount].price) * 12 / 100) * 100 - 1} ₽` :
      `${tariffsStore.tariffs[activeDiscount].price} ₽`}
      </IfgText>
      : tariffsStore.tariffs[activeDiscount].price_discount ? <IfgText color={colors.GRAY_COLOR2} style={[gs.fontLight, gs.lineThrough]}>
                {Math.round(Math.floor(tariffsStore.tariffs[activeDiscount].price) * 12 / 100) * 100 - 1} ₽
            </IfgText> : null}
      <View style={gs.mt4}/>
      {tariffsStore.tariffs[activeDiscount].description && <IfgText color={colors.SECONDARY_COLOR} style={gs.fontLightSmall}>{tariffsStore.tariffs[activeDiscount].description}</IfgText>}
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
      <View>

      <View style={gs.mt16} />
      <Controller control={control} name={'coupon'}
                 render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                fullWidth
                value={value}
                onChange={onChange}
                placeholder="Промокод"
                // keyboardType="email-address"
                style={[gs.fontCaption, s.promocodeForm, {justifyContent: 'space-between', flexDirection: 'row'}]}
                // error={authStore.registerByPromocode.emailInputError }
                // onFocus={()=>authStore.clearRegisterByPromocodeInputError('email')}
              >
                <Button disabled={isLoading} onPress={onSubmitCoupon} style={{borderRadius: 12, position: 'absolute', right: 12, width: 54, height: 54, backgroundColor: colors.GREEN_COLOR, justifyContent:'center', alignItems: 'center'}}>
                {isLoading ? <ActivityIndicator /> : <Arrow />}
                </Button>
              </Input>
               )} />
      {/* <Input
                // fullWidth
                //  value={value}
                //  onChange={onChange}
                placeholder="Купон"
                style={[gs.fontCaption, s.promocodeForm, {justifyContent: 'space-between', flexDirection: 'row'}]}
            >
              <Button style={{borderRadius: 12,width: 54, height: 54,right: 54 + 12, backgroundColor: colors.GREEN_COLOR, justifyContent:'center', alignItems: 'center'}}>
              <Arrow />
        </Button>

      </Input> */}
      </View>
      <View style={gs.mt16} />
      <AnimatedGradientButton style={s.buttonLogin}
                onPress={onNext}
                >
                <View style={s.buttonContent}>
                    <View style={s.buttonContentRow}>
                    <IfgText color={colors.WHITE_COLOR} style={gs.fontBodyMedium}>Подписаться</IfgText>
                        <AnimatedArrow />
                    </View>
                    <View />
                </View>

      </AnimatedGradientButton></>;
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
    promocodeForm: {
              color: colors.BLACK_COLOR,
              backgroundColor: 'transparent',
              borderColor: colors.GREEN_LIGHT_COLOR,
              borderStyle: 'dashed',
              paddingRight: 70,
    },
  });
