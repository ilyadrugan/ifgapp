import React, { FC, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  StatusBar,
  Platform,
} from 'react-native';
import { StoryModel } from '../../../../store/state/storiesStore/models/models';
import { PanGestureHandler } from 'react-native-gesture-handler';
import colors from '../../colors/colors';
import Close from '../../../../assets/icons/close.svg';
import { ShadowGradient } from '../gradient/shadow-gradient';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IfgText } from '../text/ifg-text';
import gs from '../../styles/global';
import { ButtonNext } from '../button/button';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export const StoryModal: FC<{stories: StoryModel[], category, isVisible: boolean, onClose: ()=>void }>
= ({ stories, category, isVisible, onClose }) => {
        const navigation = useNavigation<any>();

    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const progressAnims = useRef(
      stories.map(() => new Animated.Value(0)) // Массив анимаций для прогресс-баров
    ).current;
    const duration = 5000;
    const [paused, setPaused] = useState(false); // Состояние для приостановки анимации
    const [previousValue, setPreviousValue] = useState(0); // Значение прогресса на момент приостановки
    const [startTime, setStartTime] = useState(0); // Время начала анимации до приостановки
    const [pauseStartTime, setPauseStartTime] = useState(0); // Время начала паузы
    const insets = useSafeAreaInsets();
    // useEffect(() => {
    //   if (isVisible) {
    //     setCurrentStoryIndex(currentStoryPressed); // Сброс текущей стори при открытии
    //     startProgressAnimation(currentStoryPressed);
    //   }
    // }, [isVisible, currentStoryPressed]);

    useEffect(() => {
      startProgressAnimation(currentStoryIndex);
    }, [currentStoryIndex, isVisible]);

    const startProgressAnimation = (storyIndex: number) => {
      progressAnims[storyIndex].setValue(0); // Сброс анимации для текущей стори
      const duration = stories[storyIndex].duration || 5000; // Длительность текущей стори
      setStartTime(Date.now()); // Устанавливаем время начала анимации
      setPauseStartTime(0); // Сброс времени паузы

      Animated.timing(progressAnims[storyIndex], {
        toValue: 1,
        duration: duration,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
            // console.log('finished', finished);
          handleNextStory();
        }
      });
    };

    const handleNextStory = () => {
      if (currentStoryIndex < stories.length - 1) {
        setCurrentStoryIndex((prevIndex) => prevIndex + 1);
      } else {
        onClose(); // Закрыть модальное окно, если это последняя стори
        setCurrentStoryIndex(0);
      }
    };

    const handlePreviousStory = () => {
      if (currentStoryIndex > 0) {
        progressAnims[currentStoryIndex].stopAnimation(); // Останавливаем анимацию перед переходом
        setCurrentStoryIndex((prevIndex) => prevIndex - 1);
      }
    };

    const handlePauseProgressAnimation = () => {
      if (!paused) {
        progressAnims[currentStoryIndex].stopAnimation((value) => {
          setPreviousValue(value); // Сохраняем текущее значение прогресса
        });
        setPaused(true);
        setPauseStartTime(Date.now()); // Записываем время начала паузы
      }
    };

    const handleResumeProgressAnimation = () => {
      if (paused) {
        const elapsedPauseTime = Date.now() - pauseStartTime; // Считаем время паузы

        const duration = stories[currentStoryIndex].duration || 5000;
        const elapsedTime = Date.now() - startTime; // Время, прошедшее с начала анимации
        const remainingDuration = duration - elapsedTime; // Оставшееся время анимации
        // Возобновляем анимацию с оставшегося прогресса
        // console.log('handleResumeProgressAnimation',currentStoryIndex, previousValue,remainingDuration );
        progressAnims[currentStoryIndex].setValue(previousValue); // Устанавливаем прогресс с момента приостановки
        Animated.timing(progressAnims[currentStoryIndex], {
          toValue: 1,
          duration: (1 - previousValue) * duration, // Продолжаем оставшееся время после паузы
          useNativeDriver: false,
        }).start(({ finished }) => {
          if (finished) {
            handleNextStory();
          }
        });

        setPaused(false); // Анимация возобновлена
      }
    };

    // const panResponder = PanResponder.create({
    //   onStartShouldSetPanResponder: () => true,
    //   onPanResponderRelease: (evt, gestureState) => {
    //     if (gestureState.dx > 50) {
    //       // Свайп вправо (предыдущая)
    //       handlePreviousStory();
    //     } else if (gestureState.dx < -50) {
    //         handleNextStory();
    //     }
    //   },
    // });
    // const onSwipe = ({ nativeEvent }) => {
    //     if (nativeEvent.translationX > 50) {
    //       // Свайп вправо
    //       handlePreviousStory();
    //     } else if (nativeEvent.translationX < -50) {
    //       // Свайп влево
    //       handleNextStory();
    //     }
    //   };
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={false}
      onRequestClose={onClose}
    //   statusBarTranslucent={true}
    >

        <PanGestureHandler >
      <View style={styles.modalContainer}  >
        {/* <View style={{ transform: [{rotate: '180deg'}]}}> */}
        <LinearGradient
                colors={['transparent', `rgba(0, 0, 0, ${0.55})` ]}
                style={[styles.shadowGradient, {top: 0, transform: [{rotate: '180deg'}]} ]}
                />
        {/* </View> */}

        {/* Кнопка закрытия */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Close />
        </TouchableOpacity>

        {/* Прогресс-бары */}
        <View style={styles.progressBarContainer}>
          {stories.map((_, index) => (
            <View key={index} style={styles.progressBarWrapper}>
              {index < currentStoryIndex ? (
                <View style={styles.progressBarCompleted} />
              ) : index === currentStoryIndex ? (
                <Animated.View
                  style={[
                    styles.progressBarAnimated,
                    {
                      width: progressAnims[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                      }),
                    },
                  ]}
                />
              ) : (
                <View style={styles.progressBarInactive} />
              )}
            </View>
          ))}
        </View>

        {/* Область отображения стори */}
        <TouchableOpacity
          style={styles.touchableArea}
        //   onPress={handleNextStory}
          onPressIn={handlePauseProgressAnimation} // Приостанавливаем при нажатии
          onPressOut={handleResumeProgressAnimation} // Возобновляем при отпускании
          activeOpacity={1}
        >
          <Image
            source={{ uri: `https://abcd.100qrs.ru${stories[currentStoryIndex].cover}` }}
            style={styles.storyImage}
            resizeMode="cover"
          />
        <View>
        <IfgText style={[gs.fontBodyMedium, gs.bold, gs.ml32, {marginTop: 16}]}>{stories[currentStoryIndex].article.title}</IfgText>
        <IfgText style={[gs.fontBodyMedium, gs.bold, gs.ml32, {marginTop: 16}]}>{stories[currentStoryIndex].article.subtitle}</IfgText>
        </View>

        </TouchableOpacity>

        {/* Левая область для перехода */}
        {currentStoryIndex > 0 && (
          <TouchableOpacity
            style={styles.leftTouchableArea}
            onPress={handlePreviousStory}
            activeOpacity={1}
          />
        )}
        {/* Правая область для перехода */}
        {currentStoryIndex < stories.length && (
          <TouchableOpacity
            style={styles.rightTouchableArea}
            onPress={handleNextStory}
            activeOpacity={1}
          />
        )}
        <LinearGradient
                colors={['transparent', `rgba(0, 0, 0, ${0.55})` ]}
                style={[styles.shadowGradient, {bottom: 0 } ]}
                />
      </View>
      </PanGestureHandler>
      <View style={{position: 'absolute', width: '100%', bottom: 0,  alignItems: 'center',justifyContent: 'center', marginBottom: 50}}>
      <ButtonNext onPress={()=>{onClose(); navigation.navigate('ArticleView', {articleId: stories[currentStoryIndex].article.id});}} style={{width: width - 32 }} title="Читать статью" oliveTitle="+ 1 балл"/>
      </View>

    </Modal>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    storyButton: {
      margin: 10,
      alignItems: 'center',
    },
    storyPreview: {
      width: 100,
      height: 150,
      borderRadius: 10,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: '#F0E8F3',
      justifyContent: 'center',
      alignItems: 'center',
    //   height: height,
    },
    closeButton: {
      position: 'absolute',
      top: 38,
      right: 20,
      zIndex: 2,
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: colors.WHITE_COLOR,
      justifyContent: 'center',
      alignItems: 'center',
    },
    closeButtonText: {
      fontSize: 32,
      color: 'white',
    },
    progressBarContainer: {
        flexDirection: 'row',
        position: 'absolute',
        top: 20,
        width: '90%',
      },
      progressBarWrapper: {
        flex: 1,
        height: 3,
        marginHorizontal: 2,
        borderRadius: 2,
        backgroundColor: '#FFFFFF59', // Задний фон прогресса
        overflow: 'hidden',
      },
      progressBarCompleted: {
        flex: 1,
        backgroundColor: '#ffffff',
      },
      progressBarAnimated: {
        flex: 1,
        backgroundColor: '#ffffff',
        height: '100%',
      },
      progressBarInactive: {
        flex: 1,
        backgroundColor: '#FFFFFF59',
      },
    touchableArea: {
      flex: 1,
      width: width,
    //   justifyContent: 'center',
      alignItems: 'flex-start',
      flexDirection: 'column',
    //   zIndex: 99,
    },
    storyImage: {
      marginTop: height * 0.2,
      width: '100%',
      height: 200,
    },

    leftTouchableArea: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: '30%',
      zIndex: 1,
    },
    rightTouchableArea: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: '30%',
        zIndex: 1,
    },
    shadowGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 0,
        height: 110,
        elevation: 10,
      },
  });
