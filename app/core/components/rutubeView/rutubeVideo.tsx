import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import PlayButton from '../../../../assets/icons/play-video-button.svg';

interface RutubeViewProps {
  url: string; // Ссылка на видео (публичное или приватное)
  width?: number;
  height?: number;
  thumbnailUrl?: string; // Превью-картинка (если есть)
}

const RutubeView: React.FC<RutubeViewProps> = ({ url, width = 320, height = 180, thumbnailUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 Проверяем, является ли видео приватным
  const isPrivateVideo = url.includes('private/');

  // 🔹 Функция запуска видео
  const handlePress = () => {
    setLoading(true);
    setIsPlaying(true);
  };

  return (
    <View style={[styles.container, { width, height }]}>
      {!isPlaying ? (
        <TouchableOpacity style={styles.thumbnailContainer} onPress={handlePress} activeOpacity={0.7}>
          {/* Превью (если передано) */}
          {thumbnailUrl ? (
            <Image source={{ uri: thumbnailUrl }} style={[styles.thumbnail, { width, height }]} resizeMode="cover" />
          ) : (
            <View style={[styles.placeholder, { width, height }]}>
              <ActivityIndicator size="large" color="#FFF" />
            </View>
          )}
          {/* Кнопка Play */}
          <View style={styles.playButton}>
           <PlayButton/>
           </View>
        </TouchableOpacity>
      ) : (
        <WebView
          source={{ uri: url }} // Используем оригинальный URL
          style={{ flex: 1 }}
          javaScriptEnabled
          domStorageEnabled
          allowsFullscreenVideo
          onLoadEnd={() => setLoading(false)}
        />
      )}
      {loading && <ActivityIndicator style={styles.loader} size="large" color="#FFF" />}
    </View>
  );
};

// 🔹 Стили
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  thumbnailContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  playButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    width: 40,
    height: 40,
    tintColor: '#FFF',
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
