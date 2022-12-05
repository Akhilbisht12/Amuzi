import {StyleSheet} from 'react-native';
import {black, blackLight, grayLight, white} from '../../../constants/colors';
import {height, width} from '../../../constants/dimensions';
import {medium, nm, xs} from '../../../constants/fonts';
import {px1, px2, px4, py2, pyh} from '../../../constants/spacing';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
    paddingTop: pyh,
  },
  container: {
    flex: 1,
    paddingHorizontal: px2,
  },
  communityList: {
    flexGrow: 1,
  },
  communityMain: {
    backgroundColor: blackLight,
    elevation: 5,
    borderRadius: 8,
    padding: px1,
    marginHorizontal: px2,
    marginVertical: pyh,
  },
  communityImage: {
    width: 'auto',
    height: 0.15 * height,
    borderRadius: px1,
    resizeMode: 'cover',
  },
  communityDetailsView: {
    marginTop: pyh,
    paddingVertical: pyh,
    paddingHorizontal: px1,
  },
  communityTitle: {
    fontSize: nm,
    fontFamily: medium,
    color: white,
  },
  communityCategory: {
    color: grayLight,
    marginVertical: 1,
  },
  joinButton: {
    backgroundColor: white,
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: py2,
  },
  joinButtonText: {
    color: black,
    textAlign: 'center',
    fontFamily: medium,
    fontSize: xs,
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
