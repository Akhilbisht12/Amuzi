import create from 'zustand';
import {state} from '../types/store';
import userActions from './actions/user';

const useStore = create<state>(set => ({
  loading: false,
  setLoading: (loading: boolean) => {
    set({loading: loading});
  },
  ...userActions,
}));

export default useStore;
