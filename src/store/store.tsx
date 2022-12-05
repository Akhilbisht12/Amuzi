import create from 'zustand';
import {state} from '../types/store/store';
import themeActions from './actions/theme';
import userActions from './actions/user';
import authActions from './states/auth.state';

const useStore = create<state>(set => ({
  loading: false,
  setLoading: (loading: boolean) => {
    set({loading: loading});
  },
  openSubsriptionPanel: false,
  setOpenSubscriptionPanel: value => {
    set({openSubsriptionPanel: value});
  },
  currentEvent: undefined,
  setCurrentEvent: value => {
    set({
      currentEvent: value,
    });
  },
  ...userActions,
  ...themeActions,
  ...authActions,
}));

export default useStore;
