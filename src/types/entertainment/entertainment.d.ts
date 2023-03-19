export interface iEntertainmentScreen {
  _id: string;
  playlists: string[];
  searchTag: string;
}

export interface iEntertainmentStore {
  screen: iEntertainmentScreen | null;
  setScreen: (screen: iEntertainmentScreen) => void;
}
