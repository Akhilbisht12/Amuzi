import create from 'zustand';
import {iXclusiveStore} from '../types/store/xclusiveStore';
const useXclusiveStore = create<iXclusiveStore>((set, get) => ({
  categories: [],
  setCategories: categories => {
    set({categories});
  },
  posts: [],
  setPosts: posts => {
    set({posts});
  },
  selectedCategory: 'ALL',
  setSelectedCategory: category => {
    set({selectedCategory: category, selectedSubCategories: []});
  },
  selectedSubCategories: [],
  setSelectedSubCategories: category => {
    const selectedSet = new Set(get().selectedSubCategories);
    if (selectedSet.has(category)) {
      selectedSet.delete(category);
    } else {
      selectedSet.add(category);
    }
    set({
      selectedSubCategories: Array.from(selectedSet),
    });
  },
}));

export default useXclusiveStore;
