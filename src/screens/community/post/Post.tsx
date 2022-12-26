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
import {getCommunityPostHandler} from '../../../handlers/community/joined';
import Comment from './widgets/Comment';

type Props = NativeStackScreenProps<CommunityStack, 'Post'>;

const Post = ({route}: Props) => {
  const {posts, post, community} = useCommunityStore();

  useEffect(() => {
    (async function () {
      await getCommunityPostHandler(
        route.params._id,
        route.params.community_id,
      );
    })();
  }, [route.params]);

  return (
    <View style={styles.main}>
      <BackTitleHeader title={community?.name} />
      <ViewWrapper
        refreshAction={() =>
          getCommunityPostHandler(route.params._id, route.params.community_id)
        }>
        {post && (
          <PostCard navigate={false} index={route.params.index} post={post} />
        )}
        <PostComment />
        <FlatList
          renderItem={({item, index}) => (
            <Comment
              comment={item}
              postIndex={route.params.index}
              index={index}
            />
          )}
          data={post?.comments}
        />
        {/* <Comments /> */}
      </ViewWrapper>
    </View>
  );
};

export default Post;
