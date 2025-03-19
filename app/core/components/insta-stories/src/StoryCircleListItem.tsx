import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';

import { usePrevious } from './helpers/StateHelpers';
import { IUserStory, StoryCircleListItemProps } from './interfaces/interfaces';

import DEFAULT_AVATAR from './assets/images/no_avatar.png';
import { hexToRgba } from '../../../utils/hexToRGBA';
import { IfgText } from '../../text/ifg-text';
import gs from '../../../styles/global';

const StoryCircleListItem = ({
  item,
  unPressedBorderColor,
  pressedBorderColor,
  unPressedAvatarTextColor,
  pressedAvatarTextColor,
  avatarSize = 60,
  showText,
  avatarTextStyle,
  handleStoryItemPress,
  avatarImageStyle,
  avatarWrapperStyle,
}: StoryCircleListItemProps) => {
  const [isPressed, setIsPressed] = useState(item?.seen);

  const prevSeen = usePrevious(item?.seen);

  useEffect(() => {
    if (prevSeen != item?.seen) {
      setIsPressed(item?.seen);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.seen]);

  const _handleItemPress = (item: IUserStory) => {
    if (handleStoryItemPress) {handleStoryItemPress(item);}

    setIsPressed(true);
  };

  const avatarWrapperSize = avatarSize + 4;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => _handleItemPress(item)}
        style={[
          styles.avatarWrapper,
          {
            height: avatarWrapperSize,
            width: avatarWrapperSize,
            borderColor: item.bgColor,
            backgroundColor: hexToRgba(item.bgColor, 0.07),
          },
          avatarWrapperStyle,
          // !isPressed
          //   ? {
          //       borderColor: unPressedBorderColor ?? 'red',
          //     }
          //   : {
          //       borderColor: pressedBorderColor ?? 'grey',
          //     },
        ]}
      >
        <Image
          style={[
            {
              height: avatarSize,
              width: avatarSize,
              borderRadius: 100,
            },
            avatarImageStyle,
          ]}
          source={{uri: 'https://abcd.100qrs.ru/storage/' + item.user_image}}
          defaultSource={Platform.OS === 'ios' ? DEFAULT_AVATAR : null}
        />
        {showText && (
          <IfgText numberOfLines={2} style={[gs.fontLightSmall, gs.regular, {paddingHorizontal: 8, paddingBottom: 8}]}>{item.user_name}</IfgText>
      )}
      </TouchableOpacity>

    </View>
  );
};

export default StoryCircleListItem;

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
    borderRadius: 100,
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
