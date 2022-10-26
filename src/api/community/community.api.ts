import {DocumentPickerResponse} from 'react-native-document-picker';
import http, {server} from '../http';

export const createCommunity = async (community: any) => {
  const {data} = await http.post(`${server}/community/request`, community, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
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

export const getJoinedCommunities = async () => {
  const {data} = await http.get(`${server}/joined-communities`);
  return data;
};

export const getCommunityPosts = async (community: string, skip: number) => {
  const {data} = await http.get(`${server}/posts/${community}?skip=${skip}`);
  return data;
};

export const createPost = async (
  content: string,
  communityId: string,
  image?: DocumentPickerResponse,
) => {
  const postData = new FormData();
  postData.append('content', content);
  postData.append('image', {
    uri: image?.fileCopyUri,
    name: image?.name,
    type: image?.type,
  });
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
) => {
  console.log('reacher here');
  const {data} = await http.post(`${server}/community/post/comment/vote`, {
    communityId,
    postId,
    vote,
    commentId,
  });
  console.log(data);
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
