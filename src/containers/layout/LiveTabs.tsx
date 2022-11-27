import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import LiveInfo from '../../screens/sports/live/widgets/LiveInfo';
import {black, gray, green, white} from '../../constants/colors';

export type iLiveTabs = {
  info: {
    index: number;
  };
  suggestions: {
    index: number;
  };
};

const LiveTabs = ({index}: {index: number}) => {
  const Tab = createMaterialTopTabNavigator<iLiveTabs>();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarActiveTintColor: white,
        tabBarStyle: {
          backgroundColor: black,
        },
        tabBarPressColor: gray,
        tabBarIndicatorStyle: {
          backgroundColor: green,
        },
      }}>
      <Tab.Screen initialParams={{index}} name="info" component={LiveInfo} />
      <Tab.Screen
        initialParams={{index}}
        name="suggestions"
        component={LiveInfo}
      />
    </Tab.Navigator>
  );
};

export default LiveTabs;
