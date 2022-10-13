import create from 'zustand';
import {state} from '../types/store';
import eventActions from './actions/events';
import themeActions from './actions/theme';
import userActions from './actions/user';

const useStore = create<state>(set => ({
  loading: false,
  setLoading: (loading: boolean) => {
    set({loading: loading});
  },
  ...userActions,
  ...eventActions,
  ...themeActions,
}));

export default useStore;
