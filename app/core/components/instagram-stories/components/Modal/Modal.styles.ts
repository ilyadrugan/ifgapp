import { StyleSheet } from 'react-native';
import { HEIGHT, WIDTH } from '../../core/constants';

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: '#000',
    width: WIDTH,
    height: HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    width: WIDTH,
    height: HEIGHT,
    justifyContent: 'center',
  },
  bgAnimation: StyleSheet.absoluteFillObject,
} );
