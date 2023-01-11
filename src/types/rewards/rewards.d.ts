export interface iSponsor {
  _id: string;
  name: string;
  redirectionUrl: string;
  logo: string;
  color: string;
}

export interface iQuizOption {
  _id: string;
  option: string;
}
export interface iPollOption {
  _id: string;
  option: string;
  predictedBy: number;
}

export interface iQuiz {
  _id: string;
  title: string;
  question: string;
  sponsor?: iSponsor;
  prize: number;
  optionCount: number;
  participantCount: number;
  type: 'quiz';
  options: iQuizOption[];
  userSelection?: null | string;
  correctChoice?: string;
}

export interface iPoll {
  _id: string;
  title: string;
  question: string;
  sponsor?: iSponsor;
  optionCount: number;
  participantCount: number;
  type: 'poll';
  options: iPollOption[];
  userSelection?: null | string;
}

export interface iRewardStore {
  quizRewards: (iQuiz | iPoll)[];
  setQuizReward: (rewards: (iQuiz | iPoll)[]) => void;
}
