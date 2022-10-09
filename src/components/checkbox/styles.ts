import {StyleSheet} from 'react-native';
import {green, white} from '../../constants/colors';

const styles = StyleSheet.create({
  main: {
    borderWidth: 3,
    borderRadius: 8,
    width: 24,
    height: 24,
  },
  checked: {
    borderColor: green,
    backgroundColor: green,
    color: white,
  },
  unchecked: {
    borderColor: white,
    color: white,
  },
});

export default styles;
