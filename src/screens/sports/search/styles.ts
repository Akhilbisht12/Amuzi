import {StyleSheet} from 'react-native';
import {black, green, white} from '../../../constants/colors';
import {width} from '../../../constants/dimensions';
import {medium, xs} from '../../../constants/fonts';
import {px1, px2, px4, py1} from '../../../constants/spacing';

export const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: px4,
  },
  searchUnderline: {
    borderBottomWidth: 0.2,
    borderBottomColor: white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flexGrow: 1,
    borderRadius: xs,

    color: white,
    paddingHorizontal: px4,
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
  chip: {
    backgroundColor: green,
    borderRadius: px4,
    paddingHorizontal: px2,
    paddingVertical: px1,
    marginLeft: px1,
  },
});
