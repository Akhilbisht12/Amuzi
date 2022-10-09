import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoarding from '../../screens/onboarding/OnBoarding';
import React from 'react';
import Login from '../../screens/onboarding/login/Login';
import Otp from '../../screens/onboarding/otp/Otp';
type name = {
  name: string;
};
export interface UnauthenticatedStack {
  Login: name;
  OnBoarding: undefined;
  Otp: {
    name: string;
    phone: number;
  };
  Language: undefined;
  SportSelection: undefined;
  Profile: name;
}
const Unauthenticated = () => {
  const Stack = createNativeStackNavigator<UnauthenticatedStack>();

  return (
    <Stack.Navigator
      initialRouteName="OnBoarding"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Otp" component={Otp} />
    </Stack.Navigator>
  );
};

export default Unauthenticated;
