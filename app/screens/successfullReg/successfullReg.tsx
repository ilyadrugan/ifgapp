import { ActivityIndicator, Image, ImageBackground, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedGradientButton, Button } from '../../core/components/button/button';
import { IfgText } from '../../core/components/text/ifg-text';
import ArrowRight from '../../../assets/icons/arrow-right.svg';
import colors from '../../core/colors/colors';
import gs from '../../core/styles/global';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import testingStore from '../../../store/state/testingStore/testingStore';
import authStore from '../../../store/state/authStore/authStore';
import AnimatedArrow from '../../core/components/animatedArrow/animatedArrow';
import { CommonActions } from '@react-navigation/native';
import { navigateAndReset } from '../../core/utils/navigateAndReset';

export const SuccessfulReg = () => {
  const navigation = useNavigation<any>();
  const abilities = [
        {
            id: '01',
            text: 'Эксклюзивные материалы, благодаря которым вы сможете улучшать своё самочувствие каждый день',
        },
        {
            id: '02',
            text: 'Закрытые мероприятия и интервью с нашими экспертами, которые расскажут как внедрить полезные привычки в вашу жизнь',
        },
        {
            id: '03',
            text: 'Углублённое тестирование, пройдя которое вы выполучите персональный план рекомендаций',
        },
        {
            id: '04',
            text: 'А также мы проводим конкурсы, в которых вы сможете выиграть полезные призы',
        },
    ];
    useEffect(() => {
      testingStore.getAllMyTest();
    }, []);

    return (  <>

        <ImageBackground
            source={require('../../../assets/backgrounds/imageShort.png')}
            style={[s.container]} >

        {/* <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 0.75)' ]}
            style={s.shadowGradient}
        /> */}
      <View style={s.imageContainerStyle}>

        <Image
            resizeMode="contain"
            style={s.imageStyle}
            source={require('../../../assets/backgrounds/girl.png')}/>
       </View>

        <View style={s.formCard} >
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontBody1,gs.bold]}>
            Ура! Вы зарегистрировались на портале ifeelgood
            </IfgText>
            <View style={gs.mt8} />
            <IfgText color={colors.SECONDARY_COLOR} style={gs.fontCaption}>
            Вам доступны:
            </IfgText>
            <View style={gs.mt32} />
            <View style={s.dottedLine} />
                {abilities.map(({id, text})=> <View key={id} style={[gs.flexRow, id !== '01' && gs.mt12]}>
                    <View style={s.circle}>
                        <IfgText color={colors.WHITE_COLOR} style={gs.fontCaption3}>
                            {id}
                        </IfgText>
                    </View>
                    <IfgText color={colors.SECONDARY_COLOR} style={[gs.fontCaption2, gs.ml12, {maxWidth: '90%'}]}>
                        {text}
                    </IfgText>
                </View>)}
        </View>
        <View style={s.footer}>

        <AnimatedGradientButton style={s.buttonNext}
                disabled={authStore.isLoading}
                onPress={()=>testingStore.testsList.length > 0 ?
                  navigateAndReset(navigation, 'IndividualProgramm')
                  :
                  navigateAndReset(navigation, 'Main')}
                >
                <View style={gs.buttonContent}>
                <View style={gs.buttonContentRow}>
                    <IfgText color={colors.WHITE_COLOR} style={[gs.fontBody1, { fontSize: 21}]}>Быть здоровым</IfgText>
                        {authStore.isLoading ? <ActivityIndicator /> : <AnimatedArrow />}
                    </View>
                    <View />
                </View>
            </AnimatedGradientButton>
        </View>

        </ImageBackground>

    </>
    );
  };
const s = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems:'center',
      },
    footer: {
        position: 'absolute',
        bottom: 55,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 9999,
        elevation: 100,
    },
      buttonLogin: {
        backgroundColor: colors.GREEN_COLOR,
        borderRadius: 16,
        paddingHorizontal: 24,
        height: 78,
        width: '86%',
      },
    shadowGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 160,
        zIndex:99,
        elevation: 10,
      },
      buttonNext: {
        backgroundColor: colors.GREEN_COLOR,
        borderRadius: 16,
        paddingHorizontal: 24,
        height: 78,
        width: '86%',
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
        paddingTop:27,
        paddingBottom: 55,
        paddingHorizontal: 18,
        marginBottom: 1,
        position: 'absolute',
        bottom: 55 + 79,
        // zIndex: 9,
        // elevation: 1,
      },
      dottedLine: {
        position: 'absolute',
        left: 33, // Позиция линии по центру кружков
        bottom: 0,
        height: '80%',
        // width: 1,
        borderStyle: 'dashed',
        borderRightWidth: 1,
        borderColor: colors.BORDER_COLOR2, // Цвет пунктирной линии
      },
      circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.GREEN_COLOR,
      },
      imageStyle: {
        maxWidth: '90%',
        alignSelf: 'center',
      },
      imageContainerStyle: {
        // zIndex: 9,
        // elevation: 1,
        position: 'absolute',
        bottom: 40,
      },
  });

