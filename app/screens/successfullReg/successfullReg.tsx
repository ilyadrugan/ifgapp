import { ActivityIndicator, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
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
import { observer } from 'mobx-react';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { HEIGHT, WIDTH } from '../../core/components/instagram-stories/core/constants';
import userStore from '../../../store/state/userStore/userStore';

export const SuccessfulReg = observer(() => {
  const navigation = useNavigation<any>();
  const frame = useSafeAreaFrame();
  const deviceHeight = frame.height;
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
      userStore.getProfile();
    }, []);

    return (  <ScrollView>

        <ImageBackground
            source={require('../../../assets/backgrounds/imageShort.png')}
            style={[s.container, {maxHeight: HEIGHT + 100}]} >

        {/* <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 0.75)' ]}
            style={s.shadowGradient}
        /> */}
      {/* <View style={s.imageContainerStyle}> */}
        <Image
            resizeMode="contain"
            style={[s.imageStyle, gs.mt64]}
            source={require('../../../assets/backgrounds/girl.png')}/>
       {/* </View> */}
       <View style={[s.footer,  gs.mt64]}>
        <View style={s.formCard} >
            <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontBody1,gs.bold]}>
            Ура! Вы зарегистрировались на портале ifeelgood
            </IfgText>
            <View style={gs.mt8} />
            <IfgText color={colors.SECONDARY_COLOR} style={gs.fontCaption}>
            Вам доступны:
            </IfgText>
            <View style={gs.mt16} />
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


        <AnimatedGradientButton style={s.buttonNext}
                disabled={testingStore.isLoading || userStore.isLoading}
                onPress={()=>
                  userStore.roles.includes('user_wb') ?
                  navigation.reset({
                    index: 1,
                    routes: [
                      { name: 'Main' },
                      { name: 'StartPage', params:{withNoBack: true} },
                    ],
                  })
                  : testingStore.testsList.length > 0 ?
                  navigateAndReset(navigation, 'IndividualProgramm', {withNoBack: true})
                  :
                  navigateAndReset(navigation, 'Main')}
                >
                <View style={gs.buttonContent}>
                <View style={gs.buttonContentRow}>
                    <IfgText color={colors.WHITE_COLOR} style={[gs.fontBody1, { fontSize: 21}]}>Быть здоровым</IfgText>
                        {authStore.isLoading || userStore.isLoading ? <ActivityIndicator color={colors.WHITE_COLOR} /> : <AnimatedArrow />}
                    </View>
                    <View />
                </View>
            </AnimatedGradientButton>
        </View>

        </ImageBackground>

    </ScrollView>
    );
  });
const s = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        alignItems:'center',

      },
    footer: {
        position: 'absolute',
        // bottom: 50,
        // left: 0,
        // right: 0,
        alignItems: 'center',
        zIndex: 9999,
        elevation: 100,
        top: HEIGHT * 0.3,
        paddingHorizontal: 16,
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
        width: '96%',
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
        width: '100%',
        backgroundColor: colors.WHITE_COLOR,
        paddingTop:20,
        paddingBottom: 20,
        paddingHorizontal: 18,
        marginBottom: 1,
        // position: 'absolute',
        // bottom: 40 + 89,
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
        maxWidth: WIDTH,
        maxHeight: 420,
        // alignSelf: 'center',
        // position: 'absolute',
        // top: 100,
      },
      imageContainerStyle: {
        // zIndex: 9,
        // elevation: 1,
        position: 'absolute',
        top: 0,
        // bottom: 20,

      },
  });

