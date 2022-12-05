import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Discover from '../../../../screens/community/discover/Discover';
import JoinedCommunities from '../../../../screens/community/widgets/JoinedCommunities';
import CreatedCommunities from '../../../../screens/community/widgets/CreatedCommunities';
import {black, grayLight, white} from '../../../../constants/colors';

export type iCommunityTabs = {
  Discover: undefined;
  Joined: undefined;
  Approvals: undefined;
};

const Tab = createMaterialTopTabNavigator<iCommunityTabs>();

const CommunityTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarPressColor: black,
        tabBarActiveTintColor: white,
        tabBarInactiveTintColor: grayLight,
        tabBarStyle: {backgroundColor: black},
        tabBarIndicatorStyle: {
          backgroundColor: white,
        },
      }}>
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name="Joined" component={JoinedCommunities} />
      <Tab.Screen name="Approvals" component={CreatedCommunities} />
    </Tab.Navigator>
  );
};

export default CommunityTabs;
