import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommunityStack} from '../../../../containers/routes/Community';
import {black} from '../../../../constants/colors';
import BackTitleHeader from '../../../../components/Headers/BackTitleHeader';
import Comment from './Comment';
import {px4} from '../../../../constants/spacing';
import PostComment from './PostComment';

type Props = NativeStackScreenProps<CommunityStack, 'Reply'>;

const Replies = ({route}: Props) => {
  const comment = route.params.comment;
  return (
    <View style={styles.main}>
      <BackTitleHeader title="Replies" />
      <PostComment
        {...{
          communityId: comment.communityId,
          author: comment.author,
          parentId: comment._id,
          postId: comment.postId,
        }}
      />
      <Comment comment={comment} />
      <View style={styles.replies}>
        {comment.replies.map(reply => {
          return <Comment key={reply._id} comment={reply} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
  },
  replies: {
    paddingLeft: px4,
  },
});

export default Replies;
