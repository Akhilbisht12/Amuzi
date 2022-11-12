import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommunityStack} from '../../../containers/routes/Community';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {grayLight, white} from '../../../constants/colors';
import {xl} from '../../../constants/fonts';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {createPost} from '../../../api/community/community.api';
import useStore from '../../../store/store';
import Button from '../../../components/button/Button';
import congrats from '../../../assets/images/congratulations.png';

type PROPS = NativeStackScreenProps<CommunityStack, 'CreatePost'>;

const CreatePost = ({route, navigation}: PROPS) => {
  const {communityId} = route.params;
  const [postSuccess, setPostSuccess] = useState(false);

  const [image, setImage] = useState<DocumentPickerResponse>();
  const [content, setContent] = useState('');
  const {setLoading, setPostRefresh, community, userProfile} = useStore();
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
      setLoading(true);
      console.log('here');
      await createPost(content, communityId, image);

      setPostRefresh();
      community.approvalRequired && setPostSuccess(true);

      // navigation.goBack();
      // navigation.navigate('CommunityPage', {});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
            <Text style={styles.backHeaderTitle}>{community.name}</Text>
          </View>
          <TouchableOpacity
            onPress={() => createPostHandler()}
            style={styles.postButton}>
            <Text style={styles.postText}>Post</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.paddedArea}>
          <View style={styles.profileHeader}>
            {userProfile.image ? (
              <Image
                style={styles.avatar}
                source={{
                  uri: userProfile.image,
                }}
              />
            ) : (
              <View style={styles.avatar}>
                <Icon name="person" size={30} color={grayLight} />
              </View>
            )}
            <View>
              <Text style={styles.userName}>{userProfile.name}</Text>
              <View style={styles.communityBadge}>
                <Icon
                  style={styles.communityBadgeIcon}
                  name="people-outline"
                  size={25}
                />
                <Text style={styles.communityBadgeText}>{community.name}</Text>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={postSuccess}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.modalView}>
          <View style={styles.modalContainer}>
            <Image source={congrats} style={styles.modalImage} />
            <Text style={styles.modalHeading}>Congratulations!</Text>
            <Text style={styles.modalDesc}>Post submitted for approval</Text>
            <View style={styles.modalButtonView}>
              <Button
                rounded
                onPress={() => {
                  setPostSuccess(false);
                  navigation.goBack();
                }}
                title="Go back to community"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CreatePost;
