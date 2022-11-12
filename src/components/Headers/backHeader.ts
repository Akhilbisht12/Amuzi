import {StyleSheet, Dimensions} from 'react-native';
import {white} from '../../constants/colors';
import {bold} from '../../constants/fonts';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 0.05 * width,
    // paddingTop: 0.06 * height,
    paddingVertical: 0.02 * height,
    borderBottomColor: 'black',
    borderBottomWidth: 0.3,
  },
  backIcon: {
    color: white,
  },
  title: {
    color: white,
    fontSize: 18,
    marginLeft: 30,
    fontFamily: bold,
  },
});

export default styles;
