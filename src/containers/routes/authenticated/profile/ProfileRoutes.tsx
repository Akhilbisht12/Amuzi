import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileSettings from '../../../../screens/profile/ProfileSettings';
import EditProfile from '../../../../screens/profile/EditProfile';
import UserSubscription from '../../../../screens/profile/UserSubscription';
import Transactions from '../../../../screens/profile/Transactions';
import UserSportSelection from '../../../../screens/profile/UserSportSelection';
import UpdateLang from '../../../../screens/profile/UpdateLang';

export type ProfileRoutesStack = {
  profile: undefined;
  editProfile: undefined;
  userSubscription: undefined;
  transactions: undefined;
  updateSport: undefined;
  updateLang: undefined;
};

const ProfileRoutes = () => {
  const Stack = createNativeStackNavigator<ProfileRoutesStack>();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="profile" component={ProfileSettings} />
      <Stack.Screen name="editProfile" component={EditProfile} />
      <Stack.Screen name="userSubscription" component={UserSubscription} />
      <Stack.Screen name="transactions" component={Transactions} />
      <Stack.Screen name="updateSport" component={UserSportSelection} />
      <Stack.Screen name="updateLang" component={UpdateLang} />
    </Stack.Navigator>
  );
};

export default ProfileRoutes;
