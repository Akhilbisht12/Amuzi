import {StyleSheet, Dimensions} from 'react-native';
import {gray, grayLight, green} from '../../constants/colors';
import {bold, nm, sm} from '../../constants/fonts';
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
    marginVertical: 0.01 * height,
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
    fontSize: sm,
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
