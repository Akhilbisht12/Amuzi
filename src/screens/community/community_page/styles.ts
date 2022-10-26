import {StyleSheet} from 'react-native';
import {black, grayLight, white} from '../../../constants/colors';
import {width} from '../../../constants/dimensions';
import {bold, md, nm, sm, xs} from '../../../constants/fonts';
import {px1, px2, px3, px4, px8, py1} from '../../../constants/spacing';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
  },
  container: {
    paddingHorizontal: px4,
  },
  communityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  communityHeaderImage: {
    width: 0.2 * width,
    height: 0.2 * width,
    borderRadius: 0.15 * width,
    resizeMode: 'contain',
    marginRight: px3,
  },
  communityDetails: {
    marginVertical: py1,
  },
  communityDetailsTitle: {
    color: white,
    fontSize: nm,
    fontFamily: bold,
  },
  communityDetailsCategory: {
    color: grayLight,
    fontSize: xs,
  },
  communityDetailsDescription: {
    color: white,
    fontSize: sm,
  },
  communityCountView: {},
  communityCount: {
    fontSize: md,
    fontFamily: bold,
    color: white,
    textAlign: 'center',
  },
  communityCountName: {
    color: white,
    fontSize: sm,
    textAlign: 'center',
  },
  createPost: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: px1,
    borderWidth: 2,
    borderColor: white,
    borderRadius: px8,
  },
  createPostIcon: {
    color: white,
    fontSize: 30,
  },
});

export default styles;
