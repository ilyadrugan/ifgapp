import React, { FC, ReactNode, useRef, useState } from 'react';
import { StyleSheet, StyleProp, TextStyle, Image, View, TouchableOpacity, Dimensions, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import Video from 'react-native-video';
import PlayButton from '../../../../assets/icons/play-video-button.svg';
import colors from '../../colors/colors';
import { IfgText } from '../text/ifg-text';
import gs from '../../styles/global';
const img1 = require('../../../../assets/thumbnails/thumbnail1.png');
const img2 = require('../../../../assets/thumbnails/coverage1.png');
const img3 = require('../../../../assets/thumbnails/coverage2.png');
export const VideoPlayer: FC<{
    style?: StyleProp<TextStyle>,
    source: string,
    title?: string,
    thumbnailName: string,
    disabled?: boolean,
  }> = ({  style, source, title, thumbnailName, disabled }) => {
    const videoRef = useRef(null);
    const [isPaused, setIsPaused] = useState(true); // Управляет состоянием "Play/Pause"
    const [isFocused, setIsFocused] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    var thumbnailsImages = {
      // thumbnail1: img1,
      coverage1: img2,
      coverage2: img3,
  };

    const handlePress = () => {
        // "Фокусировка" при нажатии на видео

        setIsFocused(!isFocused);

        // Сбрасываем фокус через некоторое время (например, 5 секунд)
        setTimeout(() => {
          setIsFocused(false);
        }, 5000);
      };
    const handlePlayPause = () => {
      setIsPaused(!isPaused);
    };
    const controlOptions = {
        hidePlayPause: true,
        hideForward: true,
        hideRewind: true,
        hideNext: true,
        hidePrevious: true,
        hideFullscreen: true,
    };

    return (<>
     <View style={[s.videoContainer, isPlaying && {backgroundColor: 'black'}]}>
     {!isPlaying ? (
        <View style={s.thumbnailContainer}>
        <ImageBackground
            source={thumbnailsImages[thumbnailName]} // Замените URL на превью
            style={s.thumbnail}
            resizeMode="cover"
          >
          <TouchableOpacity
          style={s.playButtonContainer}
          disabled={disabled}
          onPress={()=>{setIsPlaying(true); setIsPaused(!isPaused);}}
        >

          {isPaused ?
          <PlayButton />
          :
           isFocused && <View style={s.playPauseCircle}>
              <View style={s.pauseLine} />
              <View style={s.pauseLine} />
          </View>}
          {title && <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption2, gs.mt16]}>{title}</IfgText>}

            </TouchableOpacity>
        </ImageBackground>
        </View>
      ) : (<>
        <TouchableWithoutFeedback  onPress={handlePress}>
        <Video
          ref={videoRef}
          source={{ uri: source }} // Ссылка на видео
          style={s.video}
          controls         // Показать встроенные элементы управления (play, pause и т. д.)
          controlsStyles={controlOptions}
          resizeMode="contain" // Настройка масштаба видео
          paused={isPaused} // Управление проигрыванием
          onEnd={() => setIsPaused(true)}
          onError={(err)=>console.log(err)}
          onLoad={(video)=>console.log('Video is ready to play', video)}
        />
            </TouchableWithoutFeedback>

              {/* Кастомная кнопка Play/Pause поверх видео */}
        <TouchableOpacity
          style={s.playButtonContainer}
          onPress={handlePlayPause}
        >

          {isPaused ?
          <PlayButton />
          :
           isFocused && <View style={s.playPauseCircle}>
              <View style={s.pauseLine} />
              <View style={s.pauseLine} />
          </View>}

        </TouchableOpacity>
        </>
      )}

    </View>
    </>);
  };

  const s = StyleSheet.create({
    text: {
      fontSize: 16,
      lineHeight: 24,
      ...gs.medium,
    },
    videoContainer: {
        flex: 1,
        borderRadius: 22,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        height: (Dimensions.get('window').width) / 19 * 10,
        width: '100%',
      },
      video: {
        width: '100%',
        height: (Dimensions.get('window').width) / 19 * 10,
      },
      playButtonContainer: {
        position: 'absolute',
        borderRadius: 25, // Закругленные края
        padding: 10, // Внутренний отступ для удобства нажатия
        flexDirection: 'column',
        alignItems: 'center',
      },
      pauseLine: {
        width: 8,
        height: 23,
        backgroundColor: colors.WHITE_COLOR,
      },
      playPauseCircle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 65,
        height: 65,
        gap: 6,
        backgroundColor: colors.GREEN_LIGHT_COLOR,
        borderRadius: 40,
      },
      thumbnailContainer: {
        // position: 'relative',
        width: '100%',
        height: (Dimensions.get('window').width) / 19 * 10,
      },
      thumbnail: {
        width: '100%',
        height: (Dimensions.get('window').width) / 19 * 10,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 12,
      },
  });
