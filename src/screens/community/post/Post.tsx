import {ScrollView, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommunityStack} from '../../../containers/routes/authenticated/community/Community';
import {getCommunityPost} from '../../../api/community/community.api';
import styles from './styles';
import BackTitleHeader from '../../../components/Headers/BackTitleHeader';
import PostCard from '../widgets/PostCard';
import {POST} from '../../../types/community/post';
import Comments from './widgets/Comments';
import PostComment from './widgets/PostComment';
import useStore from '../../../store/store';
import ViewWrapper from '../../../components/wrappers/ViewWrapper';

type Props = NativeStackScreenProps<CommunityStack, 'Post'>;

const Post = ({route}: Props) => {
  const {post, setPost} = useStore();
  const {postRefresh} = useStore();
  const getCommunityPostHandler = async () => {
    try {
      const post_response = await getCommunityPost(
        route.params.community_id,
        route.params._id,
      );
      setPost(post_response);
    } catch (error) {}
  };
  useEffect(() => {
    getCommunityPostHandler();
  }, [route.params._id, route.params.community_id, postRefresh]);

  return (
    <View style={styles.main}>
      <BackTitleHeader title="Community" />
      <ViewWrapper refreshAction={() => getCommunityPostHandler()}>
        {post && <PostCard post={post} />}
        {post && (
          <PostComment
            {...{
              communityId: post.communityId,
              postId: post._id,
              author: post.author,
            }}
          />
        )}
        {post && <Comments comments={post.comments} />}
      </ViewWrapper>
    </View>
  );
};

export default Post;
