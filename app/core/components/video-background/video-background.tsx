import React, { useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Video from 'react-native-video';

interface VideoBackgroundProps {
  source: any;
  children: React.ReactNode;
  style?: ViewStyle;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ source, children, style }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <View style={[styles.container, style && {...style}]}>
      <Video
        source={source}
        style={StyleSheet.absoluteFill}
        muted
        repeat
        resizeMode="cover"
        rate={1.0}
        ignoreSilentSwitch="obey"
        onLoad={() => setVideoLoaded(true)}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'transparent',
  },
});

export default VideoBackground;
