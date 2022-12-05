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
import {CommunityStack} from '../../../containers/routes/authenticated/community/CommunityRoutes';
import ImageCropPicker from 'react-native-image-crop-picker';
import useCommunityStore from '../../../store/communityStore';

type Props = NativeStackScreenProps<CommunityStack, 'ProfileSettings'>;

const CommunitySettings = ({navigation}: Props) => {
  const {setLoading} = useStore();
  const {community, setCommunityImage} = useCommunityStore();
  const [description, setDescription] = useState(community?.description);
  const updateDescriptionHandler = async () => {
    try {
      if (description === community?.description) return;
      setLoading(true);
      await updateCommunityDescription(community!._id, description);
    } catch (error) {
    } finally {
      setLoading(false);
      navigation.navigate('CommunityPage');
    }
  };

  const handleDoc = async () => {
    try {
      const doc = await ImageCropPicker.openPicker({
        width: 1080,
        height: 360,
        cropping: true,
      });

      const imageData = new FormData();
      imageData.append('image', {
        uri: doc?.path,
        name: community?.name,
        type: doc?.mime,
      });
      setLoading(true);
      const {image} = await updateCommunityImage(community._id, imageData);
      setCommunityImage(image);
      navigation.navigate('CommunityPage');
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
              <Image style={styles.avatar} source={{uri: community?.image}} />
              <View style={styles.avatarEditButton}>
                <Icon name="edit" size={20} color={black} />
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>Description</Text>
          <TextInput
            multiline
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
  avatarView: {},
  avatar: {
    height: 0.15 * height,
    width: 'auto',
    borderRadius: px2,
    resizeMode: 'cover',
  },
  avatarEditButton: {
    backgroundColor: white,
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

export default CommunitySettings;
