import {StyleSheet} from 'react-native';
import {black, gray, green, white} from '../constants/colors';
import {bold, medium, nm, sm} from '../constants/fonts';
import {px2, px4, py1, pyh} from '../constants/spacing';

const globalStyles = StyleSheet.create({
  button: {
    backgroundColor: white,
    paddingVertical: py1,
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
    color: '#f9f9f9',
    lineHeight: 23,
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
  flag: {
    borderTopRightRadius: px4,
    borderBottomLeftRadius: px4,
    backgroundColor: green,
    borderWidth: 2,
    borderColor: green,
    color: black,
    position: 'absolute',
    right: 0,
    top: 0,
    paddingHorizontal: px4,
    paddingVertical: pyh,
  },
});

export default globalStyles;
