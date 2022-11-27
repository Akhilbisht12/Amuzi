import React, {useEffect, useRef} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {black, grayLight, white} from '../../../../constants/colors';
import {getAllScreens} from '../../../../api/sports/screen';
import useSportStore from '../../../../store/sportStore';
import {iScreen} from '../../../../types/store/sport';
import SportScreen from '../../../../screens/sports/SportScreen';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Animated,
} from 'react-native';
import SportsHeader from '../../../../screens/sports/widgets/SportsHeader';
import useStore from '../../../../store/store';
import {px4, pyh} from '../../../../constants/spacing';
import {medium} from '../../../../constants/fonts';
import {height, width} from '../../../../constants/dimensions';
import useThemeStore from '../../../../store/states/themeStore';

const Tab = createMaterialTopTabNavigator();

const SportTabs = () => {
  const {screens, setScreens} = useSportStore();
  const {scrollUp, sportScrollYOffset} = useStore();
  const {setTheme} = useThemeStore();
  const headerTop = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const getAllScreenHandler = async () => {
      try {
        const screenResponse = await getAllScreens();
        setTheme(screenResponse[0]);
        setScreens(screenResponse);
      } catch (error) {}
    };
    getAllScreenHandler();
  }, [setScreens]);

  useEffect(() => {
    let show;
    if (scrollUp) {
      show = false;
    } else {
      show = true;
    }
    if (sportScrollYOffset === 0) {
      show = true;
    }
    Animated.timing(headerTop, {
      toValue: show ? 0 : -height,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [scrollUp, headerTop, sportScrollYOffset]);

  const ScreenHeader = ({state, descriptors, navigation}) => {
    const headerStyles = StyleSheet.create({
      container: {
        backgroundColor: black,
        width: width,
      },
      main: {
        alignItems: 'center',
        marginLeft: px4,
      },
    });

    return (
      <Animated.View style={[headerStyles.container]}>
        <SportsHeader />
        <ScrollView
          horizontal
          contentContainerStyle={headerStyles.main}
          showsHorizontalScrollIndicator={false}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              setTheme(screens[route.params.index]);
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.screenOptions}>
                <View
                  style={[
                    isFocused && styles.dashBorder,
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
                    <Image
                      style={[styles.sport]}
                      source={{uri: screens[index].icon}}
                    />
                  </View>
                </View>
                <Text
                  style={[
                    styles.label,
                    {
                      color: isFocused ? white : grayLight,
                    },
                  ]}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Animated.View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: black,
        flex: 1,
      }}>
      {screens.length > 0 && (
        <Tab.Navigator
          screenOptions={{
            swipeEnabled: false,
          }}
          tabBar={props => <ScreenHeader {...props} />}>
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
  screenOptions: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: pyh,
    marginRight: 0.07 * width,
  },
  label: {
    fontFamily: medium,
    textTransform: 'uppercase',
  },
  sport: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  sportView: {
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 51,
    height: 51,
  },
  dashBorder: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 30,
    height: 58,
    width: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SportTabs;
