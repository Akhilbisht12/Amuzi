import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {black, grayLight, white} from '../../constants/colors';
import {getAllScreens} from '../../api/sports/screen';
import useSportStore from '../../store/sportStore';
import {iScreen} from '../../types/store/sport';
import SportScreen from './SportScreen';
import {Image, StyleSheet, View} from 'react-native';
import SportsHeader from './widgets/SportsHeader';
import {medium, sm} from '../../constants/fonts';

const Tab = createMaterialTopTabNavigator();

const SportsHome = () => {
  const {screens, setScreens} = useSportStore();

  useEffect(() => {
    const getAllScreenHandler = async () => {
      try {
        const screenResponse = await getAllScreens();
        setScreens(screenResponse);
      } catch (error) {}
    };
    getAllScreenHandler();
  }, [setScreens]);

  return (
    <View style={{backgroundColor: black, flex: 1}}>
      <SportsHeader selected={1} />
      {screens.length > 0 && (
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              const image = screens[route.params.index].icon;
              return (
                <View
                  style={[
                    focused && styles.dashBorder,
                    {
                      borderColor: screens[route.params.index].colorScheme,
                    },
                  ]}>
                  <View
                    style={[
                      styles.sportView,
                      {
                        backgroundColor:
                          screens[route.params.index].colorScheme,
                      },
                    ]}>
                    <Image style={[styles.sport]} source={{uri: image}} />
                  </View>
                </View>
              );
            },
            tabBarScrollEnabled: true,
            tabBarPressColor: black,
            tabBarActiveTintColor: white,
            tabBarInactiveTintColor: grayLight,
            tabBarStyle: {backgroundColor: black},
            tabBarItemStyle: {
              width: 'auto',
            },

            tabBarIconStyle: {
              alignItems: 'center',
              justifyContent: 'center',
              height: 60,
              width: 60,
            },
            tabBarLabelStyle: {
              fontFamily: medium,
              fontSize: sm,
            },
            tabBarIndicatorStyle: {
              display: 'none',
            },
          })}>
          {/* <Tab.Screen name={'all'} component={PreferredSports} /> */}
          {screens.map((item: iScreen, i: number) => {
            return (
              <Tab.Screen
                initialParams={{index: i}}
                key={i}
                name={item.name}
                children={() => <SportScreen sport={item} />}
              />
            );
          })}
        </Tab.Navigator>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sport: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  sportView: {
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
    height: 55,
  },
  dashBorder: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 30,
    height: 62,
    width: 62,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SportsHome;
