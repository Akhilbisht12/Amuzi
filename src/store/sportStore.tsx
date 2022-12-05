import create from 'zustand';
import {SportStore} from '../types/store/sport';

const useSportStore = create<SportStore>(set => ({
  screens: [],
  setScreens: screens => set({screens}),
}));

export default useSportStore;
