import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import PlayButton from '../../../../assets/icons/play-video-button.svg';
import colors from '../../colors/colors';
import { IfgText } from '../text/ifg-text';
import gs from '../../styles/global';

interface RutubeViewProps {
  url: string; // Ссылка на видео (публичное или приватное)
  title?: string;
  width?: number | string;
  height?: number;
  thumbnailUrl?: string | ReturnType<typeof require>; // Поддержка URL и require()
}

const RutubeView: React.FC<RutubeViewProps> = ({ url, title, width = '100%', height = (Dimensions.get('window').width) / 19 * 9, thumbnailUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const isPrivateVideo = url.includes('private/');

  const getEmbedUrl = (rutubeUrl: string): string => {
    if (isPrivateVideo) {
      const splited = rutubeUrl.split('private/');
      const videoId = splited[1].split('/')[0];
      const accessKeyMatch = rutubeUrl.match(/[?&]p=([\w\d]+)/);
      const accessKey = accessKeyMatch ? accessKeyMatch[1] : null;

      if (videoId) {
        let embedUrl = `https://rutube.ru/play/embed/${videoId}`;

        if (accessKey) {
          embedUrl += `/?p=${accessKey}`;
        }

        return embedUrl;
      }
    }
    else {
      const videoIdMatch = rutubeUrl.match(/(?:video|embed)\/([\w\d]+)/);
      const videoId = videoIdMatch ? videoIdMatch[1] : null;

      if (videoId) {
        let embedUrl = `https://rutube.ru/play/embed/${videoId}`;
        return embedUrl;
      }
    }

    return rutubeUrl; // Если не удалось распарсить ID, вернуть оригинальный URL
  };

  useEffect(() => {
    setEmbedUrl(getEmbedUrl(url));
  }, [url]);

  // 🔹 Функция запуска видео
  const handlePress = () => {
    setLoading(true);
    setIsPlaying(true);
  };

  return (
    <View style={[styles.container, { width, height }]}>
      {!isPlaying ? (
        <TouchableOpacity style={styles.thumbnailContainer} onPress={handlePress} activeOpacity={0.7}>
          {thumbnailUrl ? (
            typeof thumbnailUrl === 'number' ? (
              <Image source={thumbnailUrl} style={[styles.thumbnail]} resizeMode="cover"  />
            ) : (
              <Image source={{ uri: thumbnailUrl }} style={[styles.thumbnail]} resizeMode="cover" />
            )
          ) : (
            <View style={[styles.placeholder, { width, height }]}>
              <ActivityIndicator size="large" color="#FFF" />
            </View>
          )}
          <View style={styles.playButtonContainer}>
            <View style={styles.playButton}>
              <PlayButton />
            </View>
            {title && <IfgText color={colors.WHITE_COLOR} style={[gs.fontCaption2, gs.mt16]}>{title}</IfgText>}
          </View>
        </TouchableOpacity>
      ) : (
        embedUrl && (
          <WebView
            source={{ uri: embedUrl }}
            style={{ flex: 1 }}
            javaScriptEnabled
            domStorageEnabled
            allowsFullscreenVideo
            onLoadEnd={() => setLoading(false)}
          />
        )
      )}

      {loading && <ActivityIndicator style={styles.loader} size="large" color="#FFF" />}
    </View>
  );
};

// 🔹 Стили
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  thumbnailContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  thumbnail: {
    // position: 'absolute',
    width: '100%',
    height: '100%',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  playButtonContainer: {
    position: 'absolute',
    // borderRadius: 25, // Закругленные края
    // padding: 10, // Внутренний отступ для удобства нажатия
    flexDirection: 'column',
    alignItems: 'center',
  },
  playButton: {
    // position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -15,
    marginTop: -15,
  },
});

export default RutubeView;
