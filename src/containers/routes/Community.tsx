import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CommunityHome from '../../screens/community/CommunityHome';
import CreateCommunity from '../../screens/community/create_community/CreateCommunity';

type name = {
  name: string;
};

export interface CommunityStack {
  CommunityHome: undefined;
  CreateCommunity: name;
}

const Community = () => {
  const Stack = createNativeStackNavigator<CommunityStack>();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CommunityHome" component={CommunityHome} />
      <Stack.Screen name="CreateCommunity" component={CreateCommunity} />
    </Stack.Navigator>
  );
};

export default Community;
