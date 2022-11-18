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
import {CommunityStack} from '../../../containers/routes/authenticated/community/Community';
import styles from './styles';
import BackTitleHeader from '../../../components/Headers/BackTitleHeader';
import useStore from '../../../store/store';
import {grayLight, white} from '../../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {px2, px4} from '../../../constants/spacing';
import {height, width} from '../../../constants/dimensions';
import Button from '../../../components/button/Button';
import {updatePostContent} from '../../../api/community/community.api';

type Props = NativeStackScreenProps<CommunityStack, 'Post'>;

const EditPost = ({navigation}: Props) => {
  const {post, setLoading} = useStore();
  const [content, setContent] = useState(post!.content);

  const updatePostContentHandler = async () => {
    try {
      setLoading(true);
      await updatePostContent(post!.communityId, post!._id, content);
      navigation.navigate('Post', {
        _id: post!._id,
        community_id: post!.communityId,
      });
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
                {post?.communityId} &#183;
                {Math.round(
                  (Date.now() - new Date(post.date)) / (1000 * 60 * 60 * 24),
                )}
                D
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
        <Button
          onPress={updatePostContentHandler}
          colored={content?.length > 0 && content !== post?.content}
          title="Update"
        />
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
