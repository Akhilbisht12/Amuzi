import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommunityStack} from '../../../../containers/routes/authenticated/community/CommunityRoutes';
import {black} from '../../../../constants/colors';
import BackTitleHeader from '../../../../components/Headers/BackTitleHeader';
import Comment from './Comment';
import {px2, px4, py1} from '../../../../constants/spacing';
import PostComment from './PostComment';

type Props = NativeStackScreenProps<CommunityStack, 'Reply'>;

const Replies = ({route}: Props) => {
  const comment = route.params.comment;
  return (
    <View style={styles.main}>
      <BackTitleHeader title="Replies" />
      <Comment comment={comment} />
      <View style={styles.repliesBox}>
        <PostComment
          {...{
            communityId: comment.communityId,
            author: comment.author,
            parentId: comment._id,
            postId: comment.postId,
          }}
        />

        <View>
          {comment.replies.map(reply => {
            return <Comment key={reply._id} comment={reply} />;
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
  },
  repliesBox: {
    paddingLeft: px4,
    marginVertical: py1,
  },
});

export default Replies;
