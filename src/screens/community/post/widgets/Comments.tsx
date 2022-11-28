import {StyleSheet, View} from 'react-native';
import React from 'react';
import Comment from './Comment';
import useCommunityStore from '../../../../store/communityStore';

const Comments = () => {
  const {post} = useCommunityStore();
  const comments = post?.comments;
  return (
    <View style={styles.main}>
      {comments?.map((comment, index) => {
        return <Comment key={comment._id} index={index} comment={comment} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {},
});

export default Comments;
