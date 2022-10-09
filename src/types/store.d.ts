export interface state extends user {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

interface user {
  userState: 'loggedIn' | 'loggedOut' | 'onBoarded';
  setUser: (state: 'loggedIn' | 'loggedOut' | 'onBoarded') => void;
}
