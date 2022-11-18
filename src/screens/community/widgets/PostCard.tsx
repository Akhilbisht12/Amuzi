import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import {px1, px2, px3, px4, py1, py2, py4} from '../../../constants/spacing';
import {black, gray, grayLight, white} from '../../../constants/colors';
import {height, width} from '../../../constants/dimensions';
import {medium, sm, xs} from '../../../constants/fonts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {deletePost, voteOnPost} from '../../../api/community/community.api';
import {useNavigation} from '@react-navigation/native';
import {POST} from '../../../types/community/post';
import RBSheet from 'react-native-raw-bottom-sheet';
import useStore from '../../../store/store';

interface Props {
  post: POST;
  isAdmin: boolean;
}

const PostCard = ({post, isAdmin}: Props) => {
  const [liked, setLiked] = useState<boolean | null>(post.voteStatus);
  const [upvoteCount, setUpVoteCount] = useState(post.upvoteCount);
  const [downVoteCount, setDownVoteCount] = useState(post.downvoteCount);
  const navigation = useNavigation();
  const editSheet = useRef<RBSheet | null>(null);
  const postVoteHandler = async (event: boolean) => {
    try {
      const response = await voteOnPost(
        event === liked ? null : event,
        post.communityId,
        post._id,
      );
      setLiked(liked === event ? null : event);
      setUpVoteCount(response.upvoteCount);
      setDownVoteCount(response.downvoteCount);
    } catch (error) {}
  };
  const {deleteStoragePost, userProfile, setPost, community} = useStore();

  const deletePostHandler = async () => {
    try {
      deleteStoragePost(post._id);
      await deletePost(post.communityId, post._id);
    } catch (error) {}
  };

  const EditCard = () => {
    const handleEditPost = () => {
      setPost(post);
      navigation.navigate('EditPost');
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
            {(userProfile?.phoneNo === post.author.phoneNo || isAdmin) && (
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
              {community.name} &#183;
              {Math.round(
                (Date.now() - new Date(post.date)) / (1000 * 60 * 60 * 24),
              )}
              D
            </Text>
          </View>
        </View>

        {isAdmin && <EditCard />}
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Post', {
            _id: post._id,
            community_id: post.communityId,
          })
        }>
        <View style={styles.contentView}>
          <Text style={styles.contentText}>{post.content}</Text>
        </View>
        {post.image !== null && (
          <Image style={styles.postImage} source={{uri: post.image}} />
        )}
      </TouchableOpacity>

      <View style={styles.engagementView}>
        <View style={styles.voteView}>
          <TouchableOpacity
            onPress={() => postVoteHandler(true)}
            style={styles.engagementAction}>
            <Icon
              style={styles.engagementIcon}
              name={liked === true ? 'thumb-up' : 'thumb-up-off-alt'}
            />
            <Text style={styles.engagementActionText}>{upvoteCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => postVoteHandler(false)}
            style={styles.engagementAction}>
            <Icon
              style={styles.engagementIcon}
              name={liked === false ? 'thumb-down' : 'thumb-down-off-alt'}
            />
            <Text style={styles.engagementActionText}>{downVoteCount}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Post', {
              _id: post._id,
              community_id: post.communityId,
            })
          }
          style={styles.engagementAction}>
          <Icon style={styles.engagementIcon} name="chat-bubble-outline" />
          <Text style={styles.engagementActionText}>{post.commentCount}</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.engagementView}>
          <Icon style={styles.engagementIcon} name="share-social-outline" />
          <Text style={styles.engagementActionText}>Share</Text>
        </TouchableOpacity> */}
      </View>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: px4,
    marginVertical: py1,
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
    color: white,
    fontSize: xs,
  },
  postImage: {
    width: width * 0.92,
    height: 0.5 * height,
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
    marginHorizontal: px3,
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
