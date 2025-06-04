import React, { FC } from 'react';
import { CardContainer } from '../../../core/components/card/cardContainer';
import { View, Image, Linking } from 'react-native';
import gs from '../../../core/styles/global';
import { PROD_URL } from '../../../core/hosts';
import { IfgText } from '../../../core/components/text/ifg-text';
import colors from '../../../core/colors/colors';
import { ButtonNext } from '../../../core/components/button/button';
import Fish from './icons/fish.svg';
import RunningMan from './icons/runningman.svg';
import Meditate from './icons/meditate.svg';
import Moon from './icons/moon.svg';
import { useNavigation } from '@react-navigation/native';

const getIcon = (icon: string) => {
    switch (icon){
        case 'fish':
            return <Fish />;
        case 'runningman':
            return <RunningMan />;
        case 'meditate':
            return <Meditate />;
        case 'moon':
            return <Moon />;
    }
};

export interface NavigatorCardType {
    icon: string;
    title: string;
    image: string;
    desc: string;
    buttonText: string;
    buttonLink: string;
    bgColor: string;
}

export const NavigatorCard: FC<NavigatorCardType> = ({
    icon,
    title,
    image,
    desc,
    buttonLink,
    buttonText,
    bgColor,
}) => {
    const navigation = useNavigation<any>();
    const onPress = () => {
        if (buttonLink.startsWith('/articles/')){
            navigation.navigate('Материалы', {tagId: 85,resetParams: 'articles', toArticles: true, fromStartPage: true });
        }
        else if (buttonLink.startsWith('/articles')){
            navigation.navigate('Материалы', {resetParams: 'articles', toArticles: true, fromStartPage: true});

            // navigation.replace('Main', {screen:})'Материалы', { params: {resetParams: 'articles', toArticles: true, fromStartPage: true}});
            // navigation.navigate('Материалы', {tagId: 85, resetParams: 'articles'});
        }
        else {
            Linking.openURL(buttonLink);
        }
    };
    return <CardContainer style={{paddingHorizontal: 28, paddingBottom: 28, paddingTop:0, backgroundColor: bgColor, alignItems: 'center', marginVertical: 7}}>
        <View style={[gs.flexRow, {paddingTop: 18,alignItems: 'center', gap: 10 }]}>
            {getIcon(icon)}
            <IfgText color={colors.WHITE_COLOR} style={[gs.fontBodyMedium,{ maxWidth: '90%'} ]}>{title}</IfgText>
        </View>
        <Image style={{width: '100%', marginTop: 16}} resizeMode="contain"  height={220} source={{uri: `${PROD_URL}${image}`}}/>
        <IfgText color={colors.WHITE_COLOR} style={gs.fontCaption2}>{desc}</IfgText>
        <ButtonNext onPress={onPress} style={{backgroundColor: 'transparent', height: 64,borderColor: colors.WHITE_COLOR, borderWidth:1, marginTop: 8}} title={buttonText} />
    </CardContainer>;
};
