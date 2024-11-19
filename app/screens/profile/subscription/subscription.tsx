import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../../../core/colors/colors';
import { CardContainer } from '../../../core/components/card/cardContainer';
import { IfgText } from '../../../core/components/text/ifg-text';
import gs from '../../../core/styles/global';
import { Button } from '../../../core/components/button/button';
import Trash16 from '../../../../assets/icons/trash16.svg';
import Trash18 from '../../../../assets/icons/trash18.svg';
import Visa from '../../../../assets/icons/visa.svg';

const backCardHeight = 180;


export const Subscription: FC = () =>{
    return <>
            <CardContainer style={{ gap: 16 }}>
        <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.bold]}>Подписка действует до 24 мая</IfgText>

          <CardContainer style={s.subsriptionCard}>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption2, gs.bold]}>Подписка IFeelGood Pro</IfgText>
            <View style={gs.mt6} />
            <IfgText color={colors.PLACEHOLDER_COLOR} style={gs.h1}>299 ₽</IfgText>
            <IfgText color={colors.SECONDARY_COLOR} style={gs.fontLightSmall}>Спишется 24 мая</IfgText>
            <View style={gs.mt6} />
            <Button outlined style={s.unsubscribeButton}>
                <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.medium]}>Отписаться</IfgText>
            </Button>
          </CardContainer>
          <View style={gs.mt4}>
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.bold]}>Способы оплаты</IfgText>
            <IfgText color={colors.GREEN_LIGHT_COLOR} style={[gs.fontCaption3, gs.medium, gs.underline]}>Изменить метод оплаты</IfgText>
          </View>
          <CardContainer style={s.bankCardContainer}>
            <View style={[gs.flexRow, gs.alignCenter, {justifyContent: 'space-between'}]}>
              <Visa/>
              <Button outlined style={s.deleteCardButton}>
                <View style={gs.flexRow}>
                <Trash16/>
                <IfgText style={[gs.fontCaption3, gs.ml4]}>Удалить карту</IfgText>
                </View>
              </Button>
            </View>
            <View style={[gs.flexRow, gs.alignCenter, {justifyContent: 'space-between'}]}>
              <IfgText style={gs.fontCaption}>1817 • основной</IfgText>
              {/* <Button outlined style={s.deleteButton}>
                <Trash18/>
              </Button> */}
            </View>
          </CardContainer>
          <CardContainer  onPress={()=>console.log('add card')} style={[s.bankCardContainer,s.bankCardAddContainer]}>
          <View style={gs.mt4}>
              <View style={s.container}>
                <View style={s.horizontal} />
                <View style={s.vertical} />
              </View>
            </View>
            <IfgText color={colors.GRAY_COLOR5} style={gs.fontCaption}>Добавить карту</IfgText>
          </CardContainer>
        </CardContainer></>;
};

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
  });
