import { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../colors/colors';
import CheckedIcon from '../../../../assets/icons/checked.svg';
import React from 'react';


export const CheckBox: FC<{
    checked?: boolean,
    onPress?: () => void,
    disabled?: boolean
  }> = ({ checked, onPress, disabled }) => {

    return (<>
    <TouchableOpacity disabled={disabled} onPress={onPress} style={[s.container, checked ? s.checked : s.unchecked]} >
        {checked && <CheckedIcon />}
    </TouchableOpacity>
    </>);
  };

  const s = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent:'center',
        width: 24,
        height: 24,
        borderRadius: 6,
     },
     checked: {
        backgroundColor: colors.GREEN_COLOR,
     },
     unchecked: {
        borderColor: colors.BORDER_COLOR,
        borderWidth: 1,
        backgroundColor: 'transparent',
     },
  });
