import {StyleSheet} from 'react-native';
import {black, blackLight, white} from '../../../constants/colors';
import {px1, px2, px3, px4, px5, px6, py2} from '../../../constants/spacing';
import {nm, xs} from '../../../constants/fonts';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
    position: 'relative',
  },
  profileContainer: {
    flex: 1,
    paddingHorizontal: px6,
    justifyContent: 'space-between',
  },
  photoContainer: {
    alignItems: 'center',
    marginTop: py2,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  photoIcon: {
    fontSize: 50,
    color: white,
    backgroundColor: blackLight,
    paddingVertical: px5,
    paddingHorizontal: px6,
    borderRadius: 50,
  },
  inputContainer: {
    marginVertical: py2,
  },
  inputBox: {
    marginVertical: py2,
    position: 'relative',
    borderColor: white,
    borderBottomWidth: 0.4,
  },
  animTextView: {
    position: 'absolute',
  },
  inputTitle: {
    color: white,
    fontSize: xs,
  },
  input: {
    fontSize: nm,
    color: white,
    height: 50,
  },
  dobText: {
    color: white,
    fontSize: xs,
    marginVertical: px3,
  },
  dobBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dobSeparator: {
    height: 2,
    width: 5,
    backgroundColor: white,
  },
  genderText: {
    color: white,
    fontSize: xs,
    marginVertical: px3,
  },
  dropdownBox: {
    paddingVertical: px2,
    paddingHorizontal: px4,
    borderRadius: px1,
    backgroundColor: blackLight,
  },
});

export default styles;
