import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React, {useRef} from 'react';
import {COMMENT} from '../../../../types/community/post';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  black,
  blackLight,
  gray,
  grayLight,
  white,
} from '../../../../constants/colors';
import {
  px1,
  px2,
  px3,
  px4,
  px8,
  py1,
  py2,
  pyh,
} from '../../../../constants/spacing';
import {medium, nm, sm, xs, xs2} from '../../../../constants/fonts';
import {width} from '../../../../constants/dimensions';
import {
  deleteComment,
  voteOnComment,
} from '../../../../api/community/community.api';
import {useNavigation} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import useStore from '../../../../store/store';
import useCommunityStore from '../../../../store/communityStore';
import Dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

type Props = {
  comment: COMMENT;
  index: number;
  parentIndex?: number;
  postIndex: number;
};

const Comment = ({comment, index, parentIndex, postIndex}: Props) => {
  const vertSheet = useRef<RBSheet | null>(null);
  const {
    deleteStoreComment,
    updateCommentVote,
    updateReplyVote,
    deleteStoreReply,
    community,
  } = useCommunityStore();
  const {userProfile} = useStore();
  const navigation = useNavigation();
  const voteOnCommentHandler = async (vote: boolean | null) => {
    try {
      const {upvoteCount, downvoteCount} = await voteOnComment(
        comment.communityId,
        comment.postId,
        vote === comment.voteStatus ? null : vote,
        comment._id,
      );
      parentIndex === undefined &&
        updateCommentVote(
          index,
          upvoteCount,
          downvoteCount,
          vote === comment.voteStatus ? null : vote,
        );
      parentIndex !== undefined &&
        updateReplyVote(
          parentIndex,
          upvoteCount,
          downvoteCount,
          vote === comment.voteStatus ? null : vote,
          index,
        );
    } catch (error) {}
  };

  const deleteCommentHandler = async () => {
    try {
      await deleteComment(comment.communityId, comment.postId, comment._id);
      parentIndex === undefined && deleteStoreComment(comment._id);
      parentIndex !== undefined && deleteStoreReply(index, parentIndex);
    } catch (error) {}
  };
  Dayjs.extend(relativeTime);
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
                    postIndex,
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
            {(userProfile?.phoneNo === comment.author.phoneNo ||
              userProfile?.phoneNo === community?.admin) && (
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
            marginRight: px3,
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
                {Dayjs(comment.createdAt).fromNow()}
              </Text>
            </View>
            <View style={styles.commentView}>
              <Text style={styles.comment}>{comment.content}</Text>
            </View>
          </View>
          {(userProfile?.phoneNo === comment.author.phoneNo ||
            userProfile?.phoneNo === community?.admin) && <VertSheet />}
        </View>

        <View style={styles.voteView}>
          <TouchableOpacity
            onPress={() => voteOnCommentHandler(true)}
            style={styles.voteButton}>
            <Icon
              name={
                comment.voteStatus === true ? 'thumb-up' : 'thumb-up-off-alt'
              }
              style={styles.voteIcon}
            />
            <Text style={styles.voteCount}>{comment.upvoteCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => voteOnCommentHandler(false)}
            style={styles.voteButton}>
            <Icon
              name={
                comment.voteStatus === false
                  ? 'thumb-down'
                  : 'thumb-down-off-alt'
              }
              style={styles.voteIcon}
            />
            <Text style={styles.voteCount}>{comment.downvoteCount}</Text>
          </TouchableOpacity>
          {!comment.parentId && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Reply', {
                  parentIndex: index,
                  postIndex,
                })
              }
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
    paddingHorizontal: px2,
    backgroundColor: blackLight,
    marginVertical: 2,
    marginHorizontal: px3,
    borderRadius: px2,
    elevation: 4,
  },
  image: {
    width: 0.1 * width,
    height: 0.1 * width,
    borderRadius: 0.15 * width,
    marginRight: px3,
  },
  commentParentView: {},
  commentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorName: {
    color: white,
    fontSize: xs,
  },
  commentTime: {
    color: grayLight,
    fontSize: xs2,
    textTransform: 'capitalize',
  },
  commentView: {
    width: 0.7 * width,
    marginTop: pyh,
  },
  comment: {
    color: white,
    fontSize: sm,
  },
  voteView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: pyh,
  },
  voteButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteIcon: {
    color: white,
    fontSize: 21,
    marginRight: px1,
  },
  voteCount: {
    color: white,
    fontSize: nm,
    fontFamily: medium,
    marginRight: px4,
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
