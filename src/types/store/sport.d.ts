export interface SportStore {
  screens: iScreen[];
  setScreens: (screens: iScreen[]) => void;
}

export interface iScreen {
  _id: string;
  name: string;
  icon: string;
  colorScheme: string;
  playlists: string[];
  live: boolean;
  position: number;
}
