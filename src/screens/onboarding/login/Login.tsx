import {View, Text, TextInput, TouchableOpacity, StatusBar} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {UnauthenticatedStack} from '../../../containers/routes/Unauthenticated';
import styles from './styles';
import Checkbox from '../../../components/checkbox/Checkbox';
import Button from '../../../components/button/Button';
import BackTitleHeader from '../../../components/Headers/BackTitleHeader';
import {signIn} from '../../../api/auth/auth';
import useStore from '../../../store/store';
import {black} from '../../../constants/colors';
import {bold, medium} from '../../../constants/fonts';

type Props = NativeStackScreenProps<UnauthenticatedStack, 'Login'>;

const Login = ({route, navigation}: Props) => {
  const [number, setNumber] = useState<number | undefined>();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const check = number?.toString().length === 10 && acceptTerms;
  const {setLoading} = useStore();

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (number) {
        await signIn(number);
        navigation.navigate('Otp', {
          name: 'Continue With Mobile',
          phone: number,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.main}>
      <StatusBar translucent={false} backgroundColor={black} />
      <BackTitleHeader title={route.params.name} />
      <View style={styles.phoneContainer}>
        <Text style={styles.title}>Enter your Mobile Number</Text>
        <View style={styles.inputWrapper}>
          <TextInput style={styles.title} value={'+91 - '} />
          <TextInput
            textContentType="telephoneNumber"
            keyboardType="numeric"
            value={number ? number.toString() : ''}
            onChangeText={phone => setNumber(+phone.replace(/[^0-9]/g, ''))}
            maxLength={10}
            style={styles.input}
          />
        </View>
        <View style={styles.terms}>
          <Checkbox
            onPress={() => setAcceptTerms(!acceptTerms)}
            checked={acceptTerms}
          />
          <TouchableOpacity
            style={styles.termsTextView}
            onPress={() => setAcceptTerms(!acceptTerms)}>
            <Text style={styles.termsText}>
              I have read and hereby accept the{' '}
              <Text style={{fontFamily: bold}}>Term of use</Text> and{' '}
              <Text style={{fontFamily: bold}}>Privacy note</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonView}>
          <Button
            colored={check}
            title="Continue"
            onPress={() => check && handleLogin()}
          />
        </View>
      </View>
    </View>
  );
};

export default Login;
