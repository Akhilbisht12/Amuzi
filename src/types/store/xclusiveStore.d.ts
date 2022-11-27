import {FEED} from '../content/playlist';

export interface iCategories {
  _id: string;
  name: string;
  parentId: null | string;
  subCategories: {
    _id: string;
    name: string;
    parentId: string;
  }[];
}
export interface iXclusivePost {
  _id: string;
  title: string;
  content: string;
  mediaId?: string;
  image?: string;
  category: string;
  subCategories: string[];
  type: 'image' | 'video';
  createdAt: string;
  deleted: boolean;
  media?: FEED;
}
export interface iXclusiveStore {
  categories: iCategories[];
  setCategories: (categories: iCategories[]) => void;
  posts: iXclusivePost[];
  setPosts: (post: iXclusivePost[]) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedSubCategories: string[];
  setSelectedSubCategories: (category: string) => void;
}
