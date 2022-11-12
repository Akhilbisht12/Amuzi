import {StyleSheet, Dimensions} from 'react-native';
import {background, white} from '../../constants/colors';
import {bold, medium, sm, xl3} from '../../constants/fonts';
import {py1, py2, py6, py7} from '../../constants/spacing';
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
    paddingVertical: py6,
    paddingHorizontal: 0.05 * width,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    height: 0.11 * height,
    resizeMode: 'contain',
    marginTop: py7,
  },
  welcomeHeading: {
    color: 'white',
    fontSize: xl3,
    fontFamily: bold,
    marginVertical: 0.003 * height,
    textAlign: 'center',
  },
  welcomeDescription: {
    textAlign: 'center',
    color: white,
    fontSize: sm,
    marginVertical: py1,
    fontFamily: medium,
  },
  skip: {
    color: white,
    fontFamily: medium,
    textAlign: 'center',
    marginVertical: py2,
  },
});

export default styles;
