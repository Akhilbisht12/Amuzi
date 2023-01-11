import useRewardStore from '../../store/rewardStore';
import {answerPollOption, answerQuizOption, getQuizNPolls} from './rewards';

export const getQuizNPollsHandler = async (
  pageLength: number,
  page: number,
) => {
  const {setQuizReward} = useRewardStore.getState();
  const quizRewards = await getQuizNPolls(pageLength, page);
  setQuizReward(quizRewards);
};

export const answerQuizOptionHandler = async (
  quizId: string,
  optionId: string,
) => {
  const {setQuizReward, quizRewards} = useRewardStore.getState();
  const data: any = await answerQuizOption(quizId, optionId);
  setQuizReward(
    quizRewards.map(item => {
      if (item._id === quizId && item.type === 'quiz') {
        item.userSelection = optionId;
        item.correctChoice = data._id;
      }
      return item;
    }),
  );
};

export const answerPollOptionHandler = async (
  pollId: string,
  optionId: string,
) => {
  const {quizRewards, setQuizReward} = useRewardStore.getState();
  const data: any = await answerPollOption(pollId, optionId);
  setQuizReward(
    quizRewards.map((item: any) => {
      if (item._id === pollId) {
        item.userSelection = optionId;
        const updatedOptions = new Map(
          data.options.map((opt: any) => [opt._id, opt.predictedBy]),
        );
        item.options = [
          ...item.options.map((option: any) => ({
            ...option,
            predictedBy: updatedOptions.get(option._id),
          })),
        ];
      }
      return item;
    }),
  );
};
