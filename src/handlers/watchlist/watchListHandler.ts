import {getMedia} from '../../api/playlist/playlist';
import {
  addToWatchList,
  getWatchList,
  removeFromWatchList,
} from '../../api/watchlist/watchlist.api';
import useWatchListStore from '../../store/states/watchlistStore';
import {FEED} from '../../types/content/playlist';

export const GetWatchListHandler = async () => {
  const watchlist = await getWatchList();
  const {setWatchlist} = useWatchListStore.getState();
  setWatchlist(watchlist);
};

export const GetWatchListMediaHandler = async () => {
  const {watchlist, setWatchListMedia} = useWatchListStore.getState();
  const watchListMedia = await Promise.all(
    watchlist.map(item => getMedia(item)),
  );
  const data = watchListMedia.map((item: FEED) => item.playlist[0]);
  setWatchListMedia(data);
};

export const EditWatchListHandler = async (mediaId: string) => {
  const {editWatchlist} = useWatchListStore.getState();
  const editRes = editWatchlist(mediaId);
  console.log('reached here');
  if (editRes) {
    await addToWatchList(mediaId);
  } else {
    await removeFromWatchList(mediaId);
  }
};
