import {StyleSheet, Dimensions} from 'react-native';
import {black, gray, grayLight, green} from '../../constants/colors';
import {bold} from '../../constants/fonts';
import {px2} from '../../constants/spacing';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  buttonBgGreen: {
    backgroundColor: green,
  },
  buttonBgGray: {
    backgroundColor: gray,
  },
  button: {
    paddingVertical: 16,
    marginVertical: 0.02 * height,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundedFull: {
    borderRadius: 50,
  },
  rounded: {
    borderRadius: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: bold,
    marginRight: px2,
  },
  titleColorBlack: {
    color: gray,
  },
  titleColorGray: {
    color: grayLight,
  },
});

export default styles;
