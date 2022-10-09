import {Dimensions, StyleSheet} from 'react-native';
import {gray, green, white} from '../../constants/colors';
import {xl, xxs} from '../../constants/fonts';

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
    borderRadius: xxs,
    fontSize: xl,
    textAlign: 'center',
    color: white,
  },
  inputBorder: {
    borderWidth: 1,
    borderColor: green,
  },
});

export default styles;
