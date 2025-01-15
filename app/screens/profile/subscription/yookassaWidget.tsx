import React, { FC } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import colors from '../../../core/colors/colors';
import { IfgText } from '../../../core/components/text/ifg-text';
import { Button } from '../../../core/components/button/button';
import ArrowBack from '../../../../assets/icons/arrow-back.svg';
import gs from '../../../core/styles/global';
import { observer } from 'mobx-react';
import paymentsStore from '../../../../store/state/paymentsStore/paymentsStore';

export const YookassaWidget: FC<{isVisible: boolean, onClose: ()=>void, ctToken?: string, postMessengerConnectionId?: string }>
= observer(({isVisible, onClose, ctToken, postMessengerConnectionId }) => {
    console.log('ctToken', ctToken);
    return <Modal
    visible={isVisible}
    animationType="fade"
    transparent={false}
    onRequestClose={onClose}
    >
        {/* <View style={s.container}> */}
        <Button style={[s.buttonBack, gs.mt16, gs.ml16]} onPress={onClose}>
            <>
                <ArrowBack />
                <IfgText color={colors.GRAY_COLOR3} style={gs.fontBody2}>В профиль</IfgText>
            </>
        </Button>
        <WebView
        source={{ uri: `https://yoomoney.ru/checkout/checkout-ui?token=${ctToken}` }}
        containerStyle={gs.mt16}  />
        {/* </View> */}
    </Modal>;
});

const s = StyleSheet.create({
    container: {
        padding:16,
    },
    buttonBack: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        backgroundColor: 'transparent',
        borderColor: colors.BORDER_COLOR2,
        borderWidth: 0.75,
        borderRadius: 8,
        width: 100,
        height: 26,
      },
});
