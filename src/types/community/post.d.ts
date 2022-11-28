export interface POST {
  _id: string;
  communityId: string;
  image: string;
  content: string;
  author: {
    name: string;
    image: string;
    phoneNo: number;
  };
  date: string;
  upvoteCount: number;
  downvoteCount: number;
  commentCount: number;
  approved: true;
  createdAt: Date;
  voteStatus: boolean | null;
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
    phoneNo: number;
  };
  upvoteCount: number;
  voteStatus: boolean | null;
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
    phoneNo: number;
  };
  upvoteCount: number;
  downvoteCount: number;
  createdAt: string;
  voteStatus: boolean | null;
}
