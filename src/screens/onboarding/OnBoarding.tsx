import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import styles from './styles';
import bgBanner from '../../assets/onboardSplash.png';
import logo from '../../assets/logo.png';
import Button from '../../components/button/Button';
import {useNavigation} from '@react-navigation/native';

const OnBoarding = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground source={bgBanner} style={styles.main}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.mainChild}>
        <View>
          <Image source={logo} style={styles.logo} />
        </View>
        <View>
          <Text style={styles.welcomeHeading}>Welcome To Amuzi</Text>
          <Text style={styles.welcomeDescription}>
            Register on Amuzi or Sign in into your existing account via Mobile
            Number
          </Text>
          <Button
            colored
            onPress={() =>
              navigation.navigate('Login', {name: 'Sign In With Mobile'})
            }
            title="Sign In With Mobile"
          />
          <TouchableOpacity>
            <Text style={styles.skip}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default OnBoarding;
