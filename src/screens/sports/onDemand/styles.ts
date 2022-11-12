import {StyleSheet} from 'react-native';
import {black, blackLight, white} from '../../../constants/colors';
import {height, width} from '../../../constants/dimensions';
import {bold, sm, xs} from '../../../constants/fonts';
import {px1, px4, py1} from '../../../constants/spacing';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
  },
  playingMediaDetails: {
    paddingHorizontal: px4,
    paddingVertical: py1,
  },
  playingMediaTitle: {
    color: white,
    fontSize: sm,
    fontFamily: bold,
  },
  playingMediaDesc: {
    color: white,
  },
  playingPlaylistTitle: {
    color: white,
  },
  mediaListParent: {
    paddingHorizontal: px4,
  },
  mediaList: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: py1,
    justifyContent: 'flex-start',
    padding: px1,
  },
  selectedMediaList: {
    backgroundColor: blackLight,
    borderRadius: 5,
  },
  mediaListImage: {
    width: 0.25 * width,
    height: 0.08 * height,
    resizeMode: 'contain',
    borderRadius: 5,
  },
  mediaDuration: {
    color: white,
    backgroundColor: black,
    padding: px1,
    borderRadius: 5,
    position: 'absolute',
    bottom: 4,
    right: 4,
  },
  mediaDesc: {
    paddingHorizontal: py1,
  },
  mediaTitle: {
    color: white,
    fontSize: xs,
  },
});

export default styles;
