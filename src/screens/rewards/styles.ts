import {StyleSheet} from 'react-native';
import {black, blackLight, gray, green, white} from '../../constants/colors';
import {width} from '../../constants/dimensions';
import {md, xl} from '../../constants/fonts';
import {px1, px3, px4, py1, pyh} from '../../constants/spacing';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
    padding: px4,
  },
  display: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: white,
    fontSize: xl,
  },
  comingSoon: {
    width: 0.8 * width,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: blackLight,
    borderRadius: md,
    marginVertical: py1,
    padding: px4,
    elevation: 10,
  },
  option: {
    backgroundColor: gray,
    padding: px3,
    borderRadius: px1,
    marginVertical: pyh,
  },
  type: {
    textTransform: 'uppercase',
  },
  incorrectUserOption: {
    borderColor: 'red',
    borderWidth: 1,
  },
  correctOption: {
    borderColor: green,
    borderWidth: 1,
  },
  correctPollOptionBorder: {
    borderColor: green,
    borderWidth: 1,
    marginVertical: pyh,
    borderRadius: px1,
  },
  correctPollOption: {
    backgroundColor: `${green}30`,
    color: green,
  },
  pollOption: {
    backgroundColor: gray,
  },
  pollOptionBorder: {
    borderWidth: 1,
    borderColor: gray,
    marginVertical: pyh,
    borderRadius: px1,
  },
  pollOptionText: {
    position: 'absolute',
    zIndex: 2,
    left: px3,
    top: 12,
  },
  listOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default styles;
