import {StyleSheet} from 'react-native';
import {
  black,
  blackLight,
  grayLight,
  green,
  white,
} from '../../../constants/colors';
import {height, width} from '../../../constants/dimensions';
import {bold, md, medium, nm, sm, xs} from '../../../constants/fonts';
import {
  px3,
  px4,
  px5,
  px6,
  py1,
  py2,
  py4,
  pyh,
} from '../../../constants/spacing';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
  },
  mainScroll: {
    flexGrow: 1,
  },
  paddedView: {
    paddingHorizontal: px4,
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
  inputBox: {
    marginVertical: py1,
    paddingTop: py2,
  },
  inputView: {
    marginVertical: pyh,
  },
  inputLabel: {
    color: white,
    fontSize: nm,
    fontFamily: medium,
  },
  inputLabelDesc: {
    color: grayLight,
    fontSize: xs,
  },
  input: {
    color: white,
    placeholderColor: white,
    fontSize: nm,
    paddingHorizontal: px3,
    height: height * 0.1,
  },
  textInputView: {
    borderWidth: 1,
    borderColor: white,
    borderRadius: 5,
    marginVertical: py2,
    height: height * 0.1,
  },
  textareaView: {
    borderWidth: 1,
    borderColor: white,
    borderRadius: 5,
    marginVertical: py2,
    height: height * 0.2,
  },
  textarea: {
    color: white,
    placeholderColor: white,
    fontSize: nm,
    paddingHorizontal: px3,
    height: height * 0.2,
    textAlignVertical: 'top',
  },
  wordLimit: {
    color: white,
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: white,
    height: 0.1 * height,
    marginVertical: py2,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: px3,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownSelectedText: {
    color: white,
    fontSize: nm,
  },
  droppedView: {
    backgroundColor: blackLight,
    bottom: 0,
    left: 0.005 * width,
    width: 0.9 * width,
    padding: px4,
    borderRadius: 10,
    maxHeight: 0.4 * height,
  },
  droppedText: {
    color: white,
    fontSize: md,
    fontFamily: bold,
  },
  dropItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: py1,
  },
  dropItemUnselected: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: white,
    marginRight: 15,
  },
  dropItemSelected: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: green,
    marginRight: 15,
  },
  terms: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  termsSelected: {
    borderWidth: 2,
    borderRadius: 4,
    height: 20,
    width: 20,
    borderColor: green,
    marginRight: 10,
    backgroundColor: green,
  },
  termsUnselected: {
    borderWidth: 2,
    borderRadius: 4,
    height: 20,
    width: 20,
    borderColor: white,
    marginRight: 10,
  },
  termsText: {
    color: white,
    fontSize: sm,
  },
  buttonView: {
    marginVertical: py2,
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
  error: {
    textAlign: 'center',
    color: 'red',
  },
});

export default styles;
