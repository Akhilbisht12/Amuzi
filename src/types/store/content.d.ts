import {PLAYLIST_MEDIA} from '../content/playlist';

export interface iContentStore {
  searchResults: PLAYLIST_MEDIA[];
  setSearchResults: (results: PLAYLIST_MEDIA[]) => void;
}
