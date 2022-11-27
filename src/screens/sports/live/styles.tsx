import {StyleSheet} from 'react-native';
import {grayLight, green, white} from '../../../constants/colors';
import {width} from '../../../constants/dimensions';
import {md, nm} from '../../../constants/fonts';
import {px2, px4, px6, py1} from '../../../constants/spacing';

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  mainArea: {
    paddingHorizontal: px4,
  },
  thumbnail: {
    height: (9 / 16) * width,
    borderRadius: 15,
  },
  title: {
    color: white,
    fontSize: md,
    marginVertical: py1,
  },
  eventTypeView: {
    alignItems: 'flex-start',
  },
  eventTypeBadge: {
    color: white,
    textTransform: 'capitalize',
    paddingVertical: py1,
    paddingHorizontal: px4,
    borderRadius: px6,
    backgroundColor: green,
    marginBottom: py1,
  },
  description: {
    color: grayLight,
    fontSize: nm,
  },
  badge: {
    color: white,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingVertical: py1,
    paddingHorizontal: px4,
    position: 'absolute',
  },
});
export default styles;
