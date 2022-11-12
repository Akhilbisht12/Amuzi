import {Dimensions, StyleSheet} from 'react-native';
import {gray, green, white} from '../../constants/colors';
import {xl} from '../../constants/fonts';

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 1,
  },
  input: {
    height: 0.1 * height,
    backgroundColor: gray,
    width: 0.2 * width,
    borderRadius: 0.05 * width,
    fontSize: xl,
    textAlign: 'center',
    color: white,
  },
  inputBorder: {
    borderWidth: 1,
    borderColor: green,
    borderRadius: 0.05 * width,
  },
});

export default styles;
