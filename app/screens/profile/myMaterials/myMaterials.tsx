import React, { FC } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { CardContainer } from '../../../core/components/card/cardContainer';
import gs from '../../../core/styles/global';
import { IfgText } from '../../../core/components/text/ifg-text';
import colors from '../../../core/colors/colors';
import { Button } from '../../../core/components/button/button';
import Star from '../../../../assets/icons/star.svg';
import { Materials } from '../../individualProgramm/recomendationData/recomendationData';


const CardMaterial: FC<{title: string, text: string, img: string}> = ({text, title, img}) => {
    return <CardContainer style={{overflow: 'hidden', gap: 18,padding: 0, borderRadius: 16, borderWidth: 1, borderTopWidth: 0, borderColor: '#E7E7E7', flexDirection: 'row'}}>
                <Image resizeMode="cover" source={img}
                style={{ width: 122, height: '100%' }}
                />
                <View style={{paddingRight: 15,paddingVertical: 15, flexDirection: 'column'}}>
                <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption2, gs.bold, {maxWidth: '90%'}]}>{title}</IfgText>
                <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaptionSmall, gs.mt8, {maxWidth: '80%'}]}>{text}</IfgText>
                </View>
            <Button style={s.starButton}>
                <Star />
            </Button>

    </CardContainer>;
};

export const MyMaterials: FC = () =>{
    return Materials.map(({title, img, text, id})=><>
    <CardMaterial text={text} img={img} title={title} />
    <View style={gs.mt16} />
    </>);
};

const s = StyleSheet.create({
    dateContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.GREEN_COLOR,
        height: 24,
        borderRadius: 6,
        paddingHorizontal: 8.5,
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
    buttonResult: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 'auto',
        padding: 20,
        borderWidth: 1,
        borderColor: colors.GREEN_COLOR,
        borderRadius: 16,
    },
    starButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 10,
        top: 10,
        backgroundColor: colors.WHITE_COLOR,
    },
  });
