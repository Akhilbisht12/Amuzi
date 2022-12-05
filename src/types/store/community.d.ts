import {COMMUNITY} from '../community/community';
import {POST} from '../community/post';

export interface iCommunityStore {
  posts: POST[];
  community: COMMUNITY | null;
  setCommunity: (community: COMMUNITY) => void;
  setPosts: (posts: POST[]) => void;
  updatePostCounts: (
    index: number,
    upVoteCount: number,
    downVoteCount: number,
    liked: null | boolean,
  ) => void;
  deleteStoragePost: (id: string) => void;
  postRefresh: boolean;
  communityCreate: boolean;
  createdRefresh: boolean;
  setCommunityCreate: (value: boolean) => void;
  setPostRefresh: () => void;
  setCreatedRefresh: () => void;
  post: POST | null;
  setPost: (post: POST | null) => void;
  deleteStoreComment: (id: string) => void;
  editStoreComment: (id: string, content: string) => void;
  setCommunityImage: (url: string) => void;
  approvalPosts: POST[];
  setApprovalPosts: (posts: POST[]) => void;
  updateApprovalPosts: (id: string) => void;
  updateCommentVote: (
    index: number,
    upVote: number,
    downVote: number,
    voteStatus: boolean | null,
  ) => void;
  discoverCommunities: COMMUNITY[];
  setDiscoverCommunities: (communities: COMMUNITY[]) => void;
  removeDiscoverCommunity: (id: string) => void;
}
