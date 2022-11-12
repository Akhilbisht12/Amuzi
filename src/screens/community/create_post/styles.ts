import {StyleSheet} from 'react-native';
import {
  black,
  blackLight,
  gray,
  grayLight,
  green,
  white,
} from '../../../constants/colors';
import {height, width} from '../../../constants/dimensions';
import {bold, md, medium, nm, sm} from '../../../constants/fonts';
import {px1, px2, px4, px6, py1, py2, py4} from '../../../constants/spacing';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
  },
  backHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: px4,
    paddingVertical: py2,
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
    backgroundColor: green,
    borderRadius: px2,
    paddingHorizontal: px6,
    paddingVertical: py1,
  },
  postText: {
    color: gray,
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
    backgroundColor: gray,
    alignItems: 'center',
    justifyContent: 'center',
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
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${blackLight}95`,
  },
  modalContainer: {
    backgroundColor: blackLight,
    paddingHorizontal: px4,
    borderRadius: 10,
    width: 0.9 * width,
    alignItems: 'center',
    paddingVertical: py4,
  },
  modalImage: {
    width: 0.4 * width,
    height: 0.4 * width,
  },
  modalHeading: {
    fontSize: md,
    color: white,
    fontFamily: medium,
    marginVertical: py1,
  },
  modalDesc: {
    fontSize: sm,
    color: grayLight,
    textAlign: 'center',
    marginVertical: py1,
  },
  modalButtonView: {
    width: 0.8 * width,
  },
});

export default styles;
