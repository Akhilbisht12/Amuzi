import {StyleSheet} from 'react-native';
import {black, gray, grayLight, white} from '../constants/colors';
import {width} from '../constants/dimensions';
import {bold, medium, nm, sm, xs} from '../constants/fonts';
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
    fontSize: xs,
  },
  textHeading: {
    color: white,
    fontSize: nm,
    fontFamily: bold,
  },
  textSmallLight: {
    fontSize: xs,
    color: grayLight,
  },
  avatar: {
    width: 0.1 * width,
    height: 0.1 * width,
    resizeMode: 'contain',
    borderRadius: 0.75 * width,
  },

  main: {
    flex: 1,
    backgroundColor: black,
  },
  flag: {
    borderTopRightRadius: px4,
    borderBottomLeftRadius: px4,
    backgroundColor: white,
    borderWidth: 2,
    borderColor: white,
    color: black,
    position: 'absolute',
    right: 0,
    top: 0,
    paddingHorizontal: px4,
    paddingVertical: pyh,
  },
});

export default globalStyles;
