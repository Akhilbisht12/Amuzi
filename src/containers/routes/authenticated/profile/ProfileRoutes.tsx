import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileSettings from '../../../../screens/profile/ProfileSettings';
import EditProfile from '../../../../screens/profile/EditProfile';

export type ProfileRoutesStack = {
  profile: undefined;
  editProfile: undefined;
};

const ProfileRoutes = () => {
  const Stack = createNativeStackNavigator<ProfileRoutesStack>();

  return (
    <Stack.Navigator
      initialRouteName="profile"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="profile" component={ProfileSettings} />
      <Stack.Screen name="editProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export default ProfileRoutes;
