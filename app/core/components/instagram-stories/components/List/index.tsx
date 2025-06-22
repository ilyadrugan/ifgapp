import React, { FC, memo } from 'react';
import Animated, {
  useAnimatedStyle, useDerivedValue, useSharedValue, withTiming,
} from 'react-native-reanimated';
import StoryAnimation from '../Animation';
import ListStyles from './List.styles';
import StoryImage from '../Image';
import Progress from '../Progress';
import StoryHeader from '../Header';
import { StoryListProps } from '../../core/dto/componentsDTO';
import { HEIGHT } from '../../core/constants';
import StoryContent from '../Content';
import StoryFooter from '../Footer';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../../../../colors/colors';
import LinearGradient from 'react-native-linear-gradient';
import gs from '../../../../styles/global';

const StoryList: FC<StoryListProps> = ( {
  id, stories, index, x, activeUser, activeStory, progress, seenStories, paused,
  onLoad, videoProps, progressColor, progressActiveColor, mediaContainerStyle, imageStyles,
  imageProps, progressContainerStyle, imageOverlayView, hideElements, hideOverlayViewOnLongPress,
  videoDuration, ...props
} ) => {
  // const frame = useSafeAreaFrame();
  // const deviceHeight = frame.height;
  const imageHeight = useSharedValue( HEIGHT );
  const isActive = useDerivedValue( () => activeUser.value === id );

  const activeStoryIndex = useDerivedValue(
    () => stories.findIndex( ( item ) => item.id === activeStory.value ),
  );

  const animatedStyles = useAnimatedStyle( () => ( { height: imageHeight.value } ) );
  const contentStyles = useAnimatedStyle( () => ( {
    opacity: withTiming( hideElements.value ? 0 : 1 ),
  } ) );

  const onImageLayout = ( height: number ) => {

    imageHeight.value = height;

  };

  const lastSeenIndex = stories.findIndex(
    ( item ) => item.id === seenStories.value[id],
  );



  return (
    <StoryAnimation x={x} index={index}>
      <Animated.View style={[ animatedStyles, ListStyles.container ]}>
        <StoryImage
          stories={stories}
          activeStory={activeStory}
          defaultStory={stories[lastSeenIndex + 1] ?? stories[0]}
          isDefaultVideo={( stories[lastSeenIndex + 1]?.mediaType ?? stories[0]?.mediaType ) === 'video'}
          onImageLayout={onImageLayout}
          onLoad={onLoad}
          paused={paused}
          isActive={isActive}
          videoProps={videoProps}
          mediaContainerStyle={mediaContainerStyle}
          imageStyles={imageStyles}
          imageProps={imageProps}
          videoDuration={videoDuration}
        >
          <Animated.View style={[ contentStyles, ListStyles.content  ]} pointerEvents="box-none">
            <LinearGradient
              colors={['rgba(0,0,0,0.33)', 'transparent']}
              style={gs.shadowOverlay}
              pointerEvents="none"
            />
            <Progress
              active={isActive}
              activeStory={activeStoryIndex}
              progress={progress}
              length={stories.length}
              progressColor={progressColor || colors.GRAY_COLOR2}
              progressActiveColor={progressActiveColor}
              progressContainerStyle={progressContainerStyle}
            />
            <StoryHeader {...props} />
            <StoryContent stories={stories} active={isActive} activeStory={activeStory} />
            <StoryFooter stories={stories} active={isActive} activeStory={activeStory} />
          </Animated.View>
          </StoryImage>
        <Animated.View
          style={[
            hideOverlayViewOnLongPress ? contentStyles : {},
            ListStyles.content,
          ]}
          pointerEvents="auto"
        >
          {imageOverlayView}
        </Animated.View>
      </Animated.View>

    </StoryAnimation>
  );

};

export default memo( StoryList );
