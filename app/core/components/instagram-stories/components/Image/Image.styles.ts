import { StyleSheet } from 'react-native';
import { ScreenHeight, ScreenWidth } from '../../../../../hooks/useDimensions';
import { HEIGHT, WIDTH } from '../../core/constants';

export default StyleSheet.create( {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    // alignItems: 'center',
    // justifyContent: 'center',
    width: WIDTH,
    height: HEIGHT,
    // resizeMode: 'cover',
  },
} );
