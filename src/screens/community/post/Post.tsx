import {FlatList, View} from 'react-native';
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
    await postCommentPageChange(community!._id, post._id, 10, page);
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
            <PostComment />
          </>
        }
        onPageChange={handleCommentPageChange}
        refreshAction={getInitialComments}
        data={post.comments}
        renderItem={({item, index}) => (
          <Comment
            comment={item}
            postIndex={route.params.index}
            index={index}
          />
        )}
      />
      <ViewWrapper
        refreshAction={() =>
          getCommunityPostHandler(route.params._id, route.params.community_id)
        }>
        {/* {post && (
          <PostCard navigate={false} index={route.params.index} post={post} />
        )} */}
        {/* <FlatList
          renderItem={({item, index}) => (
            <Comment
              comment={item}
              postIndex={route.params.index}
              index={index}
            />
          )}
          data={post?.comments}
        /> */}
        {/* <Comments /> */}
      </ViewWrapper>
    </View>
  );
};

export default Post;
