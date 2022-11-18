import {COMMUNITY} from '../community/community';
import {POST} from '../community/post';

export interface state extends user, theme, event, authState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export interface userProfile {
  name: string;
  image: string;
  phoneNo: number;
  dob: string;
  gender: string;
  _id: string;
  onboarded: boolean;
}

export interface user {
  userState: 'loggedIn' | 'loggedOut' | 'onBoarded';
  userProfile: userProfile | undefined;
  setUser: (state: userProfile) => void;
  setUserState: (state: 'loggedIn' | 'loggedOut' | 'onBoarded') => void;
  access: string | undefined;
  setAccess: (access: string) => void;
  changeUserProfileImage: (url: string) => void;
}

export interface theme {
  theme: 'dark' | 'light';
  setTheme: (changedTheme: 'dark' | 'light') => void;
}

export interface event {
  posts: POST[];
  community: COMMUNITY;
  sportScrollYOffset: number;
  setSportScrollYOffset: (value: number) => void;
  scrollUp: boolean;
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
  setPost: (post: POST) => void;
  deleteStoreComment: (id: string) => void;
  editStoreComment: (id: string, content: string) => void;
  setCommunityImage: (url: string) => void;
  approvalPosts: POST[];
  setApprovalPosts: (posts: POST[]) => void;
  updateApprovalPosts: (id: string) => void;
}

export interface authState {
  otp: number[];
  pushOtp: (value: number) => void;
  popOtp: () => void;
  timer: number;
  setTimer: () => void;
  resetTimer: () => void;
}
