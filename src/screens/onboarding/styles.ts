import {StyleSheet, Dimensions} from 'react-native';
import {background, white} from '../../constants/colors';
import {medium} from '../../constants/fonts';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  main: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: background,
  },
  mainChild: {
    flex: 1,
    backgroundColor: '#1F1D2B99',
    paddingVertical: 0.12 * height,
    paddingHorizontal: 0.05 * width,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    height: 0.11 * height,
    resizeMode: 'contain',
  },
  welcomeHeading: {
    color: 'white',
    fontSize: 35,
    fontFamily: 'Roboto-Bold',
    marginVertical: 0.003 * height,
  },
  welcomeDescription: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    marginVertical: 0.003 * height,
  },
  skip: {
    color: white,
    fontFamily: medium,
    textAlign: 'center',
  },
});

export default styles;
