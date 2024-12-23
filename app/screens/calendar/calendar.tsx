import React, { FC, useRef, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Image, Animated } from 'react-native';
import colors from '../../core/colors/colors';
import gs from '../../core/styles/global';
import { Graphs } from './blocks/graphs';
import { IfgText } from '../../core/components/text/ifg-text';
import { CalendarBlock } from './blocks/calendarBlock';
import WeekCalendar from './blocks/weekCalendar';
import { CardContainer } from '../../core/components/card/cardContainer';
import Open from '../../../assets/icons/open-down.svg';
import { TimeToDrinkBlock } from '../ifg-home/blocks/timeToDrink';
import { ArticleHeader } from '../ifg-home/components/articleHeader';
import { ButtonNext } from '../../core/components/button/button';
import Fish18 from '../../../assets/icons/fish18.svg';
import Moon18 from '../../../assets/icons/moon18.svg';
import Antistress18 from '../../../assets/icons/antistress18.svg';
import PhysicalActivity18 from '../../../assets/icons/physical-activity.svg';
import { ShadowGradient } from '../../core/components/gradient/shadow-gradient';
import { useNavigation } from '@react-navigation/native';

export const CalendarScreen = () =>{
    const navigation = useNavigation<any>();

    return <>
    <ScrollView style={s.container}>
        <View style={gs.mt16} />
        <IfgText style={[gs.h2, gs.bold]} >{'Календарь'}</IfgText>
        <View style={gs.mt16} />
        <Graphs />
        <View style={gs.mt24} />
        <IfgText style={[gs.fontBodyMedium, gs.bold]}>План по дням</IfgText>
        <View style={gs.mt12} />
        <IfgText style={[gs.fontCaptionSmall]}>Предстоящие и прошедшие рекомендации</IfgText>
        <View style={gs.mt16} />
        <CalendarBlock/>
        <View style={gs.mt24} />
        {/* Питание */}
        <CardContainer style={{borderRadius: 12}}>
            <View style={[gs.flexRow, gs.alignCenter, {justifyContent: 'space-between'}]}
                >
                <View style={[gs.flexRow, gs.alignCenter]}>
                    <View style={[s.iconContainer, {backgroundColor: colors.GREEN_COLOR}]}>
                        <Fish18/>
                    </View>
                    <IfgText style={[gs.fontCaption, gs.bold, gs.ml12]}>Питание</IfgText>
                </View>
                <TouchableOpacity disabled
                    // style={{ transform: [{ scaleY: scaleY }] }}
                >
                    <Open />
                </TouchableOpacity>

            </View>
        </CardContainer>
        <TimeToDrinkBlock />

        <View style={gs.mt24} />
        {/* Физическая активность */}
        <CardContainer  style={[{borderRadius: 12}]} >
            <View style={[gs.flexRow, gs.alignCenter, {justifyContent: 'space-between'}]}
                >
                <View style={[gs.flexRow, gs.alignCenter]}>
                    <View style={[s.iconContainer, {backgroundColor: colors.PINK_COLOR}]}>
                        <PhysicalActivity18/>
                    </View>
                    <IfgText style={[gs.fontCaption, gs.bold, gs.ml12]}>Физическая активность</IfgText>
                </View>
                <TouchableOpacity disabled
                    // style={{ transform: [{ scaleY: scaleY }] }}
                >
                    <Open />
                </TouchableOpacity>

            </View>
        </CardContainer>
        <View style={gs.mt16} />
        <CardContainer onPress={()=>navigation.navigate('ArticleView', {articleId: 91})}>
          <ArticleHeader
            time={'10:00'}
            hashTagColor={colors.PINK_COLOR}
            hashTagText={'#Активность'}
          />
          <IfgText style={[gs.fontCaption, gs.bold]}>Ходите по лестнице или на степпере </IfgText>
          <View style={[gs.flexRow, gs.alignCenter]}>
            <Image
            resizeMode="contain"
            style={{width: 44, height: 44}}
            source={require('../../../assets/backgrounds/article1.png')}
            />
            <IfgText style={[gs.fontCaptionSmall, gs.ml12, {width: '80%'}]}>Куда бы вы ни пошли сегодня, старайтесь выбирать лестницу, а не лифт или эскалатор, и поднимайтесь на нужный...</IfgText>
          </View>
        </CardContainer>
        <View style={gs.mt16} />
        <CardContainer onPress={()=>navigation.navigate('ArticleView', {articleId: 91})}>
          <ArticleHeader
            time={'10:00'}
            hashTagColor={colors.PINK_COLOR}
            hashTagText={'#Активность'}
          />
          <IfgText style={[gs.fontCaption, gs.bold]}>Узнайте, чем полезна ходьба</IfgText>
          <View style={[gs.flexRow, gs.alignCenter]}>
            <Image
            resizeMode="contain"
            style={{width: 44, height: 44}}
            source={require('../../../assets/backgrounds/article2.png')}
            />
            <IfgText style={[gs.fontCaptionSmall, gs.ml12, {width: '80%'}]}>Кто-то из вас более спортивный, а кто-то последний раз занимался спортом на уроке физкультуры. Ничего страшного!</IfgText>
          </View>
          <IfgText style={[gs.fontCaptionSmall]}>👋🏻Узнайте подробнее о важности ходьбы в нашей статье...</IfgText>
          <ButtonNext onPress={()=>navigation.navigate('ArticleView', {articleId: 91})} title="Читать статью" oliveTitle="+ 3 балла" />
        </CardContainer>

        <View style={gs.mt24} />
        {/* Антистресс */}
        <CardContainer style={{borderRadius: 12}}>
            <View style={[gs.flexRow, gs.alignCenter, {justifyContent: 'space-between'}]}>
                <View style={[gs.flexRow, gs.alignCenter]}>
                    <View style={[s.iconContainer, {backgroundColor: colors.OLIVE_COLOR}]}>
                        <Antistress18/>
                    </View>
                    <IfgText style={[gs.fontCaption, gs.bold, gs.ml12]}>Антистресс</IfgText>
                </View>
                <TouchableOpacity disabled
                    // style={{ transform: [{ scaleY: scaleY }] }}
                >
                    <Open />
                </TouchableOpacity>

            </View>
        </CardContainer>
        <View style={gs.mt16} />
        <CardContainer>
          <ArticleHeader
            time={'10:00'}
            hashTagColor={colors.OLIVE_COLOR}
            hashTagText={'#Антистресс'}
          />
          <IfgText style={[gs.fontCaption, gs.bold]}>Ходите по лестнице или на степпере </IfgText>
          <View style={[gs.flexRow, gs.alignCenter]}>
            <Image
            resizeMode="contain"
            style={{width: 44, height: 44}}
            source={require('../../../assets/backgrounds/article1.png')}
            />
            <IfgText style={[gs.fontCaptionSmall, gs.ml12, {width: '80%'}]}>Куда бы вы ни пошли сегодня, старайтесь выбирать лестницу, а не лифт или эскалатор, и поднимайтесь на нужный...</IfgText>
          </View>
        </CardContainer>
        <View style={gs.mt16} />
        <CardContainer onPress={()=>navigation.navigate('ArticleView', {articleId: 91})}>
          <ArticleHeader
            time={'10:00'}
            hashTagColor={colors.OLIVE_COLOR}
            hashTagText={'#Антистресс'}
          />
          <IfgText style={[gs.fontCaption, gs.bold]}>Узнайте, чем полезна ходьба</IfgText>
          <View style={[gs.flexRow, gs.alignCenter]}>
            <Image
            resizeMode="contain"
            style={{width: 44, height: 44}}
            source={require('../../../assets/backgrounds/article2.png')}
            />
            <IfgText style={[gs.fontCaptionSmall, gs.ml12, {width: '80%'}]}>Кто-то из вас более спортивный, а кто-то последний раз занимался спортом на уроке физкультуры. Ничего страшного!</IfgText>
          </View>
          <IfgText style={[gs.fontCaptionSmall]}>👋🏻Узнайте подробнее о важности ходьбы в нашей статье...</IfgText>
          <ButtonNext onPress={()=>navigation.navigate('ArticleView', {articleId: 91})} title="Читать статью" oliveTitle="+ 3 балла" />
        </CardContainer>

        <View style={gs.mt24} />
        {/* Сон */}
        <CardContainer style={{borderRadius: 12}}>
            <View style={[gs.flexRow, gs.alignCenter, {justifyContent: 'space-between'}]}>
                <View style={[gs.flexRow, gs.alignCenter]}>
                    <View style={[s.iconContainer, {backgroundColor: colors.ORANGE_COLOR}]}>
                        <Moon18/>
                    </View>
                    <IfgText style={[gs.fontCaption, gs.bold, gs.ml12]}>Сон</IfgText>
                </View>
                <TouchableOpacity disabled
                    // style={{ transform: [{ scaleY: scaleY }] }}
                >
                    <Open />
                </TouchableOpacity>

            </View>
        </CardContainer>
        <View style={gs.mt16} />
        <CardContainer onPress={()=>navigation.navigate('ArticleView', {articleId: 91})}>
          <ArticleHeader
            time={'10:00'}
            hashTagColor={colors.ORANGE_COLOR}
            hashTagText={'#Сон'}
          />
          <IfgText style={[gs.fontCaption, gs.bold]}>Ходите по лестнице или на степпере</IfgText>
          <View style={[gs.flexRow, gs.alignCenter]}>
            <Image
            resizeMode="contain"
            style={{width: 44, height: 44}}
            source={require('../../../assets/backgrounds/article1.png')}
            />
            <IfgText style={[gs.fontCaptionSmall, gs.ml12, {width: '80%'}]}>Куда бы вы ни пошли сегодня, старайтесь выбирать лестницу, а не лифт или эскалатор, и поднимайтесь на нужный...</IfgText>
          </View>
        </CardContainer>
        <View style={gs.mt16} />
        <CardContainer onPress={()=>navigation.navigate('ArticleView', {articleId: 91})}>
          <ArticleHeader
            time={'10:00'}
            hashTagColor={colors.ORANGE_COLOR}
            hashTagText={'#Сон'}
          />
          <IfgText style={[gs.fontCaption, gs.bold]}>Узнайте, чем полезна ходьба</IfgText>
          <View style={[gs.flexRow, gs.alignCenter]}>
            <Image
            resizeMode="contain"
            style={{width: 44, height: 44}}
            source={require('../../../assets/backgrounds/article2.png')}
            />
            <IfgText style={[gs.fontCaptionSmall, gs.ml12, {width: '80%'}]}>Кто-то из вас более спортивный, а кто-то последний раз занимался спортом на уроке физкультуры. Ничего страшного!</IfgText>
          </View>
          <IfgText style={[gs.fontCaptionSmall]}>👋🏻Узнайте подробнее о важности ходьбы в нашей статье...</IfgText>
          <ButtonNext onPress={()=>navigation.navigate('ArticleView', {articleId: 91})} title="Читать статью" oliveTitle="+ 3 балла" />
        </CardContainer>

        <View style={{height: 280}} />
    </ScrollView>
    <View style={s.footer}>
        <ButtonNext textStyle={gs.fontBodyMedium} onPress={()=>navigation.navigate('IndividualProgramm')} style={{height: 78}} title="Моя программа" />
    </View>
    <ShadowGradient opacity={0.3} />
    </>;
};

const s = StyleSheet.create({
    container:{
        padding: 16,
    },
    iconContainer: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        zIndex: 99,
        elevation: 99,
        padding: 30,
    },
    stickyHeader: {
        height: 60,
        backgroundColor: 'white',
        zIndex: 10,
        justifyContent: 'center',
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5, // Для Android
      },
  });
