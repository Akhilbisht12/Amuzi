import {
  ScrollView,
  View,
  Image,
  TextInput,
  StyleSheet,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommunityStack} from '../../../containers/routes/authenticated/community/CommunityRoutes';
import styles from './styles';
import BackTitleHeader from '../../../components/Headers/BackTitleHeader';
import useStore from '../../../store/store';
import {grayLight, white} from '../../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {px2, px4, py1} from '../../../constants/spacing';
import {height, width} from '../../../constants/dimensions';
import Button from '../../../components/button/Button';
import {updatePostContent} from '../../../api/community/community.api';
import useCommunityStore from '../../../store/communityStore';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {getCommunityPostHandler} from '../../../handlers/community/joined';

dayjs.extend(relativeTime);

type Props = NativeStackScreenProps<CommunityStack, 'EditPost'>;

const EditPost = ({navigation}: Props) => {
  const {setLoading} = useStore();
  const {post, community} = useCommunityStore();
  const [content, setContent] = useState(post?.content ? post.content : '');

  const updatePostContentHandler = async () => {
    try {
      setLoading(true);
      await updatePostContent(post!.communityId, post!._id, content);
      await getCommunityPostHandler(post!._id, community!._id);
      navigation.goBack();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.main}>
      <ScrollView>
        <BackTitleHeader title="Community" />
        <View style={[styles.postHeader, {paddingHorizontal: px4}]}>
          <View style={styles.postHeader}>
            {post?.author.image ? (
              <Image
                style={styles.headerImage}
                source={{uri: post.author.image}}
              />
            ) : (
              <View style={styles.headerImage}>
                <Icon name="person" color={grayLight} size={40} />
              </View>
            )}

            <View>
              <Text style={styles.headerCommunityName}>
                {post?.author.name}
              </Text>
              <Text style={styles.headerPostDetails}>
                {community?.name} &#183;{' '}
                <Text style={{textTransform: 'capitalize'}}>
                  {dayjs(post?.createdAt).fromNow()}
                </Text>
              </Text>
            </View>
          </View>
          <View />
        </View>
        <View style={{alignItems: 'center'}}>
          {post?.image && (
            <Image style={styles.postImage} source={{uri: post.image}} />
          )}
          <TextInput
            style={innerStyles.input}
            value={content}
            onChangeText={setContent}
            multiline
          />
        </View>
        <View style={{paddingHorizontal: px4, paddingVertical: py1}}>
          <Button
            onPress={updatePostContentHandler}
            colored={content?.length > 0 && content !== post?.content}
            title="Update"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const innerStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: white,
    borderRadius: px2,
    width: 0.9 * width,
    paddingHorizontal: px2,
    color: white,
    height: 0.15 * height,
    textAlignVertical: 'top',
  },
});

export default EditPost;
