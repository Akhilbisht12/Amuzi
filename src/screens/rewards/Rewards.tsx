import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {black, white} from '../../constants/colors';
import {xl} from '../../constants/fonts';
import {px4} from '../../constants/spacing';
import globalStyles from '../../styles/globals';
import {comingSoon} from '../../constants/files';
import {width} from '../../constants/dimensions';

const Rewards = () => {
  return (
    <View style={styles.main}>
      <View>
        <Text style={globalStyles.textHeading}>Rewards</Text>
      </View>
      <View style={styles.display}>
        <Image source={comingSoon} style={styles.comingSoon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
    padding: px4,
  },
  display: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: white,
    fontSize: xl,
  },
  comingSoon: {
    width: 0.8 * width,
    resizeMode: 'contain',
  },
});

export default Rewards;
