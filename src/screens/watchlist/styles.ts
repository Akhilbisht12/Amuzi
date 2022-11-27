import {StyleSheet} from 'react-native';
import {black, white} from '../../constants/colors';
import {width} from '../../constants/dimensions';
import {medium} from '../../constants/fonts';
import {px1, px2, py1} from '../../constants/spacing';

export const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  resultCard: {
    flexDirection: 'row',
    marginVertical: py1,
    flex: 1,
  },
  resultImage: {
    width: 0.3 * width,
    height: (width * 0.3 * 9) / 16,
    resizeMode: 'contain',
    borderRadius: 5,
    marginRight: px2,
  },
  resultDuration: {
    position: 'absolute',
    backgroundColor: black,
    color: white,
    paddingHorizontal: px2,
    paddingVertical: px1,
    borderRadius: 4,
    bottom: 5,
    right: 12,
  },
  resultTitle: {
    color: white,
    fontFamily: medium,
    flexGrow: 1,
    width: 0.6 * width,
  },
});
