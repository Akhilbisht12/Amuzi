import {StyleSheet} from 'react-native';
import {grayLight, white} from '../../../constants/colors';
import {width} from '../../../constants/dimensions';
import {lg, medium, nm} from '../../../constants/fonts';
import {px2, px4, py1} from '../../../constants/spacing';

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  postView: {
    paddingHorizontal: px4,
  },

  postTitle: {
    fontSize: lg,
    fontFamily: medium,
    marginVertical: py1,
    color: white,
  },
  postImage: {
    height: (9 / 16) * width,
    resizeMode: 'cover',
    borderRadius: px2,
  },
  content: {
    color: white,
    fontSize: nm,
  },
  postDate: {
    color: grayLight,
  },
});

export default styles;
