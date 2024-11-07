import { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../colors/colors';
import CheckedIcon from '../../../../assets/icons/checked.svg';


export const CheckBox: FC<{
    checked?: boolean,
    onPress?: () => void,
  }> = ({ checked, onPress }) => {

    return (<>
    <TouchableOpacity onPress={onPress} style={[s.container, checked ? s.checked : s.unchecked]} >
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
