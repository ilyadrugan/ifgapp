import { Image, ImageBackground, View } from 'react-native';
import React, { FC, memo, useState } from 'react';
import {
  runOnJS, useAnimatedReaction, useDerivedValue, useSharedValue,
} from 'react-native-reanimated';
import { StoryImageProps } from '../../core/dto/componentsDTO';
import Loader from '../Loader';
import { HEIGHT, LOADER_COLORS, WIDTH } from '../../core/constants';
import ImageStyles from './Image.styles';
import StoryVideo from './video';
import { StoryItemProps } from '../../core/dto/instagramStoriesDTO';
import { useSafeAreaFrame } from 'react-native-safe-area-context';

const StoryImage: FC<StoryImageProps> = ( {
  stories, activeStory, defaultStory, isDefaultVideo, paused, videoProps, isActive,
  mediaContainerStyle, imageStyles, imageProps, videoDuration, onImageLayout, onLoad, children,
} ) => {
  const frame = useSafeAreaFrame();
  const deviceHeight = frame.height;
  const [ data, setData ] = useState<{ data?: StoryItemProps, isVideo?: boolean }>(
    { data: defaultStory, isVideo: isDefaultVideo },
  );

  const loading = useSharedValue( true );
  const color = useSharedValue( LOADER_COLORS );
  const duration = useSharedValue<number | undefined>( undefined );
  const isPaused = useDerivedValue( () => paused.value || !isActive.value );

  const onImageChange = async () => {

    if ( !activeStory.value ) {

      return;

    }

    const story = stories.find( ( item ) => item.id === activeStory.value );

    if ( !story ) {

      return;

    }

    if ( data.data?.id === story.id ) {

      if ( !loading.value ) {

        onLoad( duration.value );

      }

    } else {

      loading.value = true;
      setData( { data: story, isVideo: story.mediaType === 'video' } );

    }

    const nextStory = stories[stories.indexOf( story ) + 1];

    if ( nextStory && nextStory.mediaType !== 'video' && ( nextStory.source as any )?.uri ) {

      Image.prefetch( ( nextStory.source as any )?.uri );

    }

  };

  useAnimatedReaction(
    () => isActive.value,
    ( res, prev ) => res !== prev && res && runOnJS( onImageChange )(),
    [ isActive.value, onImageChange ],
  );

  useAnimatedReaction(
    () => activeStory.value,
    ( res, prev ) => res !== prev && runOnJS( onImageChange )(),
    [ activeStory.value, onImageChange ],
  );

  const onContentLoad = ( newDuration?: number ) => {

    const animationDuration = ( data?.data?.mediaType === 'video' ? videoDuration : undefined ) ?? data.data?.animationDuration ?? newDuration;
    duration.value = animationDuration;

    loading.value = false;

    if ( isActive.value ) {

      onLoad( animationDuration );

    }

  };
  // console.log(data.data?.source);
  return (
    <>
      <View style={ImageStyles.container}>
        <Loader loading={loading} color={color} size={50} />
      </View>
      {/* <ImageBackground blurRadius={60}
      // source={data.data.source}
      source={require('./photo.jpg')}
       style={[ ImageStyles.image916, mediaContainerStyle ]}> */}
        {data.data?.source && (
          data.isVideo ? (
            <StoryVideo
              onLoad={onContentLoad}
              onLayout={onImageLayout}
              source={data.data.source}
              paused={isPaused}
              isActive={isActive}
              {...videoProps}
            />
          ) : (
            <ImageBackground blurRadius={200}
            source={data.data.source}
            style={[ mediaContainerStyle ]}
            >
              <ImageBackground
                // source={require('./photo.jpg')}
                source={data.data.source}

                style={[ ImageStyles.image ]}
                resizeMode="contain"
                testID="storyImageComponent"
                onLayout={( e ) => onImageLayout( Math.min( deviceHeight, e.nativeEvent.layout.height ) )}
                onLoad={() => onContentLoad()}
                {...imageProps}
                >
                {children}
              </ImageBackground>
            </ImageBackground>
          )
        )}
      {/* </ImageBackground> */}
    </>
  );

};

export default memo( StoryImage );
