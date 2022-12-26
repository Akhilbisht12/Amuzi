import {View, StyleSheet} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommunityStack} from '../../../../containers/routes/authenticated/community/CommunityRoutes';
import {black} from '../../../../constants/colors';
import BackTitleHeader from '../../../../components/Headers/BackTitleHeader';
import Comment from './Comment';
import {px4, py1} from '../../../../constants/spacing';
import PostComment from './PostComment';
import useCommunityStore from '../../../../store/communityStore';
import {COMMENT} from '../../../../types/community/post';

type Props = NativeStackScreenProps<CommunityStack, 'Reply'>;

const Replies = ({route}: Props) => {
  const {parentIndex, postIndex} = route.params;
  const {post} = useCommunityStore();
  const comment: COMMENT = post?.comments[parentIndex];
  return (
    <View style={styles.main}>
      <BackTitleHeader title="Replies" />
      <Comment postIndex={postIndex} comment={comment} index={parentIndex} />
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
          {comment.replies.map((reply, index) => {
            return (
              <Comment
                postIndex={postIndex}
                key={reply._id}
                comment={reply}
                index={index}
                parentIndex={parentIndex}
              />
            );
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
