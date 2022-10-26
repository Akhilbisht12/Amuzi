import {StyleSheet} from 'react-native';
import {black, green, white} from '../../constants/colors';
import {nm} from '../../constants/fonts';
import {px4, px6, py1} from '../../constants/spacing';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
  },
  container: {
    paddingHorizontal: px4,
  },
  discoverContainer: {
    flexDirection: 'row',
    marginVertical: py1,
  },
  discoverButton: {
    backgroundColor: green,
    borderRadius: 20,
    paddingHorizontal: px6,
    paddingVertical: py1,
  },
  discoverText: {
    color: white,
    fontSize: nm,
  },
});

export default styles;
