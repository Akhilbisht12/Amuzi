import {View, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {height} from '../../constants/dimensions';
import {black} from '../../constants/colors';

type Props = {
  children: any;
};

const ViewWrapper = ({children}: Props) => {
  return (
    <View style={styles.main}>
      <ScrollView style={styles.mainScroll}>{children}</ScrollView>
      {/* <FlatList ListHeaderComponent={...children} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
  },
  mainScroll: {
    height: height,
  },
});

export default ViewWrapper;
