import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../../colors/colors';
import { perfectSize } from '../../utils/pixelPerfect';


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
        width: perfectSize(20),
        height: perfectSize(20),
        borderRadius: perfectSize(10),
        // flex:1,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#00000025',
     },
     circleInside: {
        width: perfectSize(10),
        height: perfectSize(10),
        borderRadius: perfectSize(5),
        backgroundColor: colors.GREEN_COLOR,
     },
  });
