import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import useStore from '../../store/store';
type button = {
  onPress: (...args: any) => any;
  title: string;
  rounded?: boolean;
  colored?: boolean;
  opacity?: number;
};
const Button = ({onPress, title, rounded, colored}: button) => {
  const {loading} = useStore();
  return (
    <TouchableOpacity
      style={[
        styles.button,
        rounded ? styles.roundedFull : styles.rounded,
        colored ? styles.buttonBgGreen : styles.buttonBgGray,
      ]}
      onPress={() => !loading && onPress()}>
      <Text
        style={[
          styles.title,
          colored ? styles.titleColorBlack : styles.titleColorGray,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
