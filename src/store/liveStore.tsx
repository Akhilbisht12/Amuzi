import create from 'zustand';
import {iLiveStore} from '../types/store/live';

const useLiveStore = create<iLiveStore>(set => ({
  events: [],
  setEvents: events => set({events}),
  chatRooms: [],
  setChatRooms: chatRooms => set({chatRooms}),
  createModalSheet: false,
  setCreateModalSheet: createModalSheet => set({createModalSheet}),
  joinModalSheet: false,
  setJoinModalSheet: joinModalSheet => set({joinModalSheet}),
  onLiveIndex: null,
  setOnLiveIndex: onLiveIndex => set({onLiveIndex}),
}));

export default useLiveStore;
