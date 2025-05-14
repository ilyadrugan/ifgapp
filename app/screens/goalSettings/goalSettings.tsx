import React, { FC, useEffect, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, View, Image, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, FlatList, ActivityIndicator, Dimensions, TextInput } from 'react-native';
import { Button, ButtonTo } from '../../core/components/button/button';
import { useNavigation } from '@react-navigation/native';
import colors from '../../core/colors/colors';
import { CardContainer } from '../../core/components/card/cardContainer';
import { IfgText, IfgTextWithLinks } from '../../core/components/text/ifg-text';
import gs from '../../core/styles/global';
import { ContestType } from './models/models';
import ArrowBack from '../../../assets/icons/arrow-back.svg';
import Winner from '../../../assets/icons/winner.svg';
import { dataContests } from './contests';
import { FeedBack } from './components/feedback';
import ArrowRightBlack from '../../../assets/icons/arrow-right-black.svg';
import presentsStore from '../../../store/state/presentsStore/presentsStore';
import { PresentModel, WinnerModel } from '../../../store/state/presentsStore/models/models';
import { stripHtmlTags } from '../../core/utils/stripHtmlTags';
import { observer } from 'mobx-react';
import { RenderHTMLView } from '../materials/components/renderHtml';
import userStore from '../../../store/state/userStore/userStore';
import { Input } from '../../core/components/input/input';
import Slider from '@react-native-community/slider';
import dailyActivityStore from '../../../store/state/activityGraphStore/activityGraphStore';
import { formatNumber } from '../../core/utils/formatNumber';
import { ArticleModel } from '../../../store/state/articlesStore/models/models';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const { width } = Dimensions.get('window');
interface SliderInputProps {
    title: string;
    min: number;
    max: number;
    step?: number;
    unit?: string;
    initialValue: number;
  }

export const GoalSettings = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<any>();
    const onBack = () => {
      navigation.goBack();
    };
    useEffect(() => {
      console.log('dailyActivityStore.dailyActivitySettingsToSend', dailyActivityStore.dailyActivitySettingsToSend);
      dailyActivityStore.getDailyActivitySettings()
    }, []);
    const onSave = async () => {
      console.log('dailyActivityStore.dailyActivitySettingsToSend', dailyActivityStore.dailyActivitySettingsToSend);
      await dailyActivityStore.setDailyActivitySettings(dailyActivityStore.dailyActivitySettingsToSend);
    };
    // eslint-disable-next-line react/no-unstable-nested-components
    const SliderInput:FC<SliderInputProps> = ({
        title,
        min,
        max,
        step = 1,
        unit = '',
        initialValue,
      }) => {
        console.log('initialValue');
        const [value, setValue] = useState(`${(initialValue).toString()} ${unit}`);

        const handleSliderChange = async (val: number) => {
          setChoosedValue(Math.round(val));
          setValue(`${Math.round(val).toString()} ${unit}`);
        };

        const handleInputChange = (text: string) => {
          const num = parseInt(text, 10);
          if (!isNaN(num) && num >= min && num <= max) {
            setValue(num.toString());
            setChoosedValue(num);
          }
          else {
            setValue(text);

          }
        };

        const onBlur = () => {
            const num = parseInt(value.split(' ')[0], 10);
            if (num <= min || isNaN(num)) {
                setValue(`${min.toString()} ${unit}`);
                setChoosedValue(min);
              }
            else if (num >= max) {
                setValue(`${max.toString()} ${unit}`);
                setChoosedValue(max);
            }
            else {
                setValue(`${num.toString()} ${unit}`);
                setChoosedValue(num);
            }

        };
        const setChoosedValue = (num: number) => {
          switch (unit) {
            case 'баллов':
              dailyActivityStore.setDailyActivitySettingsForSend('ifg_scores', num);
              break;
            case 'ккал':
              dailyActivityStore.setDailyActivitySettingsForSend('calories', num);
              break;
            case 'шагов':
              dailyActivityStore.setDailyActivitySettingsForSend('steps', num);
              break;
            case 'пролетов':
              dailyActivityStore.setDailyActivitySettingsForSend('floor_spans', num);
              break;
          }
        };
        return (
          <>
            <IfgText style={[gs.h3, gs.bold]}>{title}</IfgText>
            <TextInput
              style={[s.input, gs.fontCaption2, {color: colors.PLACEHOLDER_COLOR}]}
              keyboardType="numeric"
              value={value}
              onChangeText={handleInputChange}
              onBlur={onBlur}
              onFocus={()=>setValue(value.split(' ')[0])}
              allowFontScaling={false}
            />
            <Slider
              style={s.slider}
              minimumValue={min}
              maximumValue={max}
              step={step}
              minimumTrackTintColor="#54B676"
              maximumTrackTintColor="#c7c7c7"
              thumbTintColor="#54B676"
              value={parseInt(value.split(' ')[0], 10) || min}
              onValueChange={handleSliderChange}

            />
            <View style={s.labels}>
              <IfgText style={gs.fontCaptionSmall}>{formatNumber(min)}</IfgText>
              <IfgText style={gs.fontCaptionSmall}>{formatNumber(max)}</IfgText>
            </View>
          </>
        );
      };
      const ArticleCard:FC<{item?: ArticleModel}> = ({item}) => {

        return <CardContainer style={s.articleCard}>
            <Image resizeMode="cover" source={{uri: 'https://ifeelgood.life/storage/library/xFTU0dBDEOmqVPvD0.48Мб/webp/thumb.webp'}}

            style={{ width: '40%', height: '100%' }}
            />
            <View style={{paddingRight: 15,paddingVertical: 12, flexDirection: 'column'}}>
            <IfgText numberOfLines={3} color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaption2, gs.bold, {maxWidth: '75%'}]}>{'Правильно ставьте цели для новых привычек'}</IfgText>
            <IfgText numberOfLines={3} color={colors.PLACEHOLDER_COLOR} style={[gs.fontCaptionSmall, gs.mt8, {maxWidth: '65%'}]}>{'Пошаговое руководство от эксперта'}</IfgText>
            <View style={gs.mt12}><ButtonTo onPress={()=>navigation.navigate('ArticleView', {articleId: 27})} style={{width: 114, height: 26}} title="Подробнее" /></View>
            </View>
        </CardContainer>;
      };
    return <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
      style={[s.container,  ]}>
        <Button style={[s.buttonBack,{marginTop: Platform.OS==='ios'?insets.top:0}]} onPress={onBack}>
            <>
                <ArrowBack />
                <IfgText color={colors.GRAY_COLOR3} style={gs.fontBody2}>Назад</IfgText>
            </>
        </Button>
        <View style={gs.mt16} />
        <IfgText style={[gs.h2, gs.bold]}>Настройка целей на день</IfgText>

        <View style={gs.mt16} />
        <CardContainer >
            <SliderInput title="Цель ifg-баллов" min={1} max={dailyActivityStore.dailyActivitySettings.max_ifg} unit="баллов" initialValue={dailyActivityStore.dailyActivitySettings.ifg_scores>dailyActivityStore.dailyActivitySettings.max_ifg?dailyActivityStore.dailyActivitySettings.max_ifg:dailyActivityStore.dailyActivitySettings.ifg_scores} />
            <SliderInput title="Шаги" min={1000} max={30000} unit="шагов" step={500} initialValue={dailyActivityStore.dailyActivitySettings.steps} />
            <SliderInput title="Калории" min={100} max={3000} unit="ккал" step={50} initialValue={dailyActivityStore.dailyActivitySettings.calories} />
            <SliderInput title="Пролёты" min={1} max={50} unit="пролетов" initialValue={dailyActivityStore.dailyActivitySettings.floor_spans} />
            <Button disabled={dailyActivityStore.isLoading} onPress={onSave} fullWidth style={{justifyContent: 'center', alignItems: 'center', borderRadius: 16, height: 60, backgroundColor: colors.GREEN_COLOR}}>
                {dailyActivityStore.isLoading ? <ActivityIndicator /> : <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption, gs.medium]}>Сохранить</IfgText>}
            </Button>
        </CardContainer>
      <ArticleCard />
      <View style={{height: 100}} />
    </ScrollView>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>;};

const s = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 16,
    },
    cardGradientContainer:{
        flex: 1,
        padding: 16,
        flexDirection: 'column',
        gap: 10,
        overflow: 'hidden',
        borderRadius: 22,
      },
      buttonBack: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        backgroundColor: 'transparent',
        borderColor: colors.BORDER_COLOR2,
        borderWidth: 0.75,
        borderRadius: 8,
        width: 84,
        height: 26,
      },
      winnerCard: {
        borderRadius: 12,
        backgroundColor: colors.BLUE_COLOR,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 0,
      },
      input: {
        borderWidth: 1,
        borderColor: '#E4E4E4',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        textAlign: 'left',
        paddingLeft: 16,
      },
      slider: {
        width: Platform.OS === 'ios' ? '100%' : width - 36,
        alignSelf: 'center',
      },
      labels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      articleCard:{
        marginTop: 16,
        overflow: 'hidden',
        gap: 18,
        padding: 0,
        borderRadius: 16,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: '#E7E7E7',
        flexDirection: 'row',
    },
});
