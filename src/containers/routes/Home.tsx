import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {black, blackLight, green, white} from '../../constants/colors';
import CommunityIcon from '../../assets/icons/Community';
import {StatusBar} from 'react-native';
import Loader from '../../components/loader/Loader';
import XclusiveIcon from '../../assets/icons/Xclusive';
import RewardsIcon from '../../assets/icons/Rewards';
import Community from './Community';
import Basketball from '../../assets/icons/Basketball';
import Xclusive from '../../screens/xclusive/Xclusive';
import Rewards from '../../screens/rewards/Rewards';
import SportsHome from '../../screens/sports/SportsHome';

const Home = () => {
  const Tab = createBottomTabNavigator();
  return (
    <>
      <StatusBar backgroundColor={black} />
      <Tab.Navigator
        initialRouteName="Sports"
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let Icon;
            if (route.name === 'Sports') {
              Icon = <Basketball size={size} focused={focused} color={color} />;
            } else if (route.name === 'TV shows') {
              Icon = <XclusiveIcon focused={focused} color={color} />;
            } else if (route.name === 'Xclusive') {
              Icon = <XclusiveIcon focused={focused} color={color} />;
            } else if (route.name === 'Community') {
              Icon = <CommunityIcon focused={focused} color={color} />;
            } else if (route.name === 'Rewards') {
              Icon = <RewardsIcon focused={focused} color={color} />;
            }
            return Icon;
          },
          tabBarStyle: {
            borderTopColor: black,
          },
          tabBarActiveTintColor: green,
          tabBarInactiveTintColor: white,
          tabBarActiveBackgroundColor: blackLight,
          tabBarInactiveBackgroundColor: blackLight,
        })}>
        <Tab.Screen name="Sports" component={SportsHome} />
        {/* <Tab.Screen name="TV shows" component={Home} /> */}
        <Tab.Screen name="Xclusive" component={Xclusive} />
        <Tab.Screen name="Community" component={Community} />
        <Tab.Screen name="Rewards" component={Rewards} />
      </Tab.Navigator>
      <Loader />
    </>
  );
};

export default Home;
