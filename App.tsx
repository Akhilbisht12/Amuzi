import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import AppContainer from './src/containers/AppContainer';
import {Modal, View, Text} from 'react-native';
import {black, grayLight, white} from './src/constants/colors';
import {px4} from './src/constants/spacing';
import {width} from './src/constants/dimensions';
import {medium, nm} from './src/constants/fonts';

const App = () => {
  const [internet, setInternet] = useState<boolean | null>(true);
  useEffect(() => {
    NetInfo.fetch().then(info => {
      setInternet(info.isInternetReachable);
    });
  }, [internet]);

  return (
    <>
      <NavigationContainer>
        <AppContainer />
      </NavigationContainer>
      <Modal transparent={true} visible={internet === false}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: grayLight,
          }}>
          <View
            style={{
              backgroundColor: black,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: px4,
              height: 0.4 * width,
              width: 0.6 * width,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: white,
                fontSize: nm,
                fontFamily: medium,
              }}>
              You are not connected to internet
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default App;
