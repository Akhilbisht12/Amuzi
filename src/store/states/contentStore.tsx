import create from 'zustand';
import {iContentStore} from '../../types/store/content';

const useContentStore = create<iContentStore>((set, get) => ({
  searchResults: [],
  setSearchResults: results => {
    set({searchResults: results});
  },
}));

export default useContentStore;
