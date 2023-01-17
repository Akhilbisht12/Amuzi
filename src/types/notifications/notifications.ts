export enum NotificationType {
  POST_LIKE = 0,
  POST_COMMENT = 1,
  POST_APPROVAL = 2,
  COMMUNITY_APPROVAL = 3,
  COINS_REWARD = 4,
}

export interface iCommunity {
  _id: string;
  name: string;
  image: string;
}

export interface iAuthor {
  name: string;
  phoneNo: number;
  image: string;
}

export interface iComment {
  _id: string;
  parentId?: any;
  content: string;
  author: iAuthor;
}

export interface iLikeNotification {
  _id: string;
  postId: string;
  type: 0;
  createdAt: Date;
  community: iCommunity;
  image?: string;
  recentUpvote: {
    name: string;
    image: string;
  }[];
  upvoteCount: number;
}

export interface iCommentNotification {
  _id: string;
  postId: string;
  commentId: string;
  type: 1;
  createdAt: Date;
  community: iCommunity;
  image?: string;
  comment: iComment;
}

export interface iPostApprovalNotification {
  _id: string;
  postId: string;
  type: 2;
  createdAt: Date;
  community: iCommunity;
  image?: any;
}

export interface iRewardNotification {
  _id: string;
  coins: number;
  type: 4;
  createdAt: Date;
}

export interface iCommunityApproveNotification {
  _id: string;
  communityId: string;
  type: 3;
  community: iCommunity;
  createdAt: Date;
}

export type iNotification =
  | iLikeNotification
  | iCommentNotification
  | iPostApprovalNotification
  | iRewardNotification
  | iCommunityApproveNotification;

export interface iNotificationStore {
  notifications: iNotification[];
  setNotifications: (notifications: iNotification[]) => void;
}
