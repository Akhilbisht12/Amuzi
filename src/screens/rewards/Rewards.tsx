import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {black, white} from '../../constants/colors';
import {xl} from '../../constants/fonts';
import {px4} from '../../constants/spacing';

const Rewards = () => {
  return (
    <View style={styles.main}>
      <View>
        <Text style={styles.text}>Rewards</Text>
      </View>
      <View style={styles.display}>
        <Text style={styles.text}>Coming</Text>
        <Text style={styles.text}>Soon</Text>
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
});

export default Rewards;
