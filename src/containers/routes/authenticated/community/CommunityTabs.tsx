import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Discover from '../../../../screens/community/discover/Discover';
import JoinedCommunities from '../../../../screens/community/widgets/JoinedCommunities';
import CreatedCommunities from '../../../../screens/community/widgets/CreatedCommunities';
import {black, grayLight, white} from '../../../../constants/colors';
import CommunityHeader from '../../../../components/Headers/CommunityHeader';
import {View} from 'react-native';
import Create from '../../../../screens/community/widgets/Create';

const Tab = createMaterialTopTabNavigator();

const CommunityTabs = () => {
  return (
    <>
      <View style={{backgroundColor: black}}>
        <CommunityHeader title="Communities" />
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarPressColor: black,
          tabBarActiveTintColor: white,
          tabBarInactiveTintColor: grayLight,
          tabBarStyle: {backgroundColor: black},
        }}>
        <Tab.Screen name="Discover" component={Discover} />
        <Tab.Screen name="Joined" component={JoinedCommunities} />
        <Tab.Screen name="Approvals" component={CreatedCommunities} />
      </Tab.Navigator>
      <Create />
    </>
  );
};

export default CommunityTabs;
