import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import styles from './styles';
import {black, white} from '../../constants/colors';

type Props = {
  checked?: boolean;
  onPress: (...args: any) => void;
};

const Checkbox = ({checked, onPress}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.main, checked ? styles.checked : styles.unchecked]}
      onPress={onPress}>
      {checked && <Icon size={20} color={black} name={'checkmark'} />}
    </TouchableOpacity>
  );
};

export default Checkbox;
