import create from 'zustand';
import {iRewardStore} from '../types/rewards/rewards';

const useRewardStore = create<iRewardStore>(set => ({
  quizRewards: [],
  setQuizReward: quizRewards => set({quizRewards}),
}));

export default useRewardStore;
