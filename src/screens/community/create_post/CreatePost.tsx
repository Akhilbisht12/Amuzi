import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommunityStack} from '../../../containers/routes/Community';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {white} from '../../../constants/colors';
import {xl} from '../../../constants/fonts';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {createPost} from '../../../api/community/community.api';

type PROPS = NativeStackScreenProps<CommunityStack, 'CreatePost'>;

const CreatePost = ({route, navigation}: PROPS) => {
  const {name, community, communityId} = route.params;

  const [image, setImage] = useState<DocumentPickerResponse>();
  const [content, setContent] = useState('');

  const handleDoc = async () => {
    const doc = await DocumentPicker.pickSingle({
      presentationStyle: 'fullScreen',
      copyTo: 'cachesDirectory',
      type: 'image/*',
    });
    setImage(doc);
  };

  const createPostHandler = async () => {
    try {
      await createPost(content, communityId, image);
      navigation.goBack();
    } catch (error) {}
  };

  return (
    <View style={styles.main}>
      <ScrollView>
        <View style={styles.backHeader}>
          <View style={styles.backHeaderName}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-back-outline"
                style={styles.backHeaderIcon}
                size={xl}
              />
            </TouchableOpacity>
            <Text style={styles.backHeaderTitle}>{community}</Text>
          </View>
          <TouchableOpacity
            onPress={() => createPostHandler()}
            style={styles.postButton}>
            <Text style={styles.postText}>Post</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.paddedArea}>
          <View style={styles.profileHeader}>
            <Image
              style={styles.avatar}
              source={{
                uri: 'https://cdn.pixabay.com/photo/2022/09/02/07/31/alps-7426887_960_720.jpg',
              }}
            />
            <View>
              <Text style={styles.userName}>User Name</Text>
              <View style={styles.communityBadge}>
                <Icon
                  style={styles.communityBadgeIcon}
                  name="people-outline"
                  size={25}
                />
                <Text style={styles.communityBadgeText}>{community}</Text>
              </View>
            </View>
          </View>
          <View>
            <TextInput
              value={content}
              onChangeText={setContent}
              placeholderTextColor={white}
              placeholder="Submit a post for approval"
              multiline
              style={styles.postContent}
            />
            <TouchableOpacity onPress={handleDoc}>
              {image?.fileCopyUri ? (
                <View style={styles.uploadedImageView}>
                  <Image
                    style={styles.uploadedImage}
                    source={{uri: image.fileCopyUri}}
                  />
                </View>
              ) : (
                <View style={styles.uploadButton}>
                  <Icon style={styles.uploadIcon} name="cloud-upload-outline" />
                  <Text style={styles.uploadText}>Select Image / Video</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreatePost;
