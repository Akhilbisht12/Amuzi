import create from 'zustand';
import {iAdvertisementStore} from '../types/advertisment/advertisement';

const useAdStore = create<iAdvertisementStore>(set => ({
  ads: [],
  setAds: ads => set({ads}),
}));

export default useAdStore;
