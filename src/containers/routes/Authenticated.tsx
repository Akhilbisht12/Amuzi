import React from 'react';
import Home from './Home';
import Icon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {gray, green} from '../../constants/colors';

const Authenticated = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: 'rgba(52, 52, 52, 0)'}}
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
            iconName = focused ? 'ios-list' : 'ios-list';
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
      <Tab.Screen name="Sports" component={Home} />
      <Tab.Screen name="TV shows" component={Home} />
      <Tab.Screen name="Xclusive" component={Home} />
      <Tab.Screen name="Community" component={Home} />
      <Tab.Screen name="Rewards" component={Home} />
    </Tab.Navigator>
  );
};

export default Authenticated;
