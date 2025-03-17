import React, { FC, useEffect, useState } from 'react';
import { ActivityIndicator, NativeModules, StyleSheet, TouchableOpacity, View } from 'react-native';
import colors from '../../../core/colors/colors';
import { CardContainer } from '../../../core/components/card/cardContainer';
import { IfgText } from '../../../core/components/text/ifg-text';
import gs from '../../../core/styles/global';
import { Button } from '../../../core/components/button/button';
import Trash16 from '../../../../assets/icons/trash16.svg';
import Trash18 from '../../../../assets/icons/trash18.svg';
import Arrow from '../../../../assets/icons/arrow-right.svg';
import tariffsStore from '../../../../store/state/tariffsStore/tariffsStore';
import { Input } from '../../../core/components/input/input';
import { observer } from 'mobx-react';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { ScreenWidth } from '../../../hooks/useDimensions';
import paymentsStore from '../../../../store/state/paymentsStore/paymentsStore';
import { CardModel } from '../../../../store/state/paymentsStore/models/models';
import { LogoBankCard } from '../../../core/utils/bankCardsIcons';
import userStore from '../../../../store/state/userStore/userStore';
import { formatPhoneNumberToPlus } from '../../../core/utils/phoneFormatter';
import { API_URL, BASE_URL } from '../../../core/hosts';
import HttpClient from '../../../core/http-client/http-client';

const { YookassaModule } = NativeModules;

const backCardHeight = 180;


export const Subscription: FC = observer(() =>{
    const [activeDiscount, setActiveDiscount] = useState<number>(0);
    const [openYokassa, setOpenYokassa] = useState(false);
    const onChange = (id: number) => setActiveDiscount(id);
    const [isLoading, setIsLoading] = useState(false);
    const [changeFavCard, setChangeFavCard] = useState(false);

    useEffect(() => {
      tariffsStore.getTariffs();
      paymentsStore.getPaymentCards();
    }, []);

    const onAddCard = async () => {
      console.log('AddCard');
      // YookassaModule.initialize('488632','test_NDg4NjMySCwLmX4npSsAaH8af9G51xSqDU3faXWOFcw', '');
      // console.log('AddCard', YookassaModule.createCalendarEvent('hi', 'world'));
      const phone_number = formatPhoneNumberToPlus(userStore.userInfo?.phone) || '';
      YookassaModule.startTokenize(phone_number, 'Добавление карты', '', 10,async (result) => {
        console.log('Результат из нативного модуля:', result.paymentToken);

        if (result.paymentToken) {
          setIsLoading(true);
         await HttpClient.post(`${API_URL}/api/lk/payment-create`, {price: 10, token: result.paymentToken})
          .then(async (res)=>{
            console.log('payment-create data',res.data);
            if (res.data.status === 'succeeded') {
              await HttpClient.get(`${API_URL}/api/lk/card-callback`)
               .then(async(res)=>{
                console.log(res);
                await paymentsStore.getPaymentCards();
              });
            }
            else if (res.data.confirmation.confirmation_url) {
              YookassaModule.start3DSecure(res.data.confirmation.confirmation_url, async (result) => {
                console.log('res', result);
                if (result.status === 'RESULT_OK') {
                 await HttpClient.get(`${API_URL}/api/lk/card-callback`)
                 .then(async(res)=>{
                  console.log(res);
                  await paymentsStore.getPaymentCards();

                }).catch(err=>{
                  console.log(err);
                });
                }
              });
            }


          })
          .catch(err=>console.log('payment-error',err))
          .finally(async()=>{
            await paymentsStore.getPaymentCards();
            setIsLoading(false);
          });
        }

      } );

      setIsLoading(false);
      // await paymentsStore.addPaymentCard().then(()=>setOpenYokassa(prev=>!prev));
    };

    const changeFavoriteCard = async () => {
      setChangeFavCard((prev)=>!prev);
    };

    return <>
            <CardContainer style={{ gap: 16 }}>
        <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.bold]}>Подписка действует до 24 мая</IfgText>

          <CardContainer style={s.subsriptionCard}>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption2, gs.bold]}>Подписка ifeelgood Pro</IfgText>
            <View style={gs.mt6} />
            <IfgText color={colors.PLACEHOLDER_COLOR} style={gs.h1}>499 ₽</IfgText>
            <IfgText color={colors.SECONDARY_COLOR} style={gs.fontLightSmall}>Спишется 24 мая</IfgText>
            <View style={gs.mt6} />
            <Button outlined style={s.unsubscribeButton}>
                <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.medium]}>Отписаться</IfgText>
            </Button>
          </CardContainer>

         {(tariffsStore.tariffs.length > 0 && !tariffsStore.isLoading) ? <CardContainer style={s.subsriptionCard}>
          <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption2, gs.bold]}>Подписка Pro</IfgText>
          <View style={s.discounts}>
          <TouchableOpacity onPress={()=>onChange(0)} style={[s.dicountValue, activeDiscount === 0 && s.discountValueActive, gs.flex1]} >
              <IfgText color={activeDiscount === 0 ? colors.WHITE_COLOR : colors.BLACK_COLOR}>{tariffsStore.tariffs[0].title}</IfgText>
              {tariffsStore.tariffs[0].price_discount &&
              <View style={s.discountPercents}>
                <IfgText color={colors.BLACK_COLOR} style={gs.fontCaptionSmall}>-{ Math.round((tariffsStore.tariffs[0].price - tariffsStore.tariffs[0].price_discount) / tariffsStore.tariffs[0].price * 100)}%</IfgText>
              </View>}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>onChange(1)} style={[s.dicountValue, activeDiscount === 1 && s.discountValueActive, gs.flex1]} >
              <IfgText color={activeDiscount === 1 ? colors.WHITE_COLOR : colors.BLACK_COLOR}>{tariffsStore.tariffs[1].title}</IfgText>
              {tariffsStore.tariffs[1].price_discount &&
              <View style={s.discountPercents}>
                <IfgText color={colors.BLACK_COLOR} style={gs.fontCaptionSmall}>-{(tariffsStore.tariffs[1].price - tariffsStore.tariffs[1].price_discount) / tariffsStore.tariffs[1].price * 100 }%</IfgText>
              </View>}
          </TouchableOpacity>
          </View>
            <View style={gs.mt6} />
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption2, gs.bold]}>Подписка ifeelgood Pro</IfgText>

            <IfgText color={colors.PLACEHOLDER_COLOR} style={gs.h1}>{(tariffsStore.tariffs[activeDiscount].period === 'year') ? Math.round(Math.floor(tariffsStore.tariffs[activeDiscount].price_discount) * 12 / 100) * 100 - 1 : Math.floor(tariffsStore.tariffs[activeDiscount].price_discount) || tariffsStore.tariffs[activeDiscount].price} {`₽${tariffsStore.tariffs[activeDiscount].period === 'year' ? '/год' : '/мес.'}`}</IfgText>
            {tariffsStore.tariffs[activeDiscount].price_discount && <IfgText color={colors.GRAY_COLOR2} style={[gs.fontLight, gs.lineThrough]}>
            {Math.round(Math.floor(tariffsStore.tariffs[activeDiscount].price) * 12 / 100) * 100 - 1} ₽
            </IfgText>}
            {tariffsStore.tariffs[activeDiscount].description && <IfgText color={colors.SECONDARY_COLOR} style={gs.fontLightSmall}>{tariffsStore.tariffs[activeDiscount].description}</IfgText>}
            {/* <View style={gs.mt12} />
            <Input
                fullWidth
                //  value={value}
                //  onChange={onChange}
                placeholder="Промокод"
                style={[gs.fontCaption, s.promocodeForm, {justifyContent: 'space-between', flexDirection: 'row'}]}
            >
              <Button style={{borderRadius: 12,width: 54, height: 54,right: 54 + 12, backgroundColor: colors.GREEN_COLOR, justifyContent:'center', alignItems: 'center'}}>
              <Arrow />
              </Button>

            </Input> */}
          </CardContainer> : <ShimmerPlaceholder style={{borderRadius: 22}} height={333} width={ScreenWidth - 64}/>}
          {/*
          <View style={[gs.mt8, gs.flexRow, gs.alignCenter, {gap: 18}]}>
            <Button style={{alignItems: 'center',backgroundColor: colors.GREEN_COLOR, borderRadius: 16, height: 60, flex: 1}} >
              <IfgText style={[gs.fontCaption, gs.medium]} color={colors.WHITE_COLOR}>Применить</IfgText>
            </Button>
            <Button outlined style={{alignItems: 'center',borderColor: colors.GREEN_LIGHT_COLOR, borderRadius: 16, borderWidth: 1, flex: 1, height: 60}}>
              <IfgText style={[gs.fontCaption, gs.medium]}>Отменить</IfgText>
            </Button>
          </View> */}

          <View style={gs.mt4}>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.bold]}>Способы оплаты</IfgText>
            <IfgText disabled={paymentsStore.cards.length<2} onPress={changeFavoriteCard} color={colors.GREEN_LIGHT_COLOR} style={[gs.fontCaption3, gs.medium, gs.underline, {padding:12, margin: -12}]}>{changeFavCard ? 'Отменить' : 'Изменить метод оплаты'}</IfgText>
          </View>
          {!paymentsStore.isLoading ?  paymentsStore.cards.map((card:CardModel)=>
                    <CardContainer style={s.bankCardContainer}>
                    <View style={[gs.flexRow, gs.alignCenter, {justifyContent: 'space-between'}]}>
                      {LogoBankCard(card.card_type)}
                      <Button
                          disabled={paymentsStore.isCardLoadingObj.isLoading}
                          onPress={()=>(changeFavCard && !card.default) ? paymentsStore.changeFavoritePaymentCard(card.id) : paymentsStore.deletePaymentCard(card.id)}
                          outlined
                          style={s.deleteCardButton}>
                        <View style={gs.flexRow}>
                          {(changeFavCard && !card.default) ?
                          paymentsStore.isCardLoadingObj.cardId === card.id ?
                            <View style={{width: 100}}>
                              <ActivityIndicator />
                            </View> : <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption3, gs.ml4]}>Сделать основной</IfgText>
                          :
                          <>
                          <Trash16/>
                          {paymentsStore.isCardLoadingObj.cardId === card.id ?
                          <View style={{width: 90}}>
                            <ActivityIndicator />
                          </View> :
                          <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption3, gs.ml4]}>Удалить карту</IfgText>}
                          </>}
                          </View>
                      </Button>
                    </View>
                    <View style={[gs.flexRow, gs.alignCenter, {justifyContent: 'space-between'}]}>
                      <IfgText color={colors.WHITE_COLOR} style={gs.fontCaption}>{card.last4} {card.default && '• основной'}</IfgText>
                      {/* <Button outlined style={s.deleteButton}>
                        <Trash18/>
                      </Button> */}
                    </View>
                  </CardContainer>
          ) :
          <ShimmerPlaceholder style={[s.bankCardContainer, {width: '100%'}]} />}
          <CardContainer onPress={isLoading ? null : onAddCard} style={[s.bankCardContainer,s.bankCardAddContainer]}>
          <View style={gs.mt4}>
              <View style={s.container}>
                <View style={s.horizontal} />
                <View style={s.vertical} />
              </View>
            </View>
            <IfgText color={colors.GRAY_COLOR5} style={gs.fontCaption}>Добавить карту</IfgText>
          </CardContainer>
        </CardContainer>
        </>;
});

const s = StyleSheet.create({
  subsriptionCard: {
    backgroundColor: '#EFFCF4',
    gap: 6,
  },
  unsubscribeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.GREEN_COLOR,
    borderWidth: 1,
    borderRadius: 16,
  },
  bankCardContainer: {
    justifyContent: 'space-between',
    backgroundColor: colors.GREEN_COLOR,
    height: backCardHeight,
    borderRadius: 12,
  },
  bankCardAddContainer:{
    backgroundColor: '#F1F2F3',
  },
  deleteCardButton: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.WHITE_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    padding: 4,
  },
  deleteButton:{
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.WHITE_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    padding: 6,
  },
  plusContainer: {
    width: 12,     // Размер контейнера для иконки
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',

  },
  horizontal: {
    position: 'absolute',
    width: 12,     // Длина горизонтальной линии
    height: 2,     // Толщина линии
    backgroundColor: colors.GRAY_COLOR5,
  },
  vertical: {
    position: 'absolute',
    width: 2,      // Толщина линии
    height: 12,    // Длина вертикальной линии
    backgroundColor: colors.GRAY_COLOR5,
    left: 5,
    top: -5,
  },
  menuButton:{
    padding: 16,
    backgroundColor: '#EFFCF4',
    borderRadius: 12,
  },
  menuButtonActive: {
    backgroundColor: colors.GREEN_COLOR,
    padding: 16,
    borderRadius: 12,
  },
  iconButtonContainer: {
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
        promocodeForm: {
          color: colors.BLACK_COLOR,
          backgroundColor: colors.GREEN_LIGHT_LIGHT_GREEN,
          borderColor: colors.GREEN_LIGHT_COLOR,
          borderStyle: 'dashed',
        },
  });
