import {StyleSheet} from 'react-native';
import {black, gray, grayLight, green, white} from '../../../constants/colors';
import {height, width} from '../../../constants/dimensions';
import {medium, nm} from '../../../constants/fonts';
import {px1, px4, pxh, py1, py2} from '../../../constants/spacing';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
  },
  container: {
    flex: 1,
    paddingHorizontal: px4,
    paddingVertical: py2,
  },
  communityList: {
    flexGrow: 1,
  },
  communityMain: {
    backgroundColor: gray,
    borderRadius: 8,
    padding: pxh,
    width: 0.45 * width,
    alignItems: 'center',
    marginHorizontal: px1,
    marginVertical: py2,
  },
  communityImage: {
    width: 0.2 * width,
    height: 0.2 * width,
    borderRadius: 0.1 * width,
    marginVertical: py1,
  },
  communityDetailsView: {
    alignItems: 'center',
  },
  communityTitle: {
    fontSize: nm,
    fontFamily: medium,
    color: white,
    textAlign: 'center',
  },
  communityCategory: {
    color: grayLight,
    marginVertical: 1,
    textAlign: 'center',
  },
  joinButton: {
    width: 0.4 * width,
    backgroundColor: `${green}60`,
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: py1,
  },
  joinButtonText: {
    textAlign: 'center',
    color: white,
  },
  emptyCommunityView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCommunity: {
    color: grayLight,
    paddingHorizontal: px4,
    marginVertical: py2,
  },
  emptyCommunityImage: {
    height: 0.4 * height,
    width: width,
    resizeMode: 'contain',
    textAlign: 'center',
  },
});

export default styles;
