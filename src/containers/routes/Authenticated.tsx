import React from 'react';
import Home from './Home';
import Icon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {black, gray, green} from '../../constants/colors';
import Community from './Community';
import {StatusBar} from 'react-native';
import Sports from '../../screens/sports/Sports';

const Authenticated = () => {
  const Tab = createBottomTabNavigator();
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <Tab.Navigator
        initialRouteName="Community"
        sceneContainerStyle={{backgroundColor: black}}
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Sports') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'TV shows') {
              iconName = focused ? 'ios-list' : 'ios-list';
            } else if (route.name === 'Xclusive') {
              iconName = focused ? 'ios-list' : 'ios-list';
            } else if (route.name === 'Community') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Rewards') {
              iconName = focused ? 'ios-list' : 'ios-list';
            }
            return (
              <Icon
                name={iconName ? iconName : 'ios-list'}
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: green,
          tabBarInactiveTintColor: gray,
        })}>
        <Tab.Screen name="Sports" component={Sports} />
        <Tab.Screen name="TV shows" component={Home} />
        <Tab.Screen name="Xclusive" component={Home} />
        <Tab.Screen name="Community" component={Community} />
        <Tab.Screen name="Rewards" component={Home} />
      </Tab.Navigator>
    </>
  );
};

export default Authenticated;
