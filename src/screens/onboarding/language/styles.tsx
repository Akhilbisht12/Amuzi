import {StyleSheet} from 'react-native';
import {black, blackLight, white} from '../../../constants/colors';
import {height, width} from '../../../constants/dimensions';
import {bold, nm, sm, xl} from '../../../constants/fonts';
import {pdcontainer, px4, px6} from '../../../constants/spacing';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
    padding: pdcontainer,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  logo: {
    height: 0.113 * height,
    width: 0.53 * width,
    resizeMode: 'contain',
    marginVertical: 0.01 * height,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 0.005 * height,
  },
  title: {
    color: white,
    fontSize: nm,
    fontFamily: bold,
    marginLeft: 5,
  },
  titleHindi: {
    color: white,
    fontSize: sm,
    textAlign: 'center',
    marginVertical: 0.005 * height,
  },
  parentLangContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: px4,
  },
  langContainer: {
    backgroundColor: blackLight,
    borderRadius: 12,
    padding: 8,
    width: 0.43 * width,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 0.15 * height,
    position: 'relative',
  },
  langTitle: {
    color: white,
    fontSize: xl,
    textAlign: 'center',
  },
  heartIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  buttonView: {
    width: 0.9 * width,
  },
});

export default styles;
