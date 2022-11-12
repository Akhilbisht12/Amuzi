import {Dimensions, StyleSheet} from 'react-native';
import {black, gray, green, white, yellow} from '../../../constants/colors';
import {bold, nm, xl, xxs} from '../../../constants/fonts';
import {px1} from '../../../constants/spacing';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
  },
  title: {
    color: white,
    marginVertical: 0.04 * height,
    fontSize: nm,
  },
  phone: {
    color: white,
    fontSize: nm,
    fontFamily: bold,
  },
  otpContainer: {
    paddingHorizontal: 0.04 * width,
  },
  inputContainer: {
    paddingVertical: 0.04 * height,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: px1,
    width: 0.9 * width,
  },
  input: {
    height: 0.1 * height,
    width: 0.9 * width,
    position: 'absolute',
    opacity: 0,
  },
  optText: {
    height: 0.1 * height,
    backgroundColor: gray,
    width: 0.2 * width,
    borderRadius: 0.02 * width,
    fontSize: xl,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: white,
  },
  inputBorder: {
    borderWidth: 1,
    borderColor: green,
  },
  resend: {
    marginVertical: 0.02 * height,
  },
  resendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendText: {
    color: white,
    fontSize: nm,
    textAlign: 'center',
  },
  resendTextHighlight: {
    color: yellow,
    marginHorizontal: 6,
    fontSize: nm,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
  },
});

export default styles;
