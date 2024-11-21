import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { CardContainer } from '../../../core/components/card/cardContainer';
import React, { useState } from 'react';
import gs from '../../../core/styles/global';
import colors from '../../../core/colors/colors';
import { IfgText } from '../../../core/components/text/ifg-text';
import Delete from '../../../../assets/icons/delete.svg';



export const RecommendationBlock = () => {
    const [recommends1, setRecommends1] = useState(true);
    const [recommends2, setRecommends2] = useState(true);

    return <>
    {recommends1 && <CardContainer style={[s.block1, gs.mt16]}>
        <IfgText style={[gs.fontCaption3, {maxWidth: '80%'}]} >
            Отмечайте выполнение рекомендаций и получайте ifg баллы
        </IfgText>
        <TouchableOpacity onPress={()=>setRecommends1(false)} style={s.circle}>
               <Delete />
        </TouchableOpacity>

    </CardContainer>}
    {recommends2 && <ImageBackground
        resizeMode="stretch"
        style={[s.block2,gs.mt16]}
        source={require('../../../../assets/backgrounds/running-man.png')} >
           <View style={{width: '65%'}}>
        <IfgText style={[gs.fontCaption2, gs.bold ]} >
            День физической активности
        </IfgText>
        <IfgText style={[gs.fontCaptionSmall, gs.mt12 ]} >
        Сегодня мы расскажем вам о простых, но полезных практиках физической активности
        </IfgText>
        </View>
        <TouchableOpacity onPress={()=>setRecommends2(false)} style={s.circle}>
               <Delete />
        </TouchableOpacity>
        </ImageBackground>}

    </>;
};


const s = StyleSheet.create({
    block1: {
        backgroundColor: colors.BLUE_LIGHT_COLOR,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
      },
    block2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
      },
    circle:{
        width: 16,
        height: 16,
        backgroundColor: colors.WHITE_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
      },
    });
