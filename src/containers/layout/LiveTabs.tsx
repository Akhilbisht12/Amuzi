import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import LiveInfo from '../../screens/sports/live/widgets/LiveInfo';
import {black, gray, green, white} from '../../constants/colors';
import CreateRoom from '../../components/liveRooms/CreateRoom';
import JoinRoom from '../../components/liveRooms/JoinRoom';
import WatchPartyRoutes from './WatchPartyRoutes';

export type iLiveTabs = {
  info: {
    index: number;
  };
  suggestions: {
    index: number;
  };
  watchParty: {
    index: number;
  };
};

const LiveTabs = ({index}: {index: number}) => {
  const Tab = createMaterialTopTabNavigator<iLiveTabs>();
  return (
    <>
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
        <Tab.Screen
          initialParams={{index}}
          name="watchParty"
          component={WatchPartyRoutes}
        />
        <Tab.Screen initialParams={{index}} name="info" component={LiveInfo} />
      </Tab.Navigator>
      {/* live chat create/join room modal */}
      <CreateRoom />
      <JoinRoom />
    </>
  );
};

export default LiveTabs;
