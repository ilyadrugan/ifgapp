import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Image, View } from 'react-native';
import colors from '../../../core/colors/colors';
import { ButtonNext } from '../../../core/components/button/button';
import { CardContainer } from '../../../core/components/card/cardContainer';
import { IfgText } from '../../../core/components/text/ifg-text';
import { PROD_URL } from '../../../core/hosts';
import gs from '../../../core/styles/global';
import { ArticleModel } from '../const';
import { ScreenWidth } from '../../../hooks/useDimensions';
import { ArticleTypeIcon } from '../../../core/components/articletype-icon/articletype-icon';


export const MaterialCard: FC<ArticleModel> = ({
    title,
    subtitle,
    type,
    id,
    image,
}) => {
    const width = ScreenWidth - 32 - 10;
    const navigation = useNavigation<any>();
    const onPress = () => {
        navigation.navigate('ArticleView', {articleId: id});
    };
    return <View><CardContainer style={{padding: 0, overflow:'hidden', borderBottomLeftRadius: 0, borderBottomRightRadius: 0,marginRight:  id === 262 ? 16 : 0 , marginLeft: 16 }}>
        <Image width={width} height={260} source={{uri: `${PROD_URL}${image}`}} />
        <View style={{position: 'absolute', right: 24, top: 24, alignItems: 'center', backgroundColor: 'white', justifyContent: 'center', borderRadius: 12, width: 60, height: 60}}>
            {ArticleTypeIcon(type)}
        </View>
    </CardContainer>
    <CardContainer activeOpacity={1} onPress={onPress} style={{marginTop: -80, borderRadius: 16, width: width, height: 200, marginRight:  id === 262 ? 16 : 0 , marginLeft: 16 }}>
        <IfgText color="#363636" style={gs.fontBodyMedium}>{title}</IfgText>
        <IfgText style={gs.fontCaption3}>{subtitle}</IfgText>
    </CardContainer>
    </View>;
};
