import {Dimensions, StyleSheet} from 'react-native';
import {black, white} from '../../../constants/colors';
import {nm, regular} from '../../../constants/fonts';

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
  },
  phoneContainer: {
    paddingVertical: 0.04 * height,
    paddingHorizontal: 0.05 * width,
  },
  title: {
    color: white,
    fontSize: nm,
    fontFamily: regular,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginVertical: 0.04 * height,
  },
  input: {
    color: white,
    flexGrow: 1,
    fontSize: nm,
    // marginLeft: 10,
    textAlignVertical: 'center',
  },
  terms: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  termsText: {
    flex: 1,
    flexWrap: 'wrap',
    color: white,
    fontSize: nm,
    fontFamily: regular,
    marginLeft: 10,
    width: 'auto',
  },
  buttonView: {
    marginTop: 0.08 * height,
  },
});

export default styles;
