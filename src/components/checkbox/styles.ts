import {StyleSheet} from 'react-native';
import {green, white} from '../../constants/colors';

const styles = StyleSheet.create({
  main: {
    borderWidth: 3,
    borderRadius: 6,
    width: 24,
    height: 24,
  },
  checked: {
    borderColor: green,
    backgroundColor: green,
  },
  unchecked: {
    borderColor: white,
  },
});

export default styles;
