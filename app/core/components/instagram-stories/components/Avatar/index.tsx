import React, { FC, memo } from 'react';
import {
  View, Image, Text, TouchableOpacity, StyleSheet,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, useDerivedValue, withTiming,
} from 'react-native-reanimated';
import { StoryAvatarProps } from '../../core/dto/componentsDTO';
import AvatarStyles from './Avatar.styles';
import Loader from '../Loader';
import { AVATAR_OFFSET } from '../../core/constants';
import gs from '../../../../styles/global';
import { hexToRgba } from '../../../../utils/hexToRGBA';
import { IfgText } from '../../../text/ifg-text';
import item from '../Progress/item';

const AnimatedImage = Animated.createAnimatedComponent( Image );

const StoryAvatar: FC<StoryAvatarProps> = ( {
  id,
  avatarSource,
  name,
  stories,
  loadingStory,
  seenStories,
  onPress,
  colors,
  seenColors,
  size,
  showName,
  nameTextStyle,
  nameTextProps,
  renderAvatar,
  avatarBorderRadius,
  bgColor,
} ) => {

  const loaded = useSharedValue( false );
  const isLoading = useDerivedValue( () => loadingStory.value === id || !loaded.value );
  const seen = useDerivedValue(
    () => seenStories.value[id] === stories[stories.length - 1]?.id,
  );
  const loaderColor = useDerivedValue( () => ( seen.value ? seenColors : colors ) );

  const onLoad = () => {

    loaded.value = true;

  };

  const imageAnimatedStyles = useAnimatedStyle( () => (
    { opacity: withTiming( isLoading.value ? 0.5 : 1 ) }
  ) );

  if ( renderAvatar ) {

    return renderAvatar( seen.value );

  }

  if ( !avatarSource ) {

    return null;

  }

  return (
    <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.6} onPress={onPress} testID={`${id}StoryAvatar${stories.length}Story`}
        style={[
                  styles.avatarWrapper,
                  {
                    borderColor: bgColor,
                    backgroundColor: hexToRgba(bgColor, 0.07),
                    width: 124,
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    overflow: 'hidden',
                    height: 166,
                    padding:0,
                    borderRadius: 16,
                    borderWidth: 1,
                  },
                ]}
        >
          {/* <Loader loading={isLoading} color={loaderColor} size={size + AVATAR_OFFSET } /> */}

          <Image
        style={{width: 100, height: 100, alignSelf: 'center', marginTop: 20}}
        source={avatarSource}
      />
        {showName && (
        <IfgText numberOfLines={2} style={[gs.fontLightSmall, gs.regular, {paddingHorizontal: 8, paddingBottom: 8}]}>{name}</IfgText>
        )}
        </TouchableOpacity>
      </View>
      );

};



export default memo( StoryAvatar );

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginRight: 10,
  },
  avatarWrapper: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: 'red',
    // borderRadius: 100,
    height: 64,
    width: 64,
  },
  text: {
    marginTop: 3,
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 11,
  },
});
