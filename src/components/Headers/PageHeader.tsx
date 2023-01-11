import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {height, width} from '../../constants/dimensions';
import {logo} from '../../constants/files';
import {gray, grayLight, green, white} from '../../constants/colors';
import {px1, px2, px4, px6, py2, pyh} from '../../constants/spacing';
import {sm} from '../../constants/fonts';

import {useNavigation} from '@react-navigation/native';
import useStore from '../../store/store';
import globalStyles from '../../styles/globals';

const PageHeader = ({title}: {title: string}) => {
  const {userProfile} = useStore();
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={globalStyles.textHeading}>{title}</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={styles.profileButton}>
            {userProfile?.image ? (
              <Image
                style={styles.profilePhoto}
                source={{
                  uri: userProfile?.image,
                }}
              />
            ) : (
              <View style={styles.profilePhoto}>
                <Icon color={grayLight} name="person" size={20} />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: px4,
  },
  logoView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 0.2 * width,
    height: 0.08 * height,
    resizeMode: 'contain',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchButton: {},
  searchIcon: {
    color: white,
    fontSize: 25,
  },
  profileButton: {},
  profilePhoto: {
    width: 0.1 * width,
    height: 0.1 * width,
    marginLeft: px4,
    borderRadius: 0.5 * width,
    backgroundColor: gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportsCarousel: {
    marginVertical: py2,
  },
  sportButton: {
    alignItems: 'center',
    marginHorizontal: px2,
    justifyContent: 'center',
  },
  sportLogoView: {
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  sportName: {
    color: white,
    textAlign: 'center',
    fontSize: sm,
  },
  subscribe: {
    borderColor: green,
    borderWidth: 1,
    paddingHorizontal: px6,
    paddingVertical: pyh,
    marginLeft: px2,
    borderRadius: px1,
  },
});

export default PageHeader;
