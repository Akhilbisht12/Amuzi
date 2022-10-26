import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {px1, px2, px4, py1, py2, py4} from '../../../constants/spacing';
import {gray, white} from '../../../constants/colors';
import {height, width} from '../../../constants/dimensions';
import {medium, sm, xs} from '../../../constants/fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import {voteOnPost} from '../../../api/community/community.api';
import {useNavigation} from '@react-navigation/native';
import {POST} from '../../../types/community/post';

interface POST_E extends POST {
  name: string;
}
interface Props {
  post: POST_E;
}

const PostCard = ({post}: Props) => {
  const [liked, setLiked] = useState<boolean | null>(post.voteStatus);
  const [upvoteCount, setUpVoteCount] = useState(post.upvoteCount);
  const navigation = useNavigation();
  const postVoteHandler = async () => {
    try {
      const response = await voteOnPost(
        liked === null ? true : null,
        post.communityId,
        post._id,
      );
      setLiked(liked === null ? true : null);
      setUpVoteCount(response.upvoteCount);
    } catch (error) {}
  };

  return (
    <View style={styles.main}>
      <View style={styles.postHeader}>
        <View style={styles.postHeader}>
          <Image style={styles.headerImage} source={{uri: post.author.image}} />
          <View>
            <Text style={styles.headerCommunityName}>{post.author.name}</Text>
            <Text style={styles.headerPostDetails}>
              {post.name} &#183;
              {Math.round(
                (Date.now() - new Date(post.date)) / (1000 * 60 * 60 * 24),
              )}
              D
            </Text>
          </View>
        </View>

        <View>
          <Text>edit</Text>
        </View>
      </View>
      <View style={styles.contentView}>
        <Text style={styles.contentText}>{post.content}</Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Post', {
            _id: post._id,
            community_id: post.communityId,
          })
        }>
        <Image style={styles.postImage} source={{uri: post.image}} />
      </TouchableOpacity>

      <View style={styles.engagementView}>
        <TouchableOpacity
          onPress={postVoteHandler}
          style={styles.engagementAction}>
          <Icon
            style={styles.engagementIcon}
            name={liked ? 'heart' : 'heart-outline'}
          />
          <Text style={styles.engagementActionText}>{upvoteCount} Likes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.engagementAction}>
          <Icon style={styles.engagementIcon} name="chatbubble-outline" />
          <Text style={styles.engagementActionText}>
            {post.commentCount} Comment
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.engagementView}>
          <Icon style={styles.engagementIcon} name="share-social-outline" />
          <Text style={styles.engagementActionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: px4,
    marginVertical: py2,
    borderBottomWidth: 2,
    borderBottomColor: gray,
    paddingBottom: py4,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerImage: {
    width: 0.15 * width,
    height: 0.15 * width,
    marginRight: px2,
    borderRadius: 0.15 * width,
    resizeMode: 'contain',
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
    resizeMode: 'contain',
  },
  engagementView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
});

export default PostCard;
