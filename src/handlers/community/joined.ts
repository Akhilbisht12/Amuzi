import {
  getCommunityPost,
  getCommunityPosts,
} from '../../api/community/community.api';
import http, {server} from '../../api/http';
import useCommunityStore from '../../store/communityStore';

export const getCommunityPostHandler = async (
  postId: string,
  communityId: string,
) => {
  const {setPost, posts, setPosts} = useCommunityStore.getState();

  const data = await getCommunityPost(communityId, postId);
  setPosts(
    posts.map(item => {
      if (item._id === postId) {
        item = data;
      }
      return item;
    }),
  );
  setPost(data);
};

export const getPostComments = async (
  communityId: string,
  postId: string,
  pageLength: number,
  page: number,
) => {
  const {data} = await http.get(
    `${server}/${communityId}/${postId}/comments?pageLength=${pageLength}&page=${page}`,
  );
  return data;
};

export const getPostCommentHandler = async (
  postId: string,
  communityId: string,
  pageLength: number,
  page: number,
) => {
  const {posts, setPosts} = useCommunityStore.getState();
  const data = await getPostComments(communityId, postId, pageLength, page);
  setPosts(
    posts.map(item => {
      if (item._id === postId) {
        item.comments = data;
      }
      return item;
    }),
  );
};

export const postCommentPageChange = async (
  communityId: string,
  postId: string,
  pageLength: number,
  page: number,
): Promise<number> => {
  const {posts, setPosts} = useCommunityStore.getState();
  const data = await getPostComments(communityId, postId, pageLength, page);
  setPosts(
    posts.map(item => {
      if (item._id === postId) {
        item.comments = [...item.comments, ...data];
      }
      return item;
    }),
  );
  return data.length;
};

export const getCommentReplies = async (
  communityId: string,
  postId: string,
  commentId: string,
  pageLength: number,
  page: number,
) => {
  const {data} = await http.get(
    `${server}/${communityId}/${postId}/${commentId}/comments?pageLength=${pageLength}&page=${page}`,
  );
  return data;
};

export const getCommentRepliesHandler = async (
  communityId: string,
  postId: string,
  commentId: string,
  pageLength: number,
  page: number,
) => {
  const {setPosts, posts} = useCommunityStore.getState();
  const data = await getCommentReplies(
    communityId,
    postId,
    commentId,
    pageLength,
    page,
  );
  setPosts(
    posts.map(item => {
      if (item._id === postId) {
        item.comments.map(comment => {
          if (comment._id === commentId) {
            comment.replies = data;
          }
        });
      }
      return item;
    }),
  );
};

export const replyChangePageHandler = async (
  communityId: string,
  postId: string,
  commentId: string,
  page: number,
  pageLength: number,
): Promise<number> => {
  const {setPosts, posts} = useCommunityStore.getState();
  const data = await getCommentReplies(
    communityId,
    postId,
    commentId,
    pageLength,
    page,
  );
  setPosts(
    posts.map(item => {
      if (item._id === postId) {
        item.comments.map(comment => {
          if (comment._id === commentId) {
            comment.replies = comment.replies
              ? [...comment.replies, ...data]
              : data;
          }
          return comment;
        });
      }
      return item;
    }),
  );
  return data.length;
};

export const getCommunityPostsHandler = async (
  communityId: string,
  pageLength: number,
  page: number,
) => {
  const {setPosts} = useCommunityStore.getState();
  const data = await getCommunityPosts(communityId, pageLength, page);
  setPosts(data);
};
