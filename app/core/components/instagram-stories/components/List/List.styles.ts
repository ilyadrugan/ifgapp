import { StyleSheet } from 'react-native';
import { HEIGHT, WIDTH } from '../../core/constants';

export default StyleSheet.create( {
  container: {
    // borderRadius: 8,
    overflow: 'hidden',
    width: WIDTH,
    height: HEIGHT,
    bottom: 10,
  },
  content: {
    position: 'relative',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    width: WIDTH,
    height: HEIGHT,
  },
} );
