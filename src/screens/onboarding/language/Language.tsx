import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import logo from '../../../assets/logo.png';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../../components/button/Button';
import {grayLight, green, white} from '../../../constants/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Storage from '@react-native-async-storage/async-storage';
import {ProfileSetupStack} from '../../../containers/routes/unauthenticated/ProfileSetup';

type Props = NativeStackScreenProps<ProfileSetupStack, 'Language'>;

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

const Language = ({navigation}: Props) => {
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
        <Button
          colored={check}
          onPress={() => check && navigation.navigate('SportSelection')}
          title="Continue"
        />
      </View>
    </View>
  );
};

export default Language;
