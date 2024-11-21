import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import colors from '../../../core/colors/colors';
import { ShadowGradient } from '../../../core/components/gradient/shadow-gradient';
import { IfgText } from '../../../core/components/text/ifg-text';
import gs from '../../../core/styles/global';
import DeleteWhite from '../../../../assets/icons/delete-white.svg';


export const ChatFooter = () =>{
    const [show, setShow] = useState(true);
    return <View style={s.footer}>
        <ShadowGradient style={{height: 100}} opacity={0.30}/>
        {show && <><View style={s.bubble}>
         <View style={[gs.flexRow, gs.alignCenter, {justifyContent: 'space-between'}]}>
            <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaptionSmall, gs.bold]}>Остались вопросы?</IfgText>
            <TouchableOpacity onPress={()=>setShow(false)}>
            <DeleteWhite />
            </TouchableOpacity>
        </View>
        <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaptionSmallMedium, gs.regular ]}>Задайте их в нашем умном чате!</IfgText>
        </View>
        <View style={s.tail} />
        </>}
                <Image
                resizeMode="contain"
                source={require('../../../../assets/backgrounds/chatGirl.png')}
                style={s.image}
                />
    </View>;};

const s = StyleSheet.create({
    footer: {
        position:'absolute',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        bottom: -30,
        right: 0,

        width: '100%',
    },
    bubble:{
    width: 'auto',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.GREEN_LIGHT_COLOR,
    borderRadius: 12,
    top: 46,
    height: 60,
    marginRight: 12,
    gap: 4,
    zIndex: 9999,
        elevation: 199,
    },
    tail: {
    position: 'absolute',
    bottom:68,
    right: 10 + 76 + 12, // Позиция хвостика; можно изменить для другого расположения
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor:  colors.GREEN_LIGHT_COLOR, // Цвет, совпадающий с цветом фона облака
    transform: [{ translateX: 10 }], // Смещение хвостика для точного позиционирования
    zIndex: 9999,
    elevation: 199,
    },
    image: {
        width: 76,
        marginRight: 10,
        zIndex: 9999,
        elevation: 199,
    },
});
