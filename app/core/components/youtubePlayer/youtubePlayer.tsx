import React, { FC, useEffect, useState } from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Dimensions, Platform, View, StyleSheet, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { IfgText } from '../text/ifg-text';
import { Button } from '../button/button';
import colors from '../../colors/colors';
import gs from '../../styles/global';

export const youtube_parser = (url: string) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
};

export const YoutubeVideo: FC<{ videoId: string }> = ({ videoId }) => {
  const [hasError, setHasError] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkVideoAvailability(videoId);
  }, [videoId]);

  const checkVideoAvailability = async (id) => {
    try {
      // setIsLoading(true);
      await Promise.race([
        fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`)
          .then(response => {
            if (!response.ok) {throw new Error('Видео недоступно');}
          }),
        new Promise((_, reject) => setTimeout(() => {
          // setIsLoading(false);
          reject(new Error('Таймаут запроса'));
        }, 3000)),
      ]);

    } catch (error) {
      setHasError(true);
      // setIsLoading(false);
    }
  };
  const windowWidth = Dimensions.get('window').width - 32;
  return <View style={styles.container}>
    {hasError ? (
        // Заглушка, если видео не загружается
        <View style={styles.placeholder}>
          <IfgText style={[gs.mb12, {maxWidth: '80%', textAlign: 'center'}]}>{'Вероятно, видео недоступно в вашем регионе :('}</IfgText>
          <Button
            style={styles.button}
            onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${videoId}`)}
          >
            <IfgText color={colors.WHITE_COLOR}>Открыть в браузере</IfgText>
          </Button>
        </View>
      ) :
    <YoutubePlayer
    webViewStyle={ Platform.OS === 'android' && { opacity:0.99 } }
    height={(Dimensions.get('window').width) / 19 * 9}
    // width={windowWidth}
    videoId={videoId}
    // onError={() => {
    //   setHasError(true);}}
  />}
   </View>;
};


const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: 20,
    height: 200,
    width: '100%',
    // overflow: 'hidden',
  },
  placeholder: {
    height: 200,
    width: '100%',
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    position: 'absolute',
  },
  button: { backgroundColor: colors.GREEN_COLOR, paddingHorizontal: 10,  borderRadius: 6, height: 42 },
});
