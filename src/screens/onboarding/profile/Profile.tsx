import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  ScrollView,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from './styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import BackTitleHeader from '../../../components/Headers/BackTitleHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../../components/button/Button';
import {white} from '../../../constants/colors';
import Storage from '@react-native-async-storage/async-storage';
import {createProfile} from '../../../api/profile/profile.api';
import useStore from '../../../store/store';
import Loader from '../../../components/loader/Loader';
import {ProfileSetupStack} from '../../../containers/routes/unauthenticated/ProfileSetup';

type Props = NativeStackScreenProps<ProfileSetupStack, 'profileSetup'>;

const Profile = ({route}: Props) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState(['', '', '']);
  const [gender, setGender] = useState('');
  const [showDrop, setShowDrop] = useState(false);
  const [image, setImage] = useState<DocumentPickerResponse>();
  const [check, setCheck] = useState(false);
  const [lang, setLang] = useState('');
  const [sports, setSports] = useState([]);
  const [dateCheck, setDateCheck] = useState<boolean | null>(null);
  // refs of position for name animation & input for auto next focus
  const position = useRef(new Animated.Value(15)).current;
  const dobRefs = useRef<TextInput[]>([]);

  const {setUserState, setLoading, loading} = useStore();

  // handle document picker on profile select
  const handleDoc = async () => {
    const doc = await DocumentPicker.pickSingle({
      presentationStyle: 'fullScreen',
      copyTo: 'cachesDirectory',
      type: 'image/*',
    });
    setImage(doc);
  };

  // animate name label upwards on press in
  const handleLabelUp = () =>
    Animated.timing(position, {
      toValue: 50,
      duration: 500,
      useNativeDriver: false,
    }).start();

  // animate name label downwards on press out when name is empty
  const handleLabelDown = () => {
    if (name) return;
    Animated.timing(position, {
      toValue: 15,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  // getting initial selected prefrences from local storage
  useEffect(() => {
    (async () => {
      let getLang = await Storage.getItem('language');
      let getSports = await Storage.getItem('favSports');
      if (getLang) {
        setLang(getLang);
      }
      if (getSports) {
        setSports(JSON.parse(getSports));
      }
    })();
  }, []);

  // checking if all information are present before proceed
  useEffect(() => {
    if (lang && sports && name && gender && dateCheck === true) {
      setCheck(true);
    }
  }, [name, gender, lang, sports, dateCheck]);

  useEffect(() => {
    if (dob[0].length === 2 && dob[1].length === 2 && dob[2].length === 4) {
      setDateCheck(isValidDate(dob.join('/')));
    } else {
      setDateCheck(null);
    }
  }, [dob]);

  // date validator
  const isValidDate = (dateString: string): boolean => {
    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;

    // Parse the date parts to integers
    var parts = dateString.split('/');
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month === 0 || month > 12) return false;

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
      monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
  };

  // api call to setup profile
  const handleProfileSetup = async () => {
    if (loading || !check) return;
    try {
      setLoading(true);
      const profile = new FormData();
      profile.append(
        'image',
        image?.fileCopyUri
          ? {
              uri: image?.fileCopyUri,
              name: image?.name,
              type: image?.type,
            }
          : null,
      );
      profile.append('name', name);
      profile.append('dob', `${dob[1]}-${dob[0]}-${dob[2]}`); // mm-dd-yyyy
      profile.append('favouriteSports', sports[0]);
      profile.append('language', lang);
      profile.append('gender', gender);
      await createProfile(profile);
      await Storage.setItem('onBoarded', 'true');
      setUserState('onBoarded');
    } catch (error: any) {
      ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <View style={styles.main}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <BackTitleHeader title={route.params.name} />
          <View style={styles.profileContainer}>
            <View>
              <View style={styles.photoContainer}>
                <TouchableOpacity onPress={handleDoc}>
                  {image?.fileCopyUri ? (
                    <Image
                      style={styles.profileImage}
                      source={{uri: image.fileCopyUri}}
                    />
                  ) : (
                    <Icon style={styles.photoIcon} name="camera" />
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.inputBox}>
                  <Animated.View
                    style={[styles.animTextView, {bottom: position}]}>
                    <Text style={[styles.inputTitle]}>Name</Text>
                  </Animated.View>
                  <TextInput
                    value={name}
                    onChangeText={text => setName(text)}
                    onBlur={handleLabelDown}
                    onPressIn={handleLabelUp}
                    style={styles.input}
                  />
                </View>
                <View style={styles.inputBox}>
                  <Text style={styles.dobText}>Enter date of birth</Text>
                  <View style={styles.dobBox}>
                    <TextInput
                      ref={el => {
                        if (el) {
                          dobRefs.current[0] = el;
                        }
                      }}
                      value={dob[0]}
                      onChangeText={text =>
                        setDob(state => {
                          if (text.length === 2) {
                            state[0] = text;
                            dobRefs.current[1].focus();
                          } else {
                            state[0] = text;
                          }
                          return [...state];
                        })
                      }
                      style={[
                        styles.input,
                        dateCheck === false && {color: 'red'},
                      ]}
                      placeholderTextColor={white}
                      placeholder="DD"
                      maxLength={2}
                      keyboardType="numeric"
                    />
                    <View style={styles.dobSeparator} />
                    <TextInput
                      ref={el => {
                        if (el) {
                          dobRefs.current[1] = el;
                        }
                      }}
                      value={dob[1]}
                      onKeyPress={e => {
                        if (
                          e.nativeEvent.key === 'Backspace' &&
                          dob[1].length === 0
                        ) {
                          dobRefs.current[0].focus();
                        }
                      }}
                      onChangeText={text =>
                        setDob(state => {
                          if (text.length === 2) {
                            state[1] = text;
                            dobRefs.current[2].focus();
                          } else {
                            state[1] = text;
                          }
                          return [...state];
                        })
                      }
                      style={[
                        styles.input,
                        dateCheck === false && {color: 'red'},
                      ]}
                      placeholder="MM"
                      placeholderTextColor={white}
                      maxLength={2}
                      keyboardType="numeric"
                    />
                    <View style={styles.dobSeparator} />
                    <TextInput
                      ref={el => {
                        if (el) {
                          dobRefs.current[2] = el;
                        }
                      }}
                      value={dob[2]}
                      onKeyPress={e => {
                        if (
                          e.nativeEvent.key === 'Backspace' &&
                          dob[2].length === 0
                        ) {
                          dobRefs.current[1].focus();
                        }
                      }}
                      onChangeText={text =>
                        setDob(state => {
                          state[2] = text;
                          return [...state];
                        })
                      }
                      style={[
                        styles.input,
                        dateCheck === false && {color: 'red'},
                      ]}
                      placeholder="YYYY"
                      placeholderTextColor={white}
                      maxLength={4}
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <View>
                  <View style={styles.inputBox}>
                    <View>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                        onPress={() => setShowDrop(!showDrop)}>
                        <Text style={styles.genderText}>
                          {gender ? gender : 'Select Gender'}
                        </Text>
                        <Icon size={20} name="chevron-down" color={white} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {showDrop && (
                    <View style={styles.dropdownBox}>
                      {['Male', 'Female'].map(item => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              setShowDrop(false);
                              setGender(item);
                            }}
                            key={item}>
                            <Text style={styles.genderText}>{item}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}
                </View>
              </View>
            </View>

            <View>
              <Button
                title="Continue"
                onPress={handleProfileSetup}
                colored={check}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <Loader />
    </>
  );
};

export default Profile;
