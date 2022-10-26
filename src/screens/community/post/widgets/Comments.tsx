import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {COMMENT} from '../../../../types/community/post';
import {width} from '../../../../constants/dimensions';
import {gray, grayLight, white} from '../../../../constants/colors';
import {px1, px2, py1, py2} from '../../../../constants/spacing';
import {medium, nm, sm, xs} from '../../../../constants/fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const Comments = ({comments}: {comments: COMMENT[]}) => {
  const navigation = useNavigation();
  return (
    <View>
      {comments.map(comment => {
        return (
          <View key={comment._id} style={styles.main}>
            <Image
              style={styles.image}
              source={{
                uri: comment.author.image,
              }}
            />
            <View style={styles.commentParentView}>
              <View style={styles.commentInfo}>
                <Text style={styles.authorName}>{comment.author.name} </Text>
                <Text style={styles.commentTime}>
                  {Math.round(
                    (Date.now() - new Date(comment.createdAt)) /
                      (1000 * 60 * 60 * 24),
                  )}
                  D
                </Text>
              </View>
              <View style={styles.commentView}>
                <Text style={styles.comment}>{comment.content}</Text>
              </View>
              <View style={styles.voteView}>
                <TouchableOpacity style={styles.voteButton}>
                  <Icon name="thumbs-up-outline" style={styles.voteIcon} />
                  <Text style={styles.voteCount}>{comment.upvoteCount}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.voteButton}>
                  <Icon name="thumbs-down-outline" style={styles.voteIcon} />
                  <Text style={styles.voteCount}>{comment.downvoteCount}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Reply', {comment: comment})
                  }
                  style={styles.voteButton}>
                  <Icon name="chatbubble-outline" style={styles.voteIcon} />
                  <Text style={styles.voteCount}>{comment.repliesCount}</Text>
                </TouchableOpacity>
              </View>
              {comment.repliesCount > 0 && (
                <View style={styles.replyView}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Reply', {comment: comment})
                    }
                    style={styles.replyButton}>
                    <Text style={styles.replyText}>
                      {comment.repliesCount}
                      {comment.repliesCount === 1 ? ' reply' : ' replies'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: py2,
    borderBottomColor: gray,
    borderBottomWidth: 2,
  },
  image: {
    width: 0.15 * width,
    height: 0.15 * width,
    borderRadius: 0.15 * width,
    marginRight: px2,
  },
  commentParentView: {},
  commentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorName: {
    color: grayLight,
    fontSize: xs,
  },
  commentTime: {
    color: grayLight,
    fontSize: xs,
  },
  commentView: {
    width: 0.85 * width,
  },
  comment: {
    color: white,
    fontSize: sm,
  },
  voteView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteButton: {
    marginHorizontal: px2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteIcon: {
    color: white,
    fontSize: 24,
    marginRight: px1,
  },
  voteCount: {
    color: white,
    fontSize: nm,
    fontFamily: medium,
    marginHorizontal: px2,
  },
  replyView: {
    marginVertical: py1,
  },
  replyButton: {},
  replyText: {
    color: 'blue',
    fontSize: sm,
  },
});

export default Comments;
