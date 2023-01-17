import http, {server} from '../http';

export const createCommunity = async (community: any) => {
  const {data} = await http.post(`${server}/community/request`, community, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
  return data;
};

export const switchApprovalRequired = async (
  communityId: string,
  approvalRequired: boolean,
) => {
  const {data} = await http.post(
    `${server}/community/switch-approval-requirement`,
    {
      communityId,
      approvalRequired,
    },
  );
  return data;
};

export const getPostsForApproval = async (communityId: string) => {
  const {data} = await http.get(`${server}/${communityId}/approval-posts`);
  return data;
};

export const castApprovalStatus = async (
  communityId: string,
  postId: string,
  action: boolean,
) => {
  const {data} = await http.post(
    `${server}/community/post/approval-permission`,
    {
      communityId,
      postId,
      action,
    },
  );
  return data;
};

export const getCreatedCommunities = async () => {
  const {data} = await http.get(`${server}/community/request`);
  return data;
};

export const discoverCommunities = async () => {
  const {data} = await http.get(`${server}/discover-communities`);
  return data;
};

export const joinCommunity = async (community: string) => {
  const {data} = await http.post(`${server}/join-community/${community}`);
  return data;
};

export const getJoinedCommunities = async (
  pageLength: number,
  page: number,
) => {
  const {data} = await http.get(
    `${server}/joined-communities?pageLength=${pageLength}&page=${page}`,
  );
  return data;
};

export const getCommunityPosts = async (community: string, skip: number) => {
  const {data} = await http.get(`${server}/posts/${community}?skip=${skip}`);
  return data;
};

export const updateCommunityImage = async (
  community: string,
  imageData: any,
) => {
  const {data} = await http.put(
    `${server}/community/${community}/image`,
    imageData,
    {
      headers: {'Content-Type': 'multipart/form-data'},
    },
  );
  return data;
};

export const createPost = async (communityId: string, postData: any) => {
  const {data} = await http.post(
    `${server}/community/${communityId}/create-post`,
    postData,
    {
      headers: {'Content-Type': 'multipart/form-data'},
    },
  );
  return data;
};

export const voteOnPost = async (
  vote: boolean | null,
  communityId: string,
  postId: string,
): Promise<{upvoteCount: number; downvoteCount: number}> => {
  const {data}: {data: {upvoteCount: number; downvoteCount: number}} =
    await http.post(`${server}/community/post/vote`, {
      communityId,
      postId,
      vote,
    });
  return data;
};

export const getCommunityPost = async (community: string, post: string) => {
  const {data} = await http.get(`${server}/posts/${community}/${post}`);
  return data;
};

export const voteOnComment = async (
  communityId: string,
  postId: string,
  vote: boolean | null,
  commentId: string,
): Promise<{upvoteCount: number; downvoteCount: number}> => {
  const {data}: {data: {upvoteCount: number; downvoteCount: number}} =
    await http.post(`${server}/community/post/comment/vote`, {
      communityId,
      postId,
      vote,
      commentId,
    });
  return data;
};

export const commentOnPost = async (
  communityId: string,
  postId: string,
  content: string,
  parentId?: string,
) => {
  const {data} = await http.post(`${server}/community/post/comment`, {
    postId,
    communityId,
    content,
    parentId,
  });
  return data;
};

export const updatePostContent = async (
  communityId: string,
  postId: string,
  content: string,
) => {
  const {data} = await http.put(`${server}/community/post/update-content`, {
    postId,
    communityId,
    content,
  });
  return data;
};

export const updateCommunityDescription = async (
  communityId: string,
  description: string,
) => {
  const {data} = await http.put(`${server}/community/description`, {
    communityId,
    description,
  });
  return data;
};

export const deletePost = async (communityId: string, postId: string) => {
  const {data} = await http.delete(
    `${server}/delete-post/${communityId}/${postId}`,
  );
  return data;
};

export const deleteComment = async (
  communityId: string,
  postId: string,
  commentId: string,
) => {
  const {data} = await http.delete(
    `${server}/delete-comment/${communityId}/${postId}/${commentId}`,
  );
  return data;
};

export const updateComment = async (
  commentId: string,
  postId: string,
  communityId: string,
  content: string,
) => {
  const {data} = await http.put(`${server}/community/post/comment`, {
    commentId,
    postId,
    communityId,
    content,
  });
  return data;
};
