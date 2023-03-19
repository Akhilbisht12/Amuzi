import {iThemeStore} from '../../types/store/theme';
import create from 'zustand';
const useThemeStore = create<iThemeStore>((set, get) => ({
  theme: {
    name: '',
    colorScheme: '#fff',
    icon: '',
    id: '',
    searchTag: ''
  },
  setTheme: theme =>
    set({
      theme,
    }),
}));

export default useThemeStore;
