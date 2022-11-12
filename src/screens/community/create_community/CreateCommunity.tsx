import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import BackTitleHeader from '../../../components/Headers/BackTitleHeader';
import {CommunityStack} from '../../../containers/routes/Community';
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {grayLight, white} from '../../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../../components/button/Button';
import congrats from '../../../assets/images/congratulations.png';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {createCommunity} from '../../../api/community/community.api';
import useStore from '../../../store/store';
import {ToastAndroid} from 'react-native';

type Props = NativeStackScreenProps<CommunityStack, 'CreateCommunity'>;
type community = {
  name: string;
  category: string;
  reason: string;
  description: string;
  image: DocumentPickerResponse;
};

const CreateCommunity = ({route, navigation}: Props) => {
  const [community, setCommunity] = useState<community>({
    name: '',
    category: '',
    reason: '',
    description: '',
    image: {
      fileCopyUri: '',
      uri: '',
      name: '',
    },
  });
  const [terms, setTerms] = useState(false);
  const [communitySuccess, setCommunitySuccess] = useState(false);
  const [catDrop, setCatDrop] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    reason: '',
    description: '',
  });
  const {setLoading, setCreatedRefresh} = useStore();
  const check =
    community.name &&
    community.category &&
    community.reason &&
    community.image.fileCopyUri &&
    terms
      ? true
      : false;
  // handle document picker on profile select
  const handleDoc = async () => {
    const doc = await DocumentPicker.pickSingle({
      presentationStyle: 'fullScreen',
      copyTo: 'cachesDirectory',
      type: 'image/*',
    });
    setCommunity(state => {
      state.image = doc;
      return {...state};
    });
  };

  const handleCreateCommunity = async () => {
    setErrors(_ => {
      return {name: '', reason: '', description: ''};
    });
    if (community.name.length < 3 || community.name.length > 50) {
      setErrors(state => {
        state.name = 'Name should be between 3 to 50 characters';
        return {...state};
      });
      return;
    }
    if (community.reason.length < 150) {
      setErrors(state => {
        state.reason = 'Reason should be of 150 characters minimum';
        return {...state};
      });
      return;
    }

    if (community.description.length <= 150) {
      setErrors(state => {
        state.description = 'Description should be of 500 characters maximum';
        return {...state};
      });
    }

    setLoading(true);
    try {
      const communityData = new FormData();
      communityData.append('image', {
        uri: community.image?.fileCopyUri,
        name: community.image?.name,
        type: community.image?.type,
      });
      communityData.append('name', community.name);
      communityData.append('category', community.category);
      communityData.append('reason', community.reason);
      communityData.append('description', community.description);
      await createCommunity(communityData);
      setCreatedRefresh();
      setCommunitySuccess(true);
    } catch (error: any) {
      ToastAndroid.show(
        error.data.error ? error.data.error : 'Something went wrong!',
        ToastAndroid.SHORT,
      );
      setCommunitySuccess(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.main}>
      <ScrollView style={styles.mainScroll}>
        <BackTitleHeader title={route.params.name} />
        <View style={styles.paddedView}>
          <View style={styles.inputBox}>
            <View style={styles.photoContainer}>
              <TouchableOpacity onPress={handleDoc}>
                {community.image?.fileCopyUri ? (
                  <Image
                    style={styles.profileImage}
                    source={{uri: community.image.fileCopyUri}}
                  />
                ) : (
                  <Icon style={styles.photoIcon} name="camera" />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.inputView}>
              <Text style={styles.inputLabel}>Name</Text>
              <Text style={styles.inputLabelDesc}>
                Name should at least 3 characters long.
              </Text>
              <View style={styles.textInputView}>
                <TextInput
                  value={community.name}
                  onChangeText={text =>
                    setCommunity(state => {
                      state.name = text;
                      return {...state};
                    })
                  }
                  placeholderTextColor={grayLight}
                  style={styles.input}
                  maxLength={50}
                  placeholder="Name your community"
                />
                <Text style={styles.wordLimit}>{community.name.length}/50</Text>
              </View>

              {errors.name && <Text style={styles.error}>{errors.name}</Text>}
            </View>
            <View style={styles.inputView}>
              <Text style={styles.inputLabel}>Category</Text>
              <View style={styles.dropdown}>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={() => setCatDrop(!catDrop)}>
                  <Text style={styles.dropdownSelectedText}>
                    {community.category
                      ? community.category
                      : 'Select Category'}
                  </Text>
                  <Icon name="chevron-down" size={30} color={white} />
                </TouchableOpacity>
              </View>
              {catDrop && (
                <ScrollView nestedScrollEnabled style={styles.droppedView}>
                  {[{name: 'Cricket'}, {name: 'Football'}].map(item => {
                    return (
                      <TouchableOpacity
                        style={styles.dropItem}
                        onPress={() => {
                          setCatDrop(false);
                          setCommunity(state => {
                            state.category = item.name;
                            return {...state};
                          });
                        }}
                        key={item.name}>
                        {/* <View
                      style={
                        item.name === community.category
                          ? styles.dropItemSelected
                          : styles.dropItemUnselected
                      }
                    /> */}
                        <Text style={styles.droppedText}>{item.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              )}
            </View>
            <View style={styles.inputView}>
              <Text style={styles.inputLabel}>Reason</Text>
              <Text style={styles.inputLabelDesc}>
                Reason should at least 150 characters long.
              </Text>
              <View style={styles.textareaView}>
                <TextInput
                  value={community.reason}
                  onChangeText={text =>
                    setCommunity(state => {
                      state.reason = text;
                      return {...state};
                    })
                  }
                  maxLength={500}
                  multiline
                  placeholderTextColor={grayLight}
                  style={styles.textarea}
                  placeholder="Reason to create this community"
                />
                <Text style={styles.wordLimit}>
                  {community.reason.length}/500
                </Text>
              </View>

              {errors.reason && (
                <Text style={styles.error}>{errors.reason}</Text>
              )}
            </View>
            <View style={styles.inputView}>
              <Text style={styles.inputLabel}>Description</Text>
              <Text style={styles.inputLabelDesc}>
                Description is optional.
              </Text>
              <View style={styles.textareaView}>
                <TextInput
                  value={community.description}
                  onChangeText={text =>
                    setCommunity(state => {
                      state.description = text;
                      return {...state};
                    })
                  }
                  maxLength={500}
                  multiline
                  placeholderTextColor={grayLight}
                  style={styles.textarea}
                  placeholder="Description of the community"
                />
                <Text style={styles.wordLimit}>
                  {community.description.length}/500
                </Text>
              </View>

              {errors.description && (
                <Text style={styles.error}>{errors.reason}</Text>
              )}
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setTerms(!terms)}
            style={styles.terms}>
            <View style={terms ? styles.termsSelected : styles.termsUnselected}>
              {terms && (
                <Icon name="checkmark-outline" size={15} color={white} />
              )}
            </View>
            <Text style={styles.termsText}>
              Your 500 Amuzi coins will be deducted on creating the community.
            </Text>
          </TouchableOpacity>
          <View style={styles.buttonView}>
            <Button
              title="Continue"
              onPress={() => check && handleCreateCommunity()}
              colored={check}
            />
          </View>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={communitySuccess}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.modalView}>
          <View style={styles.modalContainer}>
            <Image source={congrats} style={styles.modalImage} />
            <Text style={styles.modalHeading}>Congratulations!</Text>
            <Text style={styles.modalDesc}>
              Your Community is created and currently under review.
            </Text>
            <View style={styles.modalButtonView}>
              <Button
                rounded
                colored
                onPress={() => console.log('got ot ')}
                title="Invite Friends"
              />
              <Button
                rounded
                onPress={() => navigation.navigate('CommunityHome')}
                title="Go to community"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CreateCommunity;
