import {StyleSheet} from 'react-native';
import {black, blackLight, white, yellow} from '../../../constants/colors';
import {height, width} from '../../../constants/dimensions';
import {bold, medium, nm, sm, xs} from '../../../constants/fonts';
import {px4, py2} from '../../../constants/spacing';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
  },
  logoView: {
    alignItems: 'center',
    marginVertical: 0.01 * height,
  },
  logo: {
    height: 0.113 * height,
    width: 0.53 * width,
    resizeMode: 'contain',
    marginVertical: 0.01 * height,
  },
  sportsContainer: {
    backgroundColor: blackLight,
    flex: 1,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    paddingHorizontal: px4,
    paddingVertical: py2,
    justifyContent: 'space-between',
  },
  titleContainer: {
    marginVertical: py2,
  },
  favTitle: {
    color: white,
    fontSize: nm,
    fontFamily: medium,
  },
  favHindi: {
    color: white,
    fontSize: sm,
  },
  sportView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: py2,
  },
  imageTextView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sportLogo: {
    height: 28,
    width: 28,
    resizeMode: 'contain',
    backgroundColor: black,
    borderRadius: 6,
  },
  sportName: {
    color: white,
    fontSize: nm,
    fontFamily: bold,
    marginLeft: px4,
  },
  sportSelected: {
    color: yellow,
    fontSize: 20,
  },
  buttonContainer: {
    marginVertical: py2,
  },
  buttonLabel: {
    color: white,
    fontSize: xs,
    textAlign: 'center',
  },
});

export default styles;
