import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import AppContainer from './src/containers/AppContainer';
import {Modal, View, Text} from 'react-native';
import {white} from './src/constants/colors';
import {px4} from './src/constants/spacing';
import {width} from './src/constants/dimensions';

const App = () => {
  const [internet, setInternet] = useState<boolean | null>(true);
  useEffect(() => {
    NetInfo.fetch().then(info => {
      // console.log(info);
      setInternet(info.isInternetReachable);
    });
  }, [internet]);

  return (
    <>
      <NavigationContainer>
        <AppContainer />
      </NavigationContainer>
      <Modal transparent={true} visible={internet === false}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              backgroundColor: white,
              borderRadius: px4,
              height: 0.4 * width,
              width: 0.6 * width,
            }}>
            <Text>You are not connected to internet</Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default App;
