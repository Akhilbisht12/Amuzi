import {StyleSheet} from 'react-native';
import {black, gray, grayLight, white} from '../constants/colors';
import {height} from '../constants/dimensions';
import {bold, md, medium, nm, sm} from '../constants/fonts';
import {px2, py1, pyh} from '../constants/spacing';

const globalStyles = StyleSheet.create({
  button: {
    backgroundColor: white,
    paddingVertical: 0.015 * height,
    borderRadius: px2,
    marginVertical: pyh,
  },
  buttonLight: {
    backgroundColor: gray,
    paddingVertical: py1,
    borderRadius: px2,
    marginVertical: pyh,
  },
  buttonText: {
    color: black,
    fontSize: sm,
    fontFamily: medium,
    textAlign: 'center',
  },
  buttonLightText: {
    color: white,
    fontSize: sm,
    fontFamily: medium,
    textAlign: 'center',
  },
  textLight: {
    color: grayLight,
    fontSize: sm,
  },
  textHeading: {
    color: white,
    fontSize: nm,
    fontFamily: bold,
  },
  main: {
    flex: 1,
    backgroundColor: black,
  },
});

export default globalStyles;
