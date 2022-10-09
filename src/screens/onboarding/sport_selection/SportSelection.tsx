import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Storage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import React, {useState} from 'react';
import {UnauthenticatedStack} from '../../../containers/routes/Unauthenticated';
import Button from '../../../components/button/Button';
import * as files from '../../../constants/files';
import styles from './styles';

type Props = NativeStackScreenProps<UnauthenticatedStack, 'SportsSelection'>;

const SportSelection = ({navigation}: Props) => {
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
              <View style={styles.sportView} key={i}>
                <View style={styles.imageTextView}>
                  <Image style={styles.sportLogo} source={sport.logo} />
                  <Text style={styles.sportName}>{sport.name}</Text>
                </View>
                <TouchableOpacity onPress={() => handleSportsSelection(i)}>
                  <Icon
                    style={styles.sportSelected}
                    name={sport.selected ? 'star' : 'star-outline'}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonLabel}>
            Select any one sport of your choice
          </Text>
          <Button
            colored={check}
            title="Continue"
            onPress={() =>
              check &&
              navigation.navigate('Profile', {name: 'Complete profile'})
            }
          />
        </View>
      </View>
    </View>
  );
};

export default SportSelection;
