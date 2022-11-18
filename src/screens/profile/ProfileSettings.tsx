import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import ViewWrapper from '../../components/wrappers/ViewWrapper';
import useStore from '../../store/store';
import {width} from '../../constants/dimensions';
import {black, gray, grayLight, white} from '../../constants/colors';
import {lg, md, medium, nm, sm, xl} from '../../constants/fonts';
import {px2, px4, py1, py2} from '../../constants/spacing';
import Icon from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileRoutesStack} from '../../containers/routes/ProfileRoutes';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<ProfileRoutesStack, 'profile'>;

const ProfileSettings = ({navigation}: Props) => {
  const {userProfile, setUserState, setUser} = useStore();
  return (
    <ViewWrapper>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('editProfile')}
          style={styles.userInfo}>
          <View>
            {userProfile?.image ? (
              <Image style={styles.avatar} source={{uri: userProfile?.image}} />
            ) : (
              <View style={styles.avatar}>
                <Icon name="person" size={25} color={gray} />
              </View>
            )}
          </View>
          <View>
            <Text style={styles.greetingUser}>Hello</Text>
            <Text style={styles.userName}>{userProfile.name}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close-outline" color={white} size={35} />
        </TouchableOpacity>
      </View>
      <View style={styles.menu}>
        {[
          {
            name: 'Downloads',
            description: 'Watch videos offline',
            handler: () => console.log('nav'),
            icon: 'cloud-upload-outline',
          },
          {
            name: 'Watchlist',
            description: 'Save to watch later',
            handler: () => console.log('nav'),
            icon: 'time-outline',
          },
          {
            name: 'History',
            description: 'Continue watching',
            handler: () => console.log('nav'),
            icon: 'timer-outline',
          },
        ].map((item, i) => {
          return (
            <TouchableOpacity
              style={styles.list}
              key={i}
              onPress={item.handler}>
              <Icon color={white} size={30} name={item.icon} />
              <View style={styles.listInfo}>
                <Text style={styles.listName}>{item.name}</Text>
                <Text style={styles.listDesc}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.divider} />
      <View style={styles.menu}>
        {[
          {
            name: 'Transactions',
            handler: () => console.log('nav'),
            icon: 'card-outline',
          },
          {
            name: 'Subscription / Passes',
            handler: () => console.log('nav'),
            icon: 'receipt-outline',
          },
          {
            name: 'Select Language',
            handler: () => console.log('nav'),
            icon: 'chatbubble-ellipses-outline',
          },
          {
            name: 'Your Favourite Sports',
            handler: () => console.log('nav'),
            icon: 'football-outline',
          },
        ].map((item, i) => {
          return (
            <TouchableOpacity
              style={styles.list}
              key={i}
              onPress={item.handler}>
              <Icon color={white} size={30} name={item.icon} />
              <View style={styles.listInfo}>
                <Text style={styles.listName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.divider} />
      <View style={styles.menu}>
        {[
          {
            name: 'Prefrences',
            handler: () => console.log('nav'),
            icon: 'settings-outline',
          },
          {
            name: 'Help',
            handler: () => console.log('nav'),
            icon: 'help-circle',
          },
        ].map((item, i) => {
          return (
            <TouchableOpacity
              style={styles.list}
              key={i}
              onPress={item.handler}>
              <Icon color={white} size={30} name={item.icon} />
              <View style={styles.listInfo}>
                <Text style={styles.listName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.divider} />
      <View style={[styles.listInfo, styles.list]}>
        <Text style={styles.listDesc}>Privacy Policy </Text>
        <Text style={styles.listDesc}>&#xB7; T&C</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            setUser(null);
            setUserState('loggedOut');
            AsyncStorage.clear();
          }}>
          <Text
            style={[
              styles.listName,
              {textAlign: 'center', marginVertical: py2},
            ]}>
            Sign out
          </Text>
        </TouchableOpacity>
      </View>
    </ViewWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.6,
    borderBottomColor: '#0d0d0d',
    paddingVertical: py1,
    paddingHorizontal: px4,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 0.2 * width,
    height: 0.1 * width,
    width: 0.1 * width,
    backgroundColor: grayLight,
    marginRight: px4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingUser: {
    color: grayLight,
    fontSize: sm,
  },
  userName: {
    color: white,
    fontSize: md,
  },
  menu: {
    paddingHorizontal: px4,
    marginVertical: py2,
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: py1,
  },
  listInfo: {
    marginLeft: px4,
  },
  listName: {
    color: white,
    fontSize: lg,
    fontFamily: medium,
  },
  listDesc: {
    color: grayLight,
    fontSize: nm,
    fontFamily: medium,
  },
  divider: {
    marginVertical: py1,
    backgroundColor: grayLight,
    padding: 1,
  },
});

export default ProfileSettings;
