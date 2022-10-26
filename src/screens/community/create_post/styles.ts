import {StyleSheet} from 'react-native';
import {black, blackLight, white} from '../../../constants/colors';
import {height, width} from '../../../constants/dimensions';
import {bold, nm, sm} from '../../../constants/fonts';
import {px1, px2, px4, py1, py2} from '../../../constants/spacing';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
  },
  backHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0.05 * width,
    paddingTop: 0.06 * height,
    paddingBottom: 0.02 * height,
    borderBottomColor: 'black',
    borderBottomWidth: 0.3,
  },
  backHeaderName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backHeaderIcon: {
    color: white,
  },
  backHeaderTitle: {
    color: white,
    fontSize: 18,
    marginLeft: 30,
    fontFamily: bold,
  },
  postButton: {
    backgroundColor: 'blue',
    borderRadius: px2,
    paddingHorizontal: px4,
    paddingVertical: px2,
  },
  postText: {
    color: white,
  },
  paddedArea: {
    padding: px4,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 0.15 * width,
    height: 0.15 * width,
    borderRadius: 0.75 * width,
    marginRight: px4,
  },
  userName: {
    color: white,
    fontSize: nm,
    fontFamily: bold,
  },
  communityBadge: {
    backgroundColor: blackLight,
    borderRadius: px1,
    paddingHorizontal: px4,
    paddingVertical: px1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  communityBadgeIcon: {
    color: white,
    fontSize: 20,
    marginRight: 5,
  },
  communityBadgeText: {
    color: white,
  },
  postContent: {
    backgroundColor: blackLight,
    marginVertical: py2,
    height: 0.3 * height,
    borderRadius: px4,
    fontSize: sm,
    textAlignVertical: 'top',
    padding: px4,
    color: white,
  },
  uploadButton: {
    backgroundColor: blackLight,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: py1,
    borderRadius: px1,
  },
  uploadedImageView: {
    alignItems: 'center',
  },
  uploadedImage: {
    width: width * 0.9,
    height: height,
    resizeMode: 'contain',
    borderRadius: px4,
  },
  uploadIcon: {
    color: white,
    fontSize: 25,
    marginRight: px2,
  },
  uploadText: {
    color: white,
  },
});

export default styles;
