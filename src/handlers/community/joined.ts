import {
  getCommunityPost,
  getCommunityPosts,
} from '../../api/community/community.api';
import useCommunityStore from '../../store/communityStore';

export const getCommunityPostHandler = async (
  postId: string,
  communityId: string,
) => {
  const {setPost} = useCommunityStore.getState();
  const data = await getCommunityPost(communityId, postId);
  setPost(data);
};

export const getCommunityPostsHandler = async (
  communityId: string,
  skip: number,
) => {
  const {setPosts} = useCommunityStore.getState();
  const data = await getCommunityPosts(communityId, skip);
  setPosts(data);
};
