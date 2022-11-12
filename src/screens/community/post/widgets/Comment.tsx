import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React, {useRef, useState} from 'react';
import {COMMENT} from '../../../../types/community/post';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {black, gray, grayLight, white} from '../../../../constants/colors';
import {px1, px2, px4, px8, py1, py2} from '../../../../constants/spacing';
import {medium, nm, sm, xs} from '../../../../constants/fonts';
import {width} from '../../../../constants/dimensions';
import {
  deleteComment,
  voteOnComment,
} from '../../../../api/community/community.api';
import {useNavigation} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import useStore from '../../../../store/store';

type Props = {
  comment: COMMENT;
};

const Comment = ({comment}: Props) => {
  const [liked, setLiked] = useState<boolean | null>(comment.voteStatus);
  const [upVoteCount, setUpVoteCount] = useState<number>(comment.upvoteCount);
  const [downVoteCount, setDownVoteCount] = useState<number>(
    comment.downvoteCount,
  );
  const vertSheet = useRef<RBSheet | null>(null);
  const {userProfile, deleteStoreComment} = useStore();
  const navigation = useNavigation();
  const voteOnCommentHandler = async (vote: boolean) => {
    try {
      const {upvoteCount, downvoteCount} = await voteOnComment(
        comment.communityId,
        comment.postId,
        vote === liked ? null : vote,
        comment._id,
      );
      setLiked(vote === liked ? null : vote);
      setUpVoteCount(upvoteCount);
      setDownVoteCount(downvoteCount);
    } catch (error) {}
  };

  const deleteCommentHandler = async () => {
    try {
      deleteStoreComment(comment._id);
      await deleteComment(comment.communityId, comment.postId, comment._id);
    } catch (error) {}
  };

  const VertSheet = () => {
    return (
      <View>
        <TouchableOpacity onPress={() => vertSheet.current?.open()}>
          <Icon name="more-vert" size={25} color={white} />
        </TouchableOpacity>
        <RBSheet
          openDuration={250}
          height={140}
          ref={vertSheet}
          customStyles={{
            container: {
              backgroundColor: black,
              padding: px4,
            },
          }}>
          <View>
            {userProfile?.phoneNo === comment.author.phoneNo && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EditComment', {
                    communityId: comment.communityId,
                    postId: comment.postId,
                    comment: comment.content,
                    commentId: comment._id,
                  })
                }
                style={styles.editCardActionView}>
                <Icon
                  style={styles.editCardActionIcon}
                  color={white}
                  size={30}
                  name="edit"
                />
                <View>
                  <Text style={styles.editCardActionHeading}>Edit</Text>
                  <Text style={styles.editCardActionPara}>
                    Tap to edit this comment
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            {(userProfile?.phoneNo === comment.author.phoneNo || true) && (
              <TouchableOpacity
                onPress={deleteCommentHandler}
                style={styles.editCardActionView}>
                <Icon
                  style={styles.editCardActionIcon}
                  color={white}
                  size={30}
                  name="delete"
                />
                <View>
                  <Text style={styles.editCardActionHeading}>Delete</Text>
                  <Text style={styles.editCardActionPara}>
                    Tap to delete this post
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </RBSheet>
      </View>
    );
  };

  return (
    <View key={comment._id} style={styles.main}>
      {comment.author.image ? (
        <Image
          style={styles.image}
          source={{
            uri: comment.author.image,
          }}
        />
      ) : (
        <View
          style={{
            backgroundColor: gray,
            padding: px2,
            borderRadius: px8,
            marginRight: px2,
          }}>
          <Icon name="person" size={30} color={grayLight} />
        </View>
      )}
      <View style={styles.commentParentView}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
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
          </View>
          <VertSheet />
        </View>

        <View style={styles.voteView}>
          <TouchableOpacity
            onPress={() => voteOnCommentHandler(true)}
            style={styles.voteButton}>
            <Icon
              name={liked === true ? 'thumb-up' : 'thumb-up-off-alt'}
              style={styles.voteIcon}
            />
            <Text style={styles.voteCount}>{upVoteCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => voteOnCommentHandler(false)}
            style={styles.voteButton}>
            <Icon
              name={liked === false ? 'thumb-down' : 'thumb-down-off-alt'}
              style={styles.voteIcon}
            />
            <Text style={styles.voteCount}>{downVoteCount}</Text>
          </TouchableOpacity>
          {!oncomment.parentId && (
            <TouchableOpacity
              onPress={() => navigation.navigate('Reply', {comment: comment})}
              style={styles.voteButton}>
              <Icon name="chat-bubble-outline" style={styles.voteIcon} />
              <Text style={styles.voteCount}>{comment.repliesCount}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: py2,
    paddingHorizontal: px4,
    // borderBottomColor: gray,
    // borderBottomWidth: 2,
  },
  image: {
    width: 0.1 * width,
    height: 0.1 * width,
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
    width: 0.7 * width,
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
  editCardAction: {
    paddingHorizontal: px4,
  },
  editCardActionView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: py1,
  },
  editCardActionIcon: {
    fontSize: 30,
    color: white,
    marginRight: px2,
  },
  editCardActionHeading: {
    color: white,
    fontSize: sm,
  },
  editCardActionPara: {
    color: grayLight,
    fontSize: xs,
  },
});

export default Comment;
