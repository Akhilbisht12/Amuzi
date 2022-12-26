import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useRef} from 'react';
import {px1, px2, px3, px4, py1, pyh} from '../../../constants/spacing';
import {
  black,
  blackLight,
  gray,
  grayLight,
  white,
} from '../../../constants/colors';
import {width} from '../../../constants/dimensions';
import {medium, sm, xs} from '../../../constants/fonts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {deletePost, voteOnPost} from '../../../api/community/community.api';
import {useNavigation} from '@react-navigation/native';
import {POST} from '../../../types/community/post';
import RBSheet from 'react-native-raw-bottom-sheet';
import Dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import useCommunityStore from '../../../store/communityStore';
import useStore from '../../../store/store';

interface Props {
  post: POST;
  index: number;
  navigate: boolean;
}

const PostCard = ({index, navigate, post}: Props) => {
  const {deleteStoragePost, setPost, community, updatePostCounts} =
    useCommunityStore();

  const navigation = useNavigation();
  const editSheet = useRef<RBSheet | null>(null);

  const {userProfile} = useStore();
  Dayjs.extend(relativeTime);
  const postVoteHandler = async (event: boolean) => {
    try {
      const response = await voteOnPost(
        event === post.voteStatus ? null : event,
        post.communityId,
        post._id,
      );
      updatePostCounts(
        index,
        response.upvoteCount,
        response.downvoteCount,
        post.voteStatus === event ? null : event,
      );
    } catch (error) {}
  };

  const deletePostHandler = async () => {
    try {
      deleteStoragePost(post._id);
      await deletePost(post.communityId, post._id);
      navigation.replace('CommunityPage');
    } catch (error) {}
  };

  const EditCard = () => {
    const handleEditPost = () => {
      setPost(post);
      navigation.navigate('EditPost', {postIndex: index});
    };
    return (
      <View>
        <TouchableOpacity onPress={() => editSheet.current?.open()}>
          <Icon name="more-vert" size={25} color={white} />
        </TouchableOpacity>
        <RBSheet
          openDuration={250}
          height={140}
          ref={editSheet}
          customStyles={{
            container: {
              backgroundColor: black,
              padding: px4,
            },
          }}>
          <View>
            {userProfile?.phoneNo === post.author.phoneNo && (
              <TouchableOpacity
                onPress={handleEditPost}
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
                    Tap to edit this post
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            {(userProfile?.phoneNo === post.author.phoneNo ||
              community?.admin === userProfile?.phoneNo) && (
              <TouchableOpacity
                onPress={deletePostHandler}
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

  const handleNavigation = async () => {
    setPost(null);
    navigation.navigate('Post', {
      _id: post._id,
      community_id: post.communityId,
      index,
    });
  };

  return (
    <View style={styles.main}>
      <View style={styles.postHeader}>
        <View style={styles.postHeader}>
          {post.author.image ? (
            <Image
              style={styles.headerImage}
              source={{uri: post.author.image}}
            />
          ) : (
            <View style={styles.headerImage}>
              <Icon name="person" color={grayLight} size={40} />
            </View>
          )}

          <View>
            <Text style={styles.headerCommunityName}>{post.author.name}</Text>
            <Text style={styles.headerPostDetails}>
              {Dayjs(post.createdAt).fromNow()}
            </Text>
          </View>
        </View>

        {(userProfile?.phoneNo === post.author.phoneNo ||
          userProfile?.phoneNo === community?.admin) && <EditCard />}
      </View>
      <Pressable onPress={() => navigate && handleNavigation()}>
        <View style={styles.contentView}>
          <Text style={styles.contentText}>{post.content}</Text>
        </View>
        {post.image !== null && (
          <Image style={styles.postImage} source={{uri: post.image}} />
        )}
      </Pressable>

      <View style={styles.engagementView}>
        <View style={styles.voteView}>
          <TouchableOpacity
            onPress={() => postVoteHandler(true)}
            style={[styles.engagementAction, {marginRight: px4}]}>
            <Icon
              style={styles.engagementIcon}
              name={post.voteStatus === true ? 'thumb-up' : 'thumb-up-off-alt'}
            />
            <Text style={styles.engagementActionText}>{post.upvoteCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => postVoteHandler(false)}
            style={styles.engagementAction}>
            <Icon
              style={styles.engagementIcon}
              name={
                post.voteStatus === false ? 'thumb-down' : 'thumb-down-off-alt'
              }
            />
            <Text style={styles.engagementActionText}>
              {post.downvoteCount}
            </Text>
          </TouchableOpacity>
        </View>

        {navigate && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Post', {
                _id: post._id,
                community_id: post.communityId,
                index,
              })
            }
            style={styles.engagementAction}>
            <Icon style={styles.engagementIcon} name="chat-bubble-outline" />
            <Text style={styles.engagementActionText}>{post.commentCount}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: px3,
    marginVertical: pyh,
    borderRadius: px2,
    backgroundColor: blackLight,
    marginHorizontal: px3,
    elevation: 5,
  },
  divider: {
    borderBottomWidth: 0.2,
    borderBottomColor: gray,
    marginTop: py1,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerImage: {
    width: 0.12 * width,
    height: 0.12 * width,
    marginRight: px2,
    borderRadius: 0.15 * width,
    resizeMode: 'contain',
    backgroundColor: gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCommunityName: {
    color: white,
    fontSize: sm,
    fontFamily: medium,
  },
  headerPostDetails: {
    color: grayLight,
    textTransform: 'capitalize',
    fontSize: xs,
  },
  postImage: {
    height: width * 0.92,
    marginVertical: py1,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  engagementView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: py1,
  },
  voteView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  engagementAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  engagementActionText: {
    color: white,
    fontSize: sm,
    fontFamily: medium,
  },
  engagementIcon: {
    fontSize: 25,
    color: white,
    marginRight: px1,
  },
  contentView: {
    marginVertical: py1,
  },
  contentText: {
    color: white,
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

export default PostCard;
