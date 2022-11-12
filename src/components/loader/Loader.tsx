import {View, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';
import {height, width} from '../../constants/dimensions';
import useStore from '../../store/store';
import {black, white} from '../../constants/colors';

const Loader = () => {
  const {loading} = useStore();
  const styles = StyleSheet.create({
    main: {
      height: height,
      width: width,
      position: 'absolute',
      zIndex: 100,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      display: loading ? 'flex' : 'none',
      backgroundColor: `${black}70`,
    },
    loader: {
      width: 0.2 * width,
      height: 0.2 * width,
    },
  });
  return (
    <View style={[styles.main]}>
      <ActivityIndicator color={white} size={50} />
    </View>
  );
};

export default Loader;
