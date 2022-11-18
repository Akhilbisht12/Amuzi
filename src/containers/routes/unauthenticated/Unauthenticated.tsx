import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoarding from '../../../screens/onboarding/OnBoarding';
import React from 'react';
import Login from '../../../screens/onboarding/login/Login';
import Otp from '../../../screens/onboarding/otp/Otp';
import Loader from '../../../components/loader/Loader';
import {StatusBar} from 'react-native';
type name = {
  name: string;
};
export type UnauthenticatedStack = {
  Login: name;
  OnBoarding: undefined;
  Otp: {
    name: string;
    phone: number;
  };
  Language: undefined;
  SportSelection: undefined;
  Profile: name;
};
const Unauthenticated = () => {
  const Stack = createNativeStackNavigator<UnauthenticatedStack>();

  return (
    <>
      <StatusBar translucent={false} backgroundColor={'transparent'} />
      <Stack.Navigator
        initialRouteName="OnBoarding"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Otp" component={Otp} />
      </Stack.Navigator>
      <Loader />
    </>
  );
};

export default Unauthenticated;
