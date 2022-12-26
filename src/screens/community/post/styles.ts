import {StyleSheet} from 'react-native';
import {black, grayLight, white} from '../../../constants/colors';
import {width} from '../../../constants/dimensions';
import {medium, sm, xs} from '../../../constants/fonts';
import {px1, px2, py1} from '../../../constants/spacing';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerImage: {
    width: 0.12 * width,
    height: 0.12 * width,
    marginRight: px2,
    borderRadius: 0.15 * width,
    resizeMode: 'contain',
  },
  headerCommunityName: {
    color: white,
    fontSize: sm,
    fontFamily: medium,
  },
  headerPostDetails: {
    color: grayLight,
    fontSize: xs,
  },
  postImage: {
    width: width * 0.92,
    height: width * 0.92,
    marginVertical: py1,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  engagementView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  engagementAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  engagementActionText: {
    color: white,
    fontSize: sm,
    fontFamily: medium,
  },
  engagementIcon: {
    fontSize: 25,
    color: white,
    marginRight: px1,
  },
  contentView: {
    marginVertical: py1,
  },
  contentText: {
    color: white,
    fontSize: sm,
  },
});

export default styles;
