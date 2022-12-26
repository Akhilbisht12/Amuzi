import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {width} from '../../../../constants/dimensions';
import {blackLight, gray, grayLight, white} from '../../../../constants/colors';
import {px2, px3, px8, py1} from '../../../../constants/spacing';
import {sm} from '../../../../constants/fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import {commentOnPost} from '../../../../api/community/community.api';
import useStore from '../../../../store/store';
import useCommunityStore from '../../../../store/communityStore';
import {getCommunityPostHandler} from '../../../../handlers/community/joined';

type Props = {
  parentId?: string;
};

const PostComment = ({parentId}: Props) => {
  const [content, setContent] = useState('');
  const {userProfile, setLoading} = useStore();
  const {community, post} = useCommunityStore();

  const commentOnPostHandler = async () => {
    try {
      setLoading(true);
      await commentOnPost(community!._id, post!._id, content, parentId);
      setContent('');
      await getCommunityPostHandler(post!._id, community!._id);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.main}>
      {userProfile?.image ? (
        <Image source={{uri: userProfile?.image}} style={styles.profileImage} />
      ) : (
        <View style={{backgroundColor: gray, borderRadius: px8, padding: px2}}>
          <Icon color={grayLight} name="person" size={30} />
        </View>
      )}
      <View style={styles.inputView}>
        <TextInput
          multiline
          value={content}
          onChangeText={text => setContent(text)}
          style={styles.input}
          placeholderTextColor={grayLight}
          placeholder={`Add a ${parentId ? 'reply' : 'comment'}`}
        />
        {content.length > 0 && (
          <TouchableOpacity
            style={styles.postButton}
            onPress={commentOnPostHandler}>
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
    paddingHorizontal: px2,
    marginVertical: py1,
    marginHorizontal: px3,
    borderRadius: px2,
    elevation: 4,
    backgroundColor: blackLight,
    paddingVertical: py1,
  },

  inputView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 0.1 * width,
    height: 0.1 * width,
    borderRadius: 0.12 * width,
    marginRight: px2,
  },
  input: {
    width: 0.65 * width,
    color: white,
    fontSize: sm,
  },
  inputSend: {
    color: white,
    fontSize: 25,
  },
  postButton: {
    marginTop: py1,
  },
});

export default PostComment;
