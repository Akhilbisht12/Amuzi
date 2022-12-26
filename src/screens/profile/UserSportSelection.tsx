import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Storage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import React, {useState} from 'react';
import * as files from '../../constants/files';
import Button from '../../components/button/Button';
import {black, blackLight, white, yellow} from '../../constants/colors';
import {height, width} from '../../constants/dimensions';
import {px4, py2} from '../../constants/spacing';
import {bold, medium, nm, sm, xs} from '../../constants/fonts';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
  },
  logoView: {
    alignItems: 'center',
    marginVertical: 0.01 * height,
  },
  logo: {
    height: 0.113 * height,
    width: 0.53 * width,
    resizeMode: 'contain',
    marginVertical: 0.01 * height,
  },
  sportsContainer: {
    backgroundColor: blackLight,
    flex: 1,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    paddingHorizontal: px4,
    paddingVertical: py2,
    justifyContent: 'space-between',
  },
  titleContainer: {
    marginVertical: py2,
  },
  favTitle: {
    color: white,
    fontSize: nm,
    fontFamily: medium,
  },
  favHindi: {
    color: white,
    fontSize: sm,
  },
  sportView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: py2,
  },
  imageTextView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sportLogo: {
    height: 28,
    width: 28,
    resizeMode: 'contain',
    backgroundColor: black,
    borderRadius: 6,
  },
  sportName: {
    color: white,
    fontSize: nm,
    fontFamily: bold,
    marginLeft: px4,
  },
  sportSelected: {
    color: yellow,
    fontSize: 20,
  },
  buttonContainer: {
    marginVertical: py2,
  },
  buttonLabel: {
    color: white,
    fontSize: xs,
    textAlign: 'center',
  },
});

const UserSportSelection = () => {
  // state of multiple sports
  const [sports, setSports] = useState([
    {logo: files.football, name: 'Football', selected: false},
    {logo: files.basketball, name: 'Basket Ball', selected: false},
    {logo: files.cricket, name: 'Cricket', selected: false},
    {logo: files.javelin, name: 'Athletics', selected: false},
    {logo: files.volleyball, name: 'Volley Ball', selected: false},
    {logo: files.marathon, name: 'Marathon', selected: false},
  ]);

  // check to proceed to next screen
  const check = sports.filter(item => item.selected === true).length > 0;

  // selection of multiple fav sports and saving them to local storage
  const handleSportsSelection = async (i: number) => {
    setSports(state => {
      state[i].selected = !state[i].selected;
      return [...state];
    });
    const selectedSports: string[] = [];
    sports.map(item => {
      if (item.selected === true) {
        selectedSports.push(item.name);
      }
    });
    await Storage.setItem('favSports', JSON.stringify(selectedSports));
  };

  return (
    <View style={styles.main}>
      <View style={styles.logoView}>
        <Image style={styles.logo} source={files.logo} />
      </View>
      <View style={styles.sportsContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.favTitle}>Choose your favorite sport</Text>
          <Text style={styles.favHindi}>अपना पसंदीदा खेल चुनें</Text>
        </View>
        <ScrollView>
          {sports.map((sport, i) => {
            return (
              <TouchableOpacity
                onPress={() => handleSportsSelection(i)}
                style={styles.sportView}
                key={i}>
                <View style={styles.imageTextView}>
                  <Image style={styles.sportLogo} source={sport.logo} />
                  <Text style={styles.sportName}>{sport.name}</Text>
                </View>
                <View>
                  <Icon
                    style={styles.sportSelected}
                    name={sport.selected ? 'star' : 'star-outline'}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonLabel}>
            Select any one sport of your choice
          </Text>
          <Button colored={check} title="Continue" onPress={() => null} />
        </View>
      </View>
    </View>
  );
};

export default UserSportSelection;
