import {StyleSheet} from 'react-native';
import {
  black,
  blackLight,
  grayLight,
  green,
  white,
} from '../../../constants/colors';
import {width} from '../../../constants/dimensions';
import {medium, nm} from '../../../constants/fonts';
import {px2, px4, py1, py2} from '../../../constants/spacing';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
  },
  container: {
    paddingHorizontal: px4,
    paddingVertical: py2,
  },
  communityMain: {
    backgroundColor: blackLight,
    borderRadius: 8,
    padding: px2,
    flexDirection: 'row',
  },
  communityImage: {
    width: 0.2 * width,
    height: 0.2 * width,
    borderRadius: 8,
    marginRight: px2,
  },
  communityDetailsView: {
    alignItems: 'flex-start',
  },
  communityTitle: {
    fontSize: nm,
    fontFamily: medium,
    color: white,
  },
  communityCategory: {
    color: grayLight,
  },
  joinButton: {
    width: 0.6 * width,
    backgroundColor: `${green}60`,
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: py1,
  },
  joinButtonText: {
    textAlign: 'center',
    color: white,
  },
});

export default styles;
