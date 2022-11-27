import {COMMUNITY} from '../community/community';
import {POST} from '../community/post';

export interface iCommunityStore {
  posts: POST[];
  community: COMMUNITY | null;
  setCommunity: (community: COMMUNITY) => void;
  setPosts: (posts: POST[]) => void;
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
}
