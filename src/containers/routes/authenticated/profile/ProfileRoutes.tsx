import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileSettings from '../../../../screens/profile/ProfileSettings';
import EditProfile from '../../../../screens/profile/EditProfile';
import UserSubscription from '../../../../screens/profile/UserSubscription';

export type ProfileRoutesStack = {
  profile: undefined;
  editProfile: undefined;
  userSubscription: undefined;
};

const ProfileRoutes = () => {
  const Stack = createNativeStackNavigator<ProfileRoutesStack>();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="profile" component={ProfileSettings} />
      <Stack.Screen name="editProfile" component={EditProfile} />
      <Stack.Screen name="userSubscription" component={UserSubscription} />
    </Stack.Navigator>
  );
};

export default ProfileRoutes;
