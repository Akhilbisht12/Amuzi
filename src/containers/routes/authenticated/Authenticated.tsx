import React, {useEffect} from 'react';
import {black} from '../../../constants/colors';
import {StatusBar} from 'react-native';
import Loader from '../../../components/loader/Loader';
import CommunityRoutes from './community/CommunityRoutes';
import HomeBottomTabs from './HomeBottomTabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileRoutes from './profile/ProfileRoutes';
import OnDemand from '../../../screens/sports/onDemand/OnDemand';
import Search from '../../../screens/sports/search/Search';
import {FEED} from '../../../types/content/playlist';
import WatchList from '../../../screens/watchlist/WatchList';
import Post from '../../../screens/xclusive/post/Post';
import {GetEventHandler} from '../../../handlers/events/eventsHandler';
import Live from '../../../screens/sports/live/Live';
import {NavigatorScreenParams} from '@react-navigation/native';
import {iCommunityTabs} from './community/CommunityTabs';

export type iAuthenticated = {
  Home: undefined;
  Community: NavigatorScreenParams<iCommunityTabs>;
  Profile: undefined;
  Sports: undefined;
  OnDemand: {
    feed: FEED;
    mediaid: string;
  };
  search: undefined;
  watchlist: undefined;
  xclusivePost: {
    index: number;
  };
  sportsLive: {
    index: number;
  };
};

const Authenticated = () => {
  const Stack = createNativeStackNavigator<iAuthenticated>();
  useEffect(() => {
    GetEventHandler();
  }, []);
  return (
    <>
      <StatusBar backgroundColor={black} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: black,
            flex: 1,
          },
        }}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeBottomTabs} />
        <Stack.Screen name="Community" component={CommunityRoutes} />
        <Stack.Screen name="Profile" component={ProfileRoutes} />
        <Stack.Screen name="OnDemand" component={OnDemand} />
        <Stack.Screen name="search" component={Search} />
        <Stack.Screen name="watchlist" component={WatchList} />
        <Stack.Screen name="xclusivePost" component={Post} />
        <Stack.Screen name="sportsLive" component={Live} />
      </Stack.Navigator>
      <Loader />
    </>
  );
};

export default Authenticated;
