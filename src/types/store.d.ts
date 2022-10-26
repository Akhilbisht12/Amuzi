export interface state extends user, theme, event {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export interface user {
  userState: 'loggedIn' | 'loggedOut' | 'onBoarded';
  setUser: (state: 'loggedIn' | 'loggedOut' | 'onBoarded') => void;
}

export interface theme {
  theme: 'dark' | 'light';
  setTheme: (changedTheme: 'dark' | 'light') => void;
}

export interface event {
  postRefresh: boolean;
  communityCreate: boolean;
  setCommunityCreate: (value: boolean) => void;
  setPostRefresh: () => void;
}
