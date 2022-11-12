import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {height, width} from '../../../constants/dimensions';
import {logo} from '../../../constants/files';
import {
  black,
  blackLight,
  gray,
  grayLight,
  white,
} from '../../../constants/colors';
import {px1, px2, px3, px4, py2} from '../../../constants/spacing';
import {sm} from '../../../constants/fonts';
import Cricket from '../../../assets/icons/Cricket';
import Football from '../../../assets/icons/Football';
import Volleyball from '../../../assets/icons/Volleyball';
import Marathon from '../../../assets/icons/Marathon';
import AllSports from '../../../assets/icons/AllSports';
import Basketball from '../../../assets/icons/Basketball';
import Athletics from '../../../assets/icons/Athletics';
import useStore from '../../../store/store';
import {useNavigation} from '@react-navigation/native';

type Props = {
  selected: number;
};

const categories = [
  {
    name: 'All Sports',
    logo: <AllSports />,
    navigation: '',
    key: 0,
    color: blackLight,
  },
  {
    name: 'Football',
    logo: <Football />,
    navigation: '',
    key: 1,
    color: '#23AD7C',
  },
  {
    name: 'Basketball',
    logo: <Basketball />,
    navigation: '',
    key: 2,
    color: '#DD52E1',
  },
  {name: 'Cricket', logo: <Cricket />, navigation: '', key: 3, color: 'orange'},
  {
    name: 'Athletics',
    logo: <Athletics />,
    navigation: '',
    key: 4,
    color: '#33A7E2',
  },
  {
    name: 'Volleyball',
    logo: <Volleyball />,
    navigation: '',
    key: 5,
    color: '#23AD7C',
  },
  {
    name: 'Marathon',
    logo: <Marathon />,
    navigation: '',
    key: 6,
    color: '#33A7E2',
  },
];

const SportsHeader = ({selected}: Props) => {
  const {userProfile} = useStore();
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <View style={styles.logoView}>
          <Image style={styles.logo} source={logo} />
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.searchButton}>
            <Icon style={styles.searchIcon} name="search-outline" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('profileSettings')}
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
      {/* <ScrollView style={styles.sportsCarousel} horizontal>
        {categories.map(sport => {
          return (
            <TouchableOpacity key={sport.key} style={styles.sportButton}>
              <View
                style={[styles.sportLogoView, {backgroundColor: sport.color}]}>
                {sport.logo}
              </View>
              <Text style={styles.sportName}>{sport.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView> */}
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
  logoView: {},
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
});

export default SportsHeader;
