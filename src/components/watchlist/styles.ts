import {StyleSheet} from 'react-native';
import {blackLight, white} from '../../constants/colors';
import {px1, px2, px4, py1} from '../../constants/spacing';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: blackLight,
    borderRadius: px2,
    paddingHorizontal: px4,
    paddingVertical: py1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: white,
    marginLeft: px1,
  },
});
