import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppContainer from './src/containers/AppContainer';

const App = () => {
  return (
    <NavigationContainer>
      <AppContainer />
    </NavigationContainer>
  );
};

export default App;
