import {StyleSheet, View} from 'react-native';
import React from 'react';
import {COMMENT} from '../../../../types/community/post';
import Comment from './Comment';

const Comments = ({comments}: {comments: COMMENT[]}) => {
  return (
    <View style={styles.main}>
      {comments.map(comment => {
        return <Comment key={comment._id} comment={comment} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {},
});

export default Comments;
