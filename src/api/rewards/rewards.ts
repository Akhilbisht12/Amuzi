import http, {server} from '../http';

export const getQuizNPolls = async (pageLength: number, page: number) => {
  const {data} = await http.get(
    `${server}/rewards?pageLength=${pageLength}&page=${page}`,
  );
  return data;
};

export const answerQuizOption = async (quizId: string, optionId: string) => {
  const {data} = await http.post(`${server}/rewards/quiz`, {
    quizId,
    optionId,
  });
  return data;
};

export const answerPollOption = async (pollId: string, optionId: string) => {
  const {data} = await http.post(`${server}/rewards/poll`, {
    pollId,
    optionId,
  });
  return data;
};
