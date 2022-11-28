import {View} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommunityStack} from '../../../containers/routes/authenticated/community/CommunityRoutes';
import {getCommunityPost} from '../../../api/community/community.api';
import styles from './styles';
import BackTitleHeader from '../../../components/Headers/BackTitleHeader';
import PostCard from '../widgets/PostCard';
import Comments from './widgets/Comments';
import PostComment from './widgets/PostComment';
import ViewWrapper from '../../../components/wrappers/ViewWrapper';
import useCommunityStore from '../../../store/communityStore';

type Props = NativeStackScreenProps<CommunityStack, 'Post'>;

const Post = ({route}: Props) => {
  const {postRefresh, post, setPost, posts} = useCommunityStore();
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
        {post && (
          <PostCard
            navigate={false}
            index={route.params.index}
            post={posts[route.params.index]}
          />
        )}
        {post && (
          <PostComment
            {...{
              communityId: post.communityId,
              postId: post._id,
              author: post.author,
            }}
          />
        )}
        {post && <Comments />}
      </ViewWrapper>
    </View>
  );
};

export default Post;
