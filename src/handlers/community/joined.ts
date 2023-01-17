import {
  getCommunityPost,
  getCommunityPosts,
} from '../../api/community/community.api';
import http from '../../api/http';
import {server} from '../../constants/secrets';
import useCommunityStore from '../../store/communityStore';

export const getCommunityPostHandler = async (
  postId: string,
  communityId: string,
) => {
  const {setPost} = useCommunityStore.getState();
  const data = await getCommunityPost(communityId, postId);
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
) => {
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
