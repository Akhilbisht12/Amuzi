import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import React from 'react';
import ViewWrapper from '../../components/wrappers/ViewWrapper';
import useStore from '../../store/store';
import {width} from '../../constants/dimensions';
import {
  blackLight,
  gray,
  grayLight,
  green,
  white,
} from '../../constants/colors';
import {lg, md, medium, sm, xs} from '../../constants/fonts';
import {px2, px4, py1, py2} from '../../constants/spacing';
import Icon from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProfileRoutesStack} from '../../containers/routes/authenticated/profile/ProfileRoutes';
import usePricingStore from '../../store/pricingStore';
import dayjs from 'dayjs';

type Props = NativeStackScreenProps<ProfileRoutesStack, 'profile'>;

const ProfileSettings = ({navigation}: Props) => {
  const {userSubscription} = usePricingStore();
  const {userProfile, setUserState, setUser, setOpenSubscriptionPanel} =
    useStore();
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
            <Text style={styles.userName}>{userProfile?.name}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close-outline" color={white} size={35} />
        </TouchableOpacity>
      </View>
      {/* subscription */}
      <Pressable
        style={[
          styles.list,
          {
            marginHorizontal: px4,
            borderRadius: px2,
            borderWidth: 1,
            paddingVertical: py2,
            borderColor: userSubscription === null ? grayLight : green,
            backgroundColor: blackLight,
          },
        ]}
        onPress={() => {
          userSubscription === null && setOpenSubscriptionPanel(true);
        }}>
        <View style={styles.listInfo}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: py2,
            }}>
            <Icon
              color={userSubscription === null ? grayLight : green}
              size={22}
              name={'ribbon-outline'}
            />
            <Text
              style={[
                styles.listDesc,
                {
                  marginLeft: px2,
                  color: userSubscription === null ? grayLight : green,
                  fontSize: sm,
                  textTransform: 'uppercase',
                },
              ]}>
              Subscription
            </Text>
          </View>
          <Text style={[styles.listName, {fontSize: lg}]}>
            {userSubscription
              ? userSubscription.name + ' Plan'
              : 'No Active Plan'}
          </Text>
          <Text
            style={[
              styles.listDesc,
              {color: userSubscription === null ? green : grayLight},
            ]}>
            {userSubscription
              ? 'Expires on ' +
                dayjs(userSubscription?.expiresAt).format('DD MMM YYYY')
              : 'Buy Subscription Plan'}
          </Text>
        </View>
      </Pressable>
      <View style={styles.menu}>
        {[
          // {
          //   name: 'Downloads',
          //   description: 'Watch videos offline',
          //   handler: () => console.log('nav'),
          //   icon: 'cloud-upload-outline',
          // },
          {
            name: 'Watchlist',
            description: 'Save to watch later',
            handler: () => navigation.navigate('watchlist'),
            icon: 'albums-outline',
          },
          {
            name: 'History',
            description: 'Continue watching',
            handler: () => console.log('nav'),
            icon: 'time-outline',
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
            name: 'FAQ',
            handler: () => console.log('nav'),
            icon: 'chatbox-ellipses-outline',
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
      <View style={styles.signout}>
        <TouchableOpacity
          style={styles.list}
          onPress={() => {
            setUser(null);
            setUserState('loggedOut');
            AsyncStorage.clear();
          }}>
          <Icon name="log-out-outline" size={30} color={white} />
          <Text style={[styles.listName]}>Sign out</Text>
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
    fontSize: md,
    fontFamily: medium,
  },
  listDesc: {
    color: grayLight,
    fontSize: xs,
    fontFamily: medium,
    letterSpacing: 0.5,
  },
  divider: {
    marginVertical: py1,
    marginHorizontal: px4,
    backgroundColor: gray,
    padding: 0.5,
  },
  signout: {
    alignItems: 'center',
    marginVertical: py1,
  },
});

export default ProfileSettings;
