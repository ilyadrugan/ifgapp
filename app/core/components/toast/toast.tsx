import { FC } from 'react';
import { default as ReactNativeToast } from 'react-native-toast-message';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { ToastShowParams } from 'react-native-toast-message/lib/src/types';
import gs from '../../styles/global';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
import colors from '../../colors/colors';
import { IfgText } from '../text/ifg-text';
import Checked from '../../../../assets/icons/checkedInvert.svg';
const toast = (props: ToastShowParams, type: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const insets = useSafeAreaInsets();
  return (<>
    <View style={[s.container, { marginBottom: insets.bottom }]}>
      <TouchableWithoutFeedback onPress={() => {
        ReactNativeToast.hide();
      }}>
        <View style={[s.toast, { marginBottom: 0, backgroundColor: type === 'error' ? '#facccc' : colors.GREEN_COLOR }]}>

          {type === 'success' &&
            <Checked />
          }

          {/* {type === 'error' &&
            <Icon color={theme.RED_COLOR}
              icon={'icon-close-circle-24'}/>
          } */}

          <View style={s.text}>
            <IfgText color={type === 'error' ? colors.PLACEHOLDER_COLOR : colors.WHITE_COLOR} style={[s.text1, gs.h3, gs.center, {fontFamily: 'tilda-sans_regular'}]}>{props.text1}</IfgText>
            {props.text2 &&
              <IfgText color={colors.WHITE_COLOR} style={[s.text2, gs.fontBody2, gs.center]}>{props.text2}</IfgText>
            }
          </View>

          {/* <Icon color={theme.ICON_COLOR} size={16} icon={'icon-close-16'}/> */}

        </View>
      </TouchableWithoutFeedback>
    </View>
  </>);
};

const toastConfig = {
  success: (props: ToastShowParams) => toast(props, 'success'),
  error: (props: ToastShowParams) => toast(props, 'error'),
};

export const Toast: FC = () => {
  return (<>
    <ReactNativeToast config={toastConfig} position={'top'}/>
  </>);
};

export const successToast = (text: string, bottomText?: string, visibilityTime?: number) => {
  ReactNativeToast.show({
    type: 'success',
    text1: text,
    text2: bottomText,
    bottomOffset: 0,
    visibilityTime: visibilityTime || 4000,
  });
};

export const errorToast = (text: string, bottomText?: string, visibilityTime?: number) => {
  ReactNativeToast.show({
    type: 'error',
    text1: text,
    text2: bottomText,
    bottomOffset: 0,
    visibilityTime: visibilityTime || 4000,
  });
};


const s = StyleSheet.create({
  container: {
    width: '100%',
  },
  toast: {
    backgroundColor: colors.GREEN_LIGHT_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    margin: 8,
    marginBottom: 17,
    padding: 18,
  },
  text: {
    marginLeft: 18,
    marginRight: 18,
    flex: 1,
  },
  text1: {
    color: 'white',
  },
  text2: {
    color: colors.WHITE_COLOR,
  },
});
