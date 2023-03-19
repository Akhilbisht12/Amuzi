import {View} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommunityStack} from '../../../containers/routes/authenticated/community/CommunityRoutes';
import styles from './styles';
import BackTitleHeader from '../../../components/Headers/BackTitleHeader';
import PostCard from '../widgets/PostCard';
// import Comments from './widgets/Comments';
import PostComment from './widgets/PostComment';
import ViewWrapper from '../../../components/wrappers/ViewWrapper';
import useCommunityStore from '../../../store/communityStore';
import {
  getCommunityPostHandler,
  getPostCommentHandler,
  postCommentPageChange,
} from '../../../handlers/community/joined';
import Comment from './widgets/Comment';
import PaginatedList from '../../../components/paginatedList/PaginatedList';
import {COMMENT} from '../../../types/community/post';

type Props = NativeStackScreenProps<CommunityStack, 'Post'>;

const Post = ({route}: Props) => {
  const {posts, community} = useCommunityStore();
  const post = posts[route.params.index];
  // useEffect(() => {
  //   (async function () {
  //     await getCommunityPostHandler(
  //       route.params._id,
  //       route.params.community_id,
  //     );
  //   })();
  // }, [route.params]);

  const handleCommentPageChange = async (page: number) => {
    return await postCommentPageChange(post.communityId, post._id, 10, page);
  };

  const getInitialComments = async () => {
    await getPostCommentHandler(post._id, community!._id, 10, 1);
  };

  useEffect(() => {
    getInitialComments();
  }, []);

  return (
    <View style={styles.main}>
      <BackTitleHeader title={community!.name} />
      <PaginatedList
        Header={
          <>
            <PostCard navigate={false} index={route.params.index} post={post} />
            <PostComment community={post.communityId} post={post._id} />
          </>
        }
        onPageChange={handleCommentPageChange}
        refreshAction={getInitialComments}
        data={post.comments}
        renderItem={({item, index}: {item: COMMENT; index: number}) => (
          <Comment
            comment={item}
            postIndex={route.params.index}
            index={index}
          />
        )}
      />
    </View>
  );
};

export default Post;
