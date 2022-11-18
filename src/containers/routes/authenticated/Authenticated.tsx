import React from 'react';
import {black} from '../../../constants/colors';
import {StatusBar} from 'react-native';
import Loader from '../../../components/loader/Loader';
import Community from './community/Community';
import Home from '../Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileRoutes from './profile/ProfileRoutes';
import Sports from '../Sports';
import OnDemand from '../../../screens/sports/onDemand/OnDemand';

const Authenticated = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <StatusBar backgroundColor={black} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: black,
            flex: 1,
          },
        }}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Community" component={Community} />
        <Stack.Screen name="Profile" component={ProfileRoutes} />
        <Stack.Screen name="Sports" component={Sports} />
        <Stack.Screen name="OnDemand" component={OnDemand} />
      </Stack.Navigator>
      <Loader />
    </>
  );
};

export default Authenticated;
