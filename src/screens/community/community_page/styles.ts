import {StyleSheet} from 'react-native';
import {black, gray, grayLight, green, white} from '../../../constants/colors';
import {height} from '../../../constants/dimensions';
import {bold, md, nm, sm, xs} from '../../../constants/fonts';
import {px1, px2, px3, px4, py1} from '../../../constants/spacing';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
  },
  divider: {
    paddingVertical: 0.2,
    backgroundColor: gray,
    marginHorizontal: px4,
    marginVertical: py1,
  },
  container: {
    paddingHorizontal: px4,
    paddingTop: py1,
  },
  communityHeader: {},
  communityHeaderImage: {
    height: 0.15 * height,
    width: 'auto',
    borderRadius: px2,
    resizeMode: 'cover',
  },
  communityDetailsTitle: {
    color: white,
    fontSize: nm,
    fontFamily: bold,
  },
  communityDetailsCategory: {
    position: 'absolute',
    top: 5,
    left: 5,
    color: white,
    fontSize: xs,
    backgroundColor: green,
    paddingVertical: px1,
    paddingHorizontal: px4,
    borderRadius: px1,
  },
  readMoreToggle: {
    fontFamily: bold,
    color: grayLight,
  },
  communityDetailsDescription: {
    color: grayLight,
    fontSize: sm,
  },
  titleDesc: {
    paddingVertical: py1,
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
    backgroundColor: green,
    padding: px3,
    borderRadius: 100,
    position: 'absolute',
    bottom: 15,
    right: 15,
    elevation: 10,
  },
  createPostIcon: {
    color: white,
    fontSize: 30,
  },
  adminManageView: {},
  adminManageButton: {},
  adminManageText: {
    color: white,
  },
});

export default styles;
