import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WatchParty from '../../screens/sports/live/widgets/WatchParty';
import ChatRoom from '../../screens/sports/live/widgets/ChatRoom';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {iLiveTabs} from './LiveTabs';

export type iChatRoomRoutes = {
  joinedRooms: {
    eventIndex: number;
  };
  chatRoom: {
    eventIndex: number;
    roomIndex: number;
  };
};

type Props = MaterialTopTabScreenProps<iLiveTabs, 'watchParty'>;
const WatchPartyRoutes = ({route}: Props) => {
  const Stack = createNativeStackNavigator<iChatRoomRoutes>();
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="joinedRooms">
      <Stack.Screen
        name="joinedRooms"
        initialParams={{eventIndex: route.params.index}}
        component={WatchParty}
      />
      <Stack.Screen name="chatRoom" component={ChatRoom} />
    </Stack.Navigator>
  );
};

export default WatchPartyRoutes;
