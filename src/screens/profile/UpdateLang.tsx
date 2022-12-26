import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Storage from '@react-native-async-storage/async-storage';
import {
  black,
  blackLight,
  grayLight,
  green,
  white,
} from '../../constants/colors';
import {px2, px4} from '../../constants/spacing';
import {height, width} from '../../constants/dimensions';
import {bold, nm, sm, xl} from '../../constants/fonts';
import Button from '../../components/button/Button';
import {logo} from '../../constants/files';

const Languages = [
  {
    name: 'हिन्दी',
    selected: false,
  },
  {
    name: 'English',
    selected: false,
  },
  {
    name: 'বাংলা',
    selected: false,
  },
  {
    name: 'తెలుగు',
    selected: false,
  },
  {
    name: 'தமிழ்',
    selected: false,
  },
  {
    name: 'मराठी',
    selected: false,
  },
];
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
    padding: px4,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  logo: {
    height: 0.113 * height,
    width: 0.53 * width,
    resizeMode: 'contain',
    marginVertical: 0.01 * height,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 0.005 * height,
  },
  title: {
    color: white,
    fontSize: nm,
    fontFamily: bold,
    marginLeft: 5,
  },
  titleHindi: {
    color: white,
    fontSize: sm,
    textAlign: 'center',
    marginVertical: 0.005 * height,
  },
  parentLangContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: px2,
  },
  langContainer: {
    backgroundColor: blackLight,
    borderRadius: 12,
    padding: 8,
    width: 0.43 * width,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 0.15 * height,
    position: 'relative',
  },
  langTitle: {
    color: white,
    fontSize: xl,
    textAlign: 'center',
  },
  heartIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  buttonView: {
    width: 0.9 * width,
  },
});

const UpdateLang = () => {
  const [selectedLanguage, setSelectedlanguage] = useState<number>();

  // condition check to navigate to new screen
  let check = selectedLanguage !== undefined;

  // changing selected language in the state and adding it to local storage
  const handleSelectLanguage = async (i: number) => {
    await Storage.setItem('language', Languages[i].name);
    setSelectedlanguage(i);
  };

  return (
    <View style={styles.main}>
      <View>
        <Image source={logo} style={styles.logo} />
        <View style={styles.titleContainer}>
          <Icon size={20} color={white} name="volume-high" />
          <Text style={styles.title}>Choose you favorite language</Text>
        </View>
        <Text style={styles.titleHindi}>अपनी पसंदीदा भाषाएं चुनें</Text>
      </View>
      <View style={styles.parentLangContainer}>
        {Languages.map((language, i) => {
          return (
            <TouchableOpacity
              onPress={() => handleSelectLanguage(i)}
              key={i}
              style={styles.langContainer}>
              <Text style={styles.langTitle}>{language.name}</Text>
              <View style={styles.heartIcon}>
                <Icon
                  color={i === selectedLanguage ? green : grayLight}
                  size={20}
                  name={i === selectedLanguage ? 'heart' : 'heart-outline'}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.buttonView}>
        <Button colored={check} onPress={() => null} title="Continue" />
      </View>
    </View>
  );
};

export default UpdateLang;
