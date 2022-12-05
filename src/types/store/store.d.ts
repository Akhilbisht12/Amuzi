import {PLAYLIST_MEDIA} from '../content/playlist';

export interface state extends user, theme, event, authState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  openSubsriptionPanel: boolean;
  setOpenSubscriptionPanel: (value: boolean) => void;
  currentEvent?: string;
  setCurrentEvent: (value: string) => void;
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
  userState: 'loggedIn' | 'loggedOut' | 'onBoarded' | null;
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

export interface authState {
  otp: number[];
  pushOtp: (value: number) => void;
  popOtp: () => void;
  timer: number;
  setTimer: () => void;
  resetTimer: () => void;
}

export interface iWatchlistStore {
  watchlist: string[];
  setWatchlist: (media: string[]) => void;
  editWatchlist: (mediaId: string) => boolean;
  watchListMedia: PLAYLIST_MEDIA[];
  setWatchListMedia: (media: PLAYLIST_MEDIA[]) => void;
}
