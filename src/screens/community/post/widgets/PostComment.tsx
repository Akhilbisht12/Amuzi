import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {USER} from '../../../../types/user/user';
import {width} from '../../../../constants/dimensions';
import {grayLight, white} from '../../../../constants/colors';
import {px2, px4} from '../../../../constants/spacing';
import {sm} from '../../../../constants/fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import {commentOnPost} from '../../../../api/community/community.api';
import useStore from '../../../../store/store';

type Props = {
  author: USER;
  communityId: string;
  postId: string;
  parentId?: string;
};

const PostComment = ({author, communityId, postId, parentId}: Props) => {
  const [content, setContent] = useState('');

  const {setPostRefresh} = useStore();

  const commentOnPostHandler = async () => {
    try {
      await commentOnPost(communityId, postId, content, parentId);
      setContent('');
      setPostRefresh();
    } catch (error) {}
  };
  return (
    <View style={styles.main}>
      <Image source={{uri: author.image}} style={styles.profileImage} />
      <View style={styles.inputView}>
        <TextInput
          multiline
          value={content}
          onChangeText={text => setContent(text)}
          style={styles.input}
          placeholderTextColor={grayLight}
          placeholder="Add a comment"
        />
        {content.length > 0 && (
          <TouchableOpacity onPress={commentOnPostHandler}>
            <Icon style={styles.inputSend} name="paper-plane" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: px4,
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  profileImage: {
    width: 0.12 * width,
    height: 0.12 * width,
    borderRadius: 0.12 * width,
    marginRight: px2,
  },
  input: {
    width: 0.7 * width,
    color: white,
    fontSize: sm,
  },
  inputSend: {
    color: 'blue',
    fontSize: 25,
  },
});

export default PostComment;
