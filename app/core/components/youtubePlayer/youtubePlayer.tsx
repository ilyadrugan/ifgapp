import React, { FC } from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Dimensions, Platform } from 'react-native';

export const youtube_parser = (url: string) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
};

export const YoutubeVideo: FC<{ videoId: string }> = ({ videoId }) => {
  const windowWidth = Dimensions.get('window').width - 32;
  return <YoutubePlayer
    webViewStyle={ Platform.OS === 'android' && { opacity:0.99 } }
    height={(windowWidth / 16) * 9}
    // width={windowWidth}
    videoId={videoId}
  />;
};
