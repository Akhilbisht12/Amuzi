import React from 'react';
import Language from '../../screens/onboarding/language/Language';
import SportSelection from '../../screens/onboarding/sport_selection/SportSelection';
import Profile from '../../screens/onboarding/profile/Profile';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

type name = {
  name: string;
};
export interface ProfileSetupStack {
  Language: undefined;
  SportSelection: undefined;
  Profile: name;
}

const ProfileSetup = () => {
  const Stack = createNativeStackNavigator<ProfileSetupStack>();

  return (
    <Stack.Navigator
      initialRouteName="Language"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Language" component={Language} />
      <Stack.Screen name="SportSelection" component={SportSelection} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default ProfileSetup;
