import {View, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommunityStack} from '../../../../containers/routes/authenticated/community/CommunityRoutes';
import {black} from '../../../../constants/colors';
import BackTitleHeader from '../../../../components/Headers/BackTitleHeader';
import Comment from './Comment';
import {px4, py1} from '../../../../constants/spacing';
import PostComment from './PostComment';
import useCommunityStore from '../../../../store/communityStore';
import {
  getCommentRepliesHandler,
  replyChangePageHandler,
} from '../../../../handlers/community/joined';
import PaginatedList from '../../../../components/paginatedList/PaginatedList';
import {COMMENT} from '../../../../types/community/post';

type Props = NativeStackScreenProps<CommunityStack, 'Reply'>;

const Replies = ({route}: Props) => {
  const {parentIndex, postIndex} = route.params;
  const {posts} = useCommunityStore();
  const post = posts[route.params.postIndex];
  const comment = post.comments[parentIndex];
  const replies = comment.replies ? comment.replies : [];
  const getInitialReplies = async () => {
    await getCommentRepliesHandler(
      post.communityId,
      post._id,
      comment._id,
      10,
      1,
    );
  };

  useEffect(() => {
    getInitialReplies();
  }, []);
  return (
    <View style={styles.main}>
      <BackTitleHeader title="Replies" />
      <Comment postIndex={postIndex} comment={comment} index={parentIndex} />
      <View style={styles.repliesBox}>
        <PaginatedList
          Header={
            <>
              <PostComment
                {...{
                  community: comment.communityId,
                  parentId: comment._id,
                  post: comment.postId,
                }}
              />
            </>
          }
          data={replies}
          renderItem={({item, index}: {item: COMMENT; index: number}) => (
            <Comment
              postIndex={postIndex}
              comment={item}
              index={index}
              parentIndex={parentIndex}
            />
          )}
          onPageChange={async (page: number) => {
            return await replyChangePageHandler(
              post.communityId,
              post._id,
              comment._id,
              page,
              10,
            );
          }}
          refreshAction={() => getInitialReplies()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
  },
  repliesBox: {
    paddingLeft: px4,
    marginVertical: py1,
  },
});

export default Replies;
