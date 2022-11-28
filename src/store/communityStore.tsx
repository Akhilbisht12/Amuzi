import create from 'zustand';
import {iCommunityStore} from '../types/store/community';
const useCommunityStore = create<iCommunityStore>((set, get) => ({
  communityCreate: false,
  community: null,
  setCommunity: community => {
    set({community});
  },
  posts: [],
  setPosts: posts => {
    set({posts});
  },
  updatePostCounts(index, upVoteCount, downVoteCount, liked) {
    const updatedPosts = get().posts;
    updatedPosts[index].upvoteCount = upVoteCount;
    updatedPosts[index].downvoteCount = downVoteCount;
    updatedPosts[index].voteStatus = liked;
    set({posts: updatedPosts});
  },
  deleteStoragePost: (id: string) => {
    const posts = get().posts;
    const index = posts.findIndex(item => item._id === id);
    posts.splice(index, 1);
    set({posts});
  },
  postRefresh: true,
  createdRefresh: true,
  setCommunityCreate: (value: boolean) => {
    set({communityCreate: value});
  },
  setPostRefresh: () => {
    set({postRefresh: !get().postRefresh});
  },
  setCreatedRefresh: () => {
    set({createdRefresh: !get().createdRefresh});
  },
  post: null,
  setPost: post => {
    set({post});
  },
  deleteStoreComment: (id: string) => {
    const post = get().post;
    const index = post!.comments.findIndex(item => item._id === id);
    post?.comments.splice(index, 1);
    set({post});
  },
  editStoreComment: (id: string, content: string) => {
    const post = get().post;
    const index = post!.comments.findIndex(item => item._id === id);
    post!.comments[index].content = content;
    set({post});
  },
  setCommunityImage: (url: string) => {
    const community = get().community;
    community!.image = url;
    set({community});
  },
  approvalPosts: [],
  setApprovalPosts: posts => {
    set({approvalPosts: posts});
  },
  updateApprovalPosts: id => {
    const posts = get().approvalPosts;
    const index = posts!.findIndex(item => item._id === id);
    posts.splice(index, 1);
    set({approvalPosts: posts});
  },
  updateCommentVote: (index, upVote, downVote, voteStatus) => {
    const currentPost = get().post;
    currentPost!.comments[index].upvoteCount = upVote;
    currentPost!.comments[index].downvoteCount = downVote;
    currentPost!.comments[index].voteStatus = voteStatus;
    set({post: currentPost});
  },
}));

export default useCommunityStore;
