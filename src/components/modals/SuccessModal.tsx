import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {blackLight} from '../../constants/colors';
import {px2, px4, px6, py1, py2, py4} from '../../constants/spacing';
import {width} from '../../constants/dimensions';
import {success} from '../../constants/files';
import globalStyles from '../../styles/globals';
import {lg} from '../../constants/fonts';

type Props = {
  visible: boolean;
  setVisible: any;
  title: string;
  body: string;
  buttonAction: () => void;
};

const SuccessModal = ({
  visible,
  setVisible,
  title,
  body,
  buttonAction,
}: Props) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={() => setVisible(false)}>
      <View style={styles.main}>
        <View style={styles.modal}>
          <Image source={success} />
          <Text
            style={[globalStyles.textHeading, {fontSize: lg, marginTop: py2}]}>
            {title}
          </Text>
          <Text
            style={[
              globalStyles.textLight,
              {textAlign: 'center', marginVertical: py1},
            ]}>
            {body}
          </Text>
          <TouchableOpacity
            onPress={() => {
              buttonAction();
              setVisible(false);
            }}
            style={[globalStyles.button, {paddingHorizontal: px6}]}>
            <Text style={[globalStyles.buttonText]}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: blackLight,
    elevation: 10,
    paddingHorizontal: px4,
    paddingVertical: py4,
    borderRadius: px2,
    width: 0.8 * width,
    alignItems: 'center',
  },
});
