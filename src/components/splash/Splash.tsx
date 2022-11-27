import {View, Text} from 'react-native';
import React from 'react';
import {black, white} from '../../constants/colors';

const Splash = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: black,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{color: white}}>Amuzi</Text>
    </View>
  );
};

export default Splash;
