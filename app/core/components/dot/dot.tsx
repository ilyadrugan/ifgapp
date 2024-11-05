import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../../colors/colors';


export const Dot: FC<{
    active?: boolean,
  }> = ({ active }) => {

    return (<>
    <View style={s.circle} >
        {active && <View style={s.circleInside} />}
    </View>
    </>);
  };

  const s = StyleSheet.create({
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        // flex:1,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#00000025',
     },
     circleInside: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.GREEN_COLOR,
     },
  });
