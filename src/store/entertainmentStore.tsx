import create from 'zustand';
import {iEntertainmentStore} from '../types/entertainment/entertainment';

const useEntertainmentStore = create<iEntertainmentStore>(set => ({
  screen: null,
  setScreen: screen => set({screen}),
}));

export default useEntertainmentStore;
