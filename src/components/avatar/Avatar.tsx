import {StyleSheet, View} from 'react-native';
import React from 'react';
import {gray, white} from '../../constants/colors';
import {width} from '../../constants/dimensions';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  scale: number;
};

const Avatar = ({scale}: Props) => {
  const styles = StyleSheet.create({
    main: {
      backgroundColor: gray,
      width: scale * width,
      height: scale * width,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: scale * width,
    },
  });

  return (
    <View style={styles.main}>
      <Icon size={scale * width * 0.5} name="person" color={white} />
    </View>
  );
};

export default Avatar;
