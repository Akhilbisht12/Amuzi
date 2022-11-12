import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PreferredSports from '../../screens/sports/preferred/PreferedSports';
import OnDemand from '../../screens/sports/onDemand/OnDemand';
import {FEED} from '../../types/content/playlist';
import ProfileRoutes from './ProfileRoutes';
export interface SportsStack {
  PreferredSports: undefined;
  onDemand: {
    mediaid: string;
    feed: FEED;
  };
  profileSettings: undefined;
}

const Sports = () => {
  const Stack = createNativeStackNavigator<SportsStack>();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="PreferredSports" component={PreferredSports} />
      <Stack.Screen name="OnDemand" component={OnDemand} />
      <Stack.Screen name="profileSettings" component={ProfileRoutes} />
    </Stack.Navigator>
  );
};

export default Sports;
