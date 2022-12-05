import create from 'zustand';
import {iPricingStore} from '../types/pricing/pricing';
const usePricingStore = create<iPricingStore>(set => ({
  eventPass: null,
  setEventPass: pass => {
    set({eventPass: pass});
  },
  subscriptions: [],
  setSubscriptions: subscriptions => {
    set({subscriptions});
  },
  userSubscription: null,
  setUserSubscription: userSubscription => {
    set({userSubscription});
  },
}));

export default usePricingStore;
