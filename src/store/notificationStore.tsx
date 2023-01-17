import create from 'zustand';
import {iNotificationStore} from '../types/notifications/notifications';
const useNotificationStore = create<iNotificationStore>(set => ({
  notifications: [],
  setNotifications: notifications => set({notifications}),
}));

export default useNotificationStore;
