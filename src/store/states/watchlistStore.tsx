import create from 'zustand';
import {iWatchlistStore} from '../../types/store/store';
const useWatchListStore = create<iWatchlistStore>((set, get) => ({
  watchlist: [],
  setWatchlist: media => {
    set({
      watchlist: media,
    });
  },
  editWatchlist: mediaId => {
    const watchlistSet = new Set(get().watchlist);
    const check = watchlistSet.has(mediaId);
    if (check) {
      watchlistSet.delete(mediaId);
    } else {
      watchlistSet.add(mediaId);
    }
    set({watchlist: Array.from(watchlistSet)});
    return !check;
  },
  watchListMedia: [],
  setWatchListMedia: media => {
    set({watchListMedia: media});
  },
}));

export default useWatchListStore;
