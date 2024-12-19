import { StyleSheet, ScrollView, View, Touchable, TouchableOpacity } from 'react-native';
import colors from '../../core/colors/colors';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CardContainer } from '../../core/components/card/cardContainer';
import { IfgText } from '../../core/components/text/ifg-text';
import gs from '../../core/styles/global';
import { Button } from '../../core/components/button/button';
import ArrowRight from '../../../assets/icons/arrow-right.svg';
import ArrowBack from '../../../assets/icons/arrow-back.svg';
import Benefit from '../../../assets/icons/benefit.svg';
import Email from '../../../assets/icons/email.svg';
import Delete from '../../../assets/icons/delete.svg';
import { observer } from 'mobx-react';
import testingStore from '../../../store/state/testingStore/testingStore';
import { ActivitiValueModel } from '../../../store/state/testingStore/models/models';
import { errorToast } from '../../core/components/toast/toast';

const data = [
    {
        text: 'Тест включает 60 вопросов.',
    },
    {
        text: 'Время на прохождение ~ 5-7 минут.',
    },
    {
        text: 'Отвечать необходимо честно, чтобы результаты были корректными и вы получили максимальную пользу.',
    },
];

export const Testing = observer(() => {
    // const url = 'https://rutube.ru/video/678aa2fab3084ec54829979c92bc2281/';
    const navigation = useNavigation<any>();
    const onBack = () => navigation.goBack();
    const [inTest, setInTest] = useState(false);
    const [showEmail, setShowEmail] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState<number>(1);
    const [currentAnswer, setCurrentAnswer] = useState<number>(-1);
    const [currentAnswerScore, setCurrentAnswerScore] = useState<number>(0);
    const [activitiValues, setActivitiValues] = useState<ActivitiValueModel>({
      'fiz-act': 0,
      sleep: 0,
      anistres: 0,
      pitaniye: 0,
    });
    const [totalScore, setTotalScore] = useState<number>(0);

    const [percentage, setPercentage] = useState<string>();
    const nextQuestion = async(
      score: number
    ) =>{
        console.log(testingStore.currentTest.questions[currentQuestion - 1], activitiValues, totalScore);
        const copyActivitiValues = activitiValues;
        switch (testingStore.currentTest.questions[currentQuestion - 1].group) {
          case 'Физическая активность':
              copyActivitiValues['fiz-act'] += Number(score);
              break;
          case 'Сон':
              copyActivitiValues.sleep += Number(score);
              break;
          case 'Антистресс':
              copyActivitiValues.anistres += Number(score);
              break;
          case 'Питание':
              copyActivitiValues.pitaniye += Number(score);
              break;
        }
        setActivitiValues(copyActivitiValues);
        setTotalScore(totalScore + Number(score));
        if (currentQuestion === testingStore.currentTest.questions.length){
            testingStore.setScoreToResult(totalScore, activitiValues);
            console.log('currentResultsTest',testingStore.currentResultsTest);
            await testingStore.submitTest(testingStore.currentResultsTest)
              .then(()=>navigation.navigate('ResultTest', {activiti_value_json: JSON.stringify(activitiValues)}))
              .catch(()=>errorToast('Проищошла ошибка отправки резульатов'));
            return;
        }

        setCurrentQuestion(currentQuestion + 1);
        setPercentage((currentQuestion + 1) / testingStore.currentTest.questions.length * 100 + '%');
        setCurrentAnswer(-1);
    };

    useEffect(()=>{
      testingStore.getTestById(9).then((res)=>{
        // data[0].text = `Тест включает ${testingStore.currentTest.testLength} вопросов.`;
      });
    }
    , []);
    return (
    <ScrollView style={s.container}>
        <View style={gs.mt16} />
        <Button style={s.buttonBack} onPress={onBack}>
            <>
                <ArrowBack />
                <IfgText color={colors.GRAY_COLOR3} style={gs.fontBody2}>Назад</IfgText>
            </>
        </Button>
        <View style={gs.mt16} />

        <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.h2, gs.bold ]}>
        {inTest ? 'Ifg-тестирование' : 'Пройдите тестирование для получения индивидуального ifg-плана'}
        </IfgText>

    <View style={gs.mt16} />
    {inTest ?
    <CardContainer style={s.cardQuestionsContainer} >
        <IfgText color={colors.SECONDARY_COLOR} style={gs.fontCaption3}><IfgText color={colors.SECONDARY_COLOR} style={[gs.fontCaption3, gs.semiBold]}>Вопрос {currentQuestion}</IfgText> из {testingStore.currentTest.questions.length}</IfgText>

            {/* <ProgressBar
                backgroundColor={colors.WHITE_COLOR}
                completedColor={colors.GREEN_LIGHT_COLOR}
                height={8}
                percentage={percentage}/> */}

        <View>
      <View style={{justifyContent: 'center'}}>
        <View style={s.progressBar}/>
        <View style={[s.filledProgressBar, {width: percentage ? percentage : 0}]}/>
      </View>
    </View>
        <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption, gs.bold]}>{testingStore.currentTest.questions[currentQuestion - 1].name}</IfgText>
        {testingStore.currentTest.questions[currentQuestion - 1].choices.map((val, index)=><TouchableOpacity key={index.toString()} onPress={()=>{setCurrentAnswer(index), setCurrentAnswerScore(val.score);}}>
            <CardContainer style={[gs.flexRow, gs.alignCenter, {borderRadius: 16, backgroundColor: (currentAnswer === index) ? '#DCF2E4' : colors.WHITE_COLOR}]}>
        <View style={currentAnswer === index ? s.radioButtonActive : s.radioButton}/>
        <IfgText color={colors.PLACEHOLDER_COLOR} style={gs.fontCaption2}>{val.value}</IfgText>
        </CardContainer>
        </TouchableOpacity>)}
    </CardContainer>
    : (data.map(({text}, index)=><CardContainer key={index.toString()} style={s.cardContainer}  >
        <Benefit />
        <IfgText color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption2, {maxWidth: '90%'}]}>
            {text}
        </IfgText>
    </CardContainer>))}
    <View style={gs.mt4} />
    <Button disabled={inTest && currentAnswer === -1  } style={s.buttonNext} onPress={inTest ? ()=> nextQuestion(currentAnswerScore) : ()=>{setPercentage(currentQuestion / testingStore.currentTest.questions.length * 100 + '%'); setInTest(true);}}>
           <View style={{
               flexDirection: 'row',
               justifyContent: 'space-between',
               alignItems: 'center',
               }}>
               <View style={{
                   width:'100%',
                   flexDirection: 'row',
                   justifyContent: 'space-between',
                   alignItems: 'center',
               }}>
                <IfgText color={colors.WHITE_COLOR} style={gs.fontBodyMedium}>{inTest ? 'Далее' : 'Пройти тестирование'}</IfgText>
                   <ArrowRight />
               </View>

               <View />
           </View>
    </Button>
    <View style={gs.mt24} />
    {showEmail && <CardContainer style={s.emailBlock}>
        <View style={[gs.flexRow, gs.alignCenter]}>
            <Email />
            <IfgText color={colors.SECONDARY_COLOR} style={[gs.fontCaption3, gs.ml12, {maxWidth: '80%'}]}>Мы постоянно дорабатываем тестирование, делая его более точным и полезным для вас. Если у вас есть вопросы и комментарии, напишите нам на <IfgText color={colors.GREEN_LIGHT_COLOR} style={gs.fontCaption3}>ask@ifeelgood.life</IfgText></IfgText>
        </View>
        <TouchableOpacity onPress={()=>setShowEmail(false)} style={gs.tapArea}>
              <View style={s.circle}>
               <Delete />
              </View>
        </TouchableOpacity>
    </CardContainer>}
    </ScrollView>
    );
  });

const s = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: colors.BACKGROUND_COLOR,
        paddingHorizontal: 16,

      },
      cardGradientContainer:{
        flex: 1,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
      },
      buttonBack: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        backgroundColor: 'transparent',
        borderColor: colors.BORDER_COLOR2,
        borderWidth: 1,
        borderRadius: 8,
        width: 84,
        height: 26,
      },

      buttonNext: {
        backgroundColor: colors.GREEN_COLOR,
        borderRadius: 16,
        paddingHorizontal: 24,
        height: 78,
      },
      cardContainer:{
        flexDirection: 'row',
        backgroundColor: colors.WHITE_DIRTY_COLOR,
        marginBottom: 12,
        alignItems: 'center',
      },
      cardQuestionsContainer:{
        flexDirection: 'column',
        backgroundColor: colors.WHITE_DIRTY_COLOR,
        marginBottom: 12,
      },
      emailBlock: {
        flex:1,
        flexDirection: 'row',
        backgroundColor: colors.BLUE_LIGHT_COLOR,
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      circle:{
        width: 16,
        height: 16,
        backgroundColor: colors.WHITE_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
      },
      radioButton: {
        width: 20,
        height: 20,
        borderRadius:20,
        backgroundColor: colors.GRAY_COLOR4,
      },
      radioButtonActive: {
        width: 20,
        height: 20,
        borderRadius:20,
        borderWidth: 5,
        borderColor: colors.GREEN_LIGHT_COLOR,
        backgroundColor: colors.WHITE_COLOR,
      },
      progressBar:{
        width: '100%',
        height: 8,
        marginVertical: 10,
        borderRadius: 5,
        backgroundColor: colors.WHITE_COLOR,
      },
      filledProgressBar:{
        height: 8,
        marginVertical: 10,
        borderRadius: 5,
        backgroundColor: colors.GREEN_LIGHT_COLOR,
        position: 'absolute',
      },
  });
