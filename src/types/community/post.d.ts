export interface POST {
  _id: string;
  communityId: string;
  image: string;
  content: string;
  author: {
    name: string;
    image: string;
  };
  date: string;
  upvoteCount: number;
  downvoteCount: number;
  commentCount: number;
  approved: true;
  createdAt: Date;
  voteStatus: true;
  comments: COMMENTS[];
}

export interface COMMENT {
  _id: string;
  postId: string;
  communityId: string;
  parentId: null;
  content: string;
  author: {
    name: string;
    image: string;
  };
  upvoteCount: number;
  downvoteCount: number;
  repliesCount: number;
  createdAt: Date;
  replies: REPLY[];
}

export interface REPLY {
  _id: string;
  postId: string;
  communityId: string;
  parentId: string;
  content: string;
  author: {
    name: string;
    image: string;
  };
  upvoteCount: number;
  downvoteCount: number;
  createdAt: string;
}
