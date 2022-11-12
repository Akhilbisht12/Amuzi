import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import BackTitleHeader from '../../components/Headers/BackTitleHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/button/Button';
import {createProfile, updateProfileImage} from '../../api/profile/profile.api';
import useStore from '../../store/store';
import Loader from '../../components/loader/Loader';
import {ProfileRoutesStack} from '../../containers/routes/ProfileRoutes';
import {StyleSheet} from 'react-native';
import {black, blackLight, white} from '../../constants/colors';
import {px1, px2, px3, px4, px5, px6, py2} from '../../constants/spacing';
import {nm, xs} from '../../constants/fonts';
import ImageCropPicker from 'react-native-image-crop-picker';

type Props = NativeStackScreenProps<ProfileRoutesStack, 'editProfile'>;

const EditProfile = ({}: Props) => {
  const {userProfile, setLoading, loading, changeUserProfileImage} = useStore();

  const [name, setName] = useState(userProfile?.name);
  const [dob, setDob] = useState([...userProfile?.dob.split('-').reverse()]);
  const [gender, setGender] = useState(userProfile.gender);
  const [showDrop, setShowDrop] = useState(false);
  const [image, setImage] = useState<{path: string; mime: string}>({
    path: userProfile?.image,
    mime: '',
  });
  const [check, setCheck] = useState(false);
  const [dateCheck, setDateCheck] = useState<boolean | null>(null);
  // refs of position for name animation & input for auto next focus
  const dobRefs = useRef<TextInput[]>([]);

  // handle document picker on profile select
  const handleDoc = async () => {
    try {
      const croppedImage = await ImageCropPicker.openPicker({
        width: 1080,
        height: 1080,
        cropping: true,
      });
      setLoading(true);
      setImage({path: croppedImage.path, mime: croppedImage.mime});
      const imageData = new FormData();
      imageData.append('image', {
        uri: croppedImage.path,
        name: userProfile.name,
        type: croppedImage.mime,
      });
      const response = await updateProfileImage(imageData);
      changeUserProfileImage(response.image);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // checking if all information are present before proceed
  useEffect(() => {
    if (name && gender && dateCheck === true) {
      setCheck(true);
    }
  }, [name, gender, dateCheck]);

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
        image?.path
          ? {
              uri: image?.path,
              name: userProfile.name,
              type: image?.mime,
            }
          : null,
      );
      profile.append('name', name);
      profile.append('dob', `${dob[1]}-${dob[0]}-${dob[2]}`); // mm-dd-yyyy
      profile.append('gender', gender);
      await createProfile(profile);
    } catch (error: any) {
      console.log(error);
      ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <View style={styles.main}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <BackTitleHeader title={'Edit Profile'} />
          <View style={styles.profileContainer}>
            <View>
              <View style={styles.photoContainer}>
                <TouchableOpacity onPress={handleDoc}>
                  {image?.path ? (
                    <Image
                      style={styles.profileImage}
                      source={{uri: image.path}}
                    />
                  ) : (
                    <Icon style={styles.photoIcon} name="camera" />
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.inputBox}>
                  <Text style={[styles.inputTitle]}>Name</Text>
                  <TextInput
                    value={name}
                    onChangeText={text => setName(text)}
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
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
    position: 'relative',
  },
  profileContainer: {
    flex: 1,
    paddingHorizontal: px6,
    justifyContent: 'space-between',
  },
  photoContainer: {
    alignItems: 'center',
    marginTop: py2,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  photoIcon: {
    fontSize: 50,
    color: white,
    backgroundColor: blackLight,
    paddingVertical: px5,
    paddingHorizontal: px6,
    borderRadius: 50,
  },
  inputContainer: {
    marginVertical: py2,
  },
  inputBox: {
    marginVertical: py2,
    borderColor: white,
    borderBottomWidth: 0.4,
  },
  inputTitle: {
    color: white,
    fontSize: xs,
  },
  input: {
    fontSize: nm,
    color: white,
    height: 50,
  },
  dobText: {
    color: white,
    fontSize: xs,
    marginVertical: px3,
  },
  dobBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dobSeparator: {
    height: 2,
    width: 5,
    backgroundColor: white,
  },
  genderText: {
    color: white,
    fontSize: xs,
    marginVertical: px3,
  },
  dropdownBox: {
    paddingVertical: px2,
    paddingHorizontal: px4,
    borderRadius: px1,
    backgroundColor: blackLight,
  },
});
export default EditProfile;
