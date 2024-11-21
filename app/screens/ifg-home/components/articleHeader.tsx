


import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../../../core/colors/colors';
import { HashtagContainer } from '../../../core/components/card/cardContainer';
import { IfgText } from '../../../core/components/text/ifg-text';
import gs from '../../../core/styles/global';
import Time from '../../../../assets/icons/time.svg';


export const ArticleHeader:FC<{
    hashTagText?: string,
    hashTagColor?: string,
    time?: string,
    isNew?: boolean,
    isCicleBadge?: boolean,
  }> = ({hashTagText, hashTagColor, time, isNew, isCicleBadge }) =>
    <View style={[gs.flexRow, {justifyContent: 'space-between'}]}>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <View style={s.timeContainer}>
                        <Time />
                        <IfgText style={[gs.fontCaption3, gs.medium]} >
                        {time}
                        </IfgText>

                </View>
                <View style={{marginLeft: 10}} />
                {isCicleBadge && <View style={s.circle} />}
                {isNew &&
                <View style={s.new}>
                    <IfgText color={colors.WHITE_COLOR} style={gs.fontTiny} >NEW</IfgText>
                </View>}
            </View>
            {hashTagText && <HashtagContainer bgcolor={hashTagColor} >
                <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption3, gs.light, {lineHeight: 14}]}>{hashTagText}</IfgText>
            </HashtagContainer>}
        </View>;

const s = StyleSheet.create({
    circle:{
        width: 6,
        height: 6,
        backgroundColor: '#FA5D5D',
        borderRadius: 4,
    },
    timeContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
        height: 22,
        borderRadius: 6,
        paddingHorizontal: 6,
        gap: 4,
    },
    new: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FA5D5D',
        borderRadius: 6,
        padding: 4,
    },
});
