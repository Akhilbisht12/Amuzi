import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {black, grayLight, white} from '../../../constants/colors';
import {height, width} from '../../../constants/dimensions';
import {px1, px2, px4, py1} from '../../../constants/spacing';
import {sm} from '../../../constants/fonts';
import useStore from '../../../store/store';
import {
  updateCommunityDescription,
  updateCommunityImage,
} from '../../../api/community/community.api';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommunityStack} from '../../../containers/routes/Community';
import DocumentPicker from 'react-native-document-picker';
import http from '../../../api/http';

type Props = NativeStackScreenProps<CommunityStack, 'ProfileSettings'>;

const ProfileSettings = ({navigation}: Props) => {
  const {community, setLoading, setCommunityImage} = useStore();
  const [image, setImage] = useState(community.image);
  const [description, setDescription] = useState(community.description);
  const updateDescriptionHandler = async () => {
    try {
      setLoading(true);
      await updateCommunityDescription(community._id, description);
    } catch (error) {
    } finally {
      setLoading(false);
      navigation.navigate('CommunityPage', {
        item: {...community, description},
        name: community.name,
        isAdmin: true,
      });
    }
  };

  const handleDoc = async () => {
    try {
      const doc = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        type: 'image/*',
      });
      const imageData = new FormData();
      imageData.append('image', {
        uri: doc?.fileCopyUri,
        name: doc?.name,
        type: doc?.type,
      });
      setLoading(true);
      const {image} = await updateCommunityImage(community._id, imageData);
      setCommunityImage(image);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.fullView}>
      <ScrollView style={styles.fullScroll}>
        <View style={styles.main}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="close" size={30} color={white} />
            </TouchableOpacity>
            <TouchableOpacity onPress={updateDescriptionHandler}>
              <Icon name="check" size={30} color={white} />
            </TouchableOpacity>
          </View>
          <View style={styles.avatarView}>
            <TouchableOpacity onPress={handleDoc} style={styles.avatarView}>
              <Image style={styles.avatar} source={{uri: image}} />
              <View style={styles.avatarEditButton}>
                <Icon name="edit" size={20} color={black} />
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            style={styles.description}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullView: {
    flex: 1,
  },
  fullScroll: {
    flexGrow: 1,
  },
  main: {
    height: height,
    backgroundColor: black,
    paddingHorizontal: px4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: py1,
  },
  avatarView: {
    alignItems: 'center',
  },
  avatar: {
    height: 0.25 * width,
    width: 0.25 * width,
    borderRadius: 0.125 * width,
    resizeMode: 'contain',
  },
  avatarEditButton: {
    backgroundColor: grayLight,
    padding: px1,
    borderRadius: 0.1 * width,
    position: 'absolute',
    bottom: 0,
    right: 0,
    elevation: 1,
  },
  label: {
    color: grayLight,
    fontSize: sm,
    paddingVertical: py1,
  },
  description: {
    height: 0.2 * height,
    borderWidth: 1,
    borderRadius: px2,
    borderColor: grayLight,
    textAlignVertical: 'top',
    color: white,
    padding: px2,
  },
});

export default ProfileSettings;
