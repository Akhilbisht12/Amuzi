import create from 'zustand';
import {iLiveStore} from '../types/store/live';
const useLiveStore = create<iLiveStore>(set => ({
  events: [],
  setEvents: events => {
    set({events});
  },
}));

export default useLiveStore;
