import { observer } from 'mobx-react';
import React, { FC, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, Dimensions, NativeModules, ActivityIndicator } from 'react-native';
import colors from '../../../../core/colors/colors';
import { IfgText } from '../../../../core/components/text/ifg-text';
import gs from '../../../../core/styles/global';
import ConfirmEmailGirl from '../../../../../assets/icons/images/confirmEmailGirl.svg';
import { CardContainer } from '../../../../core/components/card/cardContainer';
import { AnimatedGradientButton } from '../../../../core/components/button/button';
import AnimatedArrow from '../../../../core/components/animatedArrow/animatedArrow';
import userStore from '../../../../../store/state/userStore/userStore';
import { successToast } from '../../../../core/components/toast/toast';
import { API_URL } from '../../../../core/hosts';
import HttpClient from '../../../../core/http-client/http-client';
import tariffsStore from '../../../../../store/state/tariffsStore/tariffsStore';
import { useNavigation } from '@react-navigation/native';

const { YookassaModule } = NativeModules;

const height = Dimensions.get('screen').height;

export const SubscribeEmailConfirm:
    FC = observer(() => {
        const navigation = useNavigation<any>();
        const [timeLeft, setTimeLeft] = useState(30); // Начальные 30 секунд
        const [isRunning, setIsRunning] = useState(true);
        const scrollViewRef = useRef(null);
        const [isLoading, setIsLoading] = useState(false);

        const scrollToBottom = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
        };
        useEffect(() => {
            console.log(tariffsStore.tariffChoosed);
            if (!isRunning) {return;}
            scrollToBottom();
            if (timeLeft === 0) {
              setIsRunning(false); // Останавливаем таймер, когда время истекло
              return;
            }

            const timer = setTimeout(() => {
              setTimeLeft((prev)=>prev - 1); // Уменьшаем время на 1 секунду
            }, 1000);

            return () => clearTimeout(timer); // Очищаем таймер при размонтировании
        }, [timeLeft, isRunning]);

        const restartTimer = () => {
            setTimeLeft(30);
            setIsRunning(true);
        };
        const sendAgain = () => {
            console.log('sendAgain');
            restartTimer();
        };
        const onCheckConfirm = () => {
            console.log('Проверить');
            setIsLoading(true);
            successToast('Ваш профиль активирован!');
            setTimeout(()=>paymentCreate(), 1000);
        };
        const paymentCreate = async () => {
            console.log('paymentCreate');
            // YookassaModule.initialize('488632','test_NDg4NjMySCwLmX4npSsAaH8af9G51xSqDU3faXWOFcw', '');
            // console.log('AddCard', YookassaModule.createCalendarEvent('hi', 'world'));
            const price = tariffsStore.tariffChoosed.price_discount || tariffsStore.tariffChoosed.price;
            YookassaModule.startTokenize('', 'Оплата подписки IFeelGood Pro', '', price,
                async (result) => {
              console.log('Результат из нативного модуля:', result.paymentToken);
              if (result.paymentToken) {
               await HttpClient.post(`${API_URL}/api/lk/payment-create`, {price: 10, token: result.paymentToken})
                .then(async (res)=>{
                  console.log('payment-create data',res.data);
                  if (res.data.status === 'succeeded') {
                    await HttpClient.get(`${API_URL}/api/lk/payment-callback`)
                     .then((res)=>{
                      console.log(res);

                    });
                  }
                  else if (res.data.confirmation.confirmation_url) {
                    YookassaModule.start3DSecure(res.data.confirmation.confirmation_url, async (result) => {
                      console.log('res', result);
                      if (result.status === 'RESULT_OK') {
                       await HttpClient.get(`${API_URL}/api/lk/payment-callback`)
                       .then((res)=>{
                        console.log(res.data);
                        navigation.replace('SuccessfulReg');
                      });
                      }
                    });
                  }


                })
                .catch(err=>console.log('payment-create error',err))
                .finally(async()=>{
                    setIsLoading(false);

                });
              }
              setIsLoading(false);

            } );

            // await paymentsStore.addPaymentCard().then(()=>setOpenYokassa(prev=>!prev));
          };
    return <ScrollView ref={scrollViewRef}>
        <ImageBackground
            source={require('../../../../../assets/backgrounds/imageLong.png')}
            style={s.container}>
            <IfgText color={colors.WHITE_COLOR} style={[gs.h1Intro,  {textAlign: 'center', marginTop: 34}]}>
                Регистрация
            </IfgText>
            <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption2,  {textAlign: 'center',  maxWidth: 322}]}>
                Зарегистрируйтесь, чтобы сохранить результаты тестирования и начать следовать рекомендациям!
            </IfgText>
            <View style={{position: 'absolute', top: '22%'}}>
            <ConfirmEmailGirl />
            </View>

            <View style={s.formCard} >
                <IfgText style={[gs.fontBody1, gs.bold]}>Подтвердите почту</IfgText>
                <View style={gs.mt12} />
                <IfgText style={gs.fontCaption}>Для активации вашего профиля необходимо подтверждение электронной почты, мы отправили письмо с активационной ссылкой на <IfgText color={colors.GREEN_COLOR} style={[gs.fontCaption, gs.underline, gs.bold]}>{userStore.userInfo?.email || 'gmail@gmail.com'}</IfgText>, после перехода по ссылке нажмите кнопку «Проверить» ниже</IfgText>
                <View style={gs.mt18} />
                <AnimatedGradientButton
                    isLoading={isLoading}
                    disabled={isLoading}
                    style={s.buttonLogin}
                    onPress={onCheckConfirm}
                    >
                <View style={s.buttonContent}>
                    <View style={s.buttonContentRow}>
                    <IfgText color={colors.WHITE_COLOR} style={gs.fontBodyMedium}>Проверить</IfgText>
                    {isLoading ? <ActivityIndicator /> : <AnimatedArrow />}
                    </View>
                    <View />
                </View>

                </AnimatedGradientButton>
                <View style={gs.mt18}/>
                {isRunning ? <IfgText style={[gs.fontCaption2]}>Отправить письмо ещё раз можно через {timeLeft} секунд</IfgText>
                :
                <IfgText onPress={sendAgain} color={colors.GREEN_LIGHT_COLOR} style={[gs.fontCaption2, gs.underline, gs.bold]}>Отправить ещё раз</IfgText>}
            </View>
        </ImageBackground>
    </ScrollView>;
});

const s = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection:'column',
        minHeight: height,
        alignItems: 'center',
        gap: 18,
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
    formCard: {
        borderRadius: 22,
        flexDirection: 'column',
        // alignItems: 'center',
        width: '91%',
        backgroundColor: colors.WHITE_COLOR,
        paddingHorizontal: 18,
        paddingTop: 18,
        paddingBottom: 32,
        position: 'absolute',
        top: '48%',
      },
  });
