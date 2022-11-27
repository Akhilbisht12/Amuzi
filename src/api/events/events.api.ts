import http, {server} from '../http';

export const getEvents = async () => {
  const {data} = await http.get(`${server}/jwp/live-events`);
  return data;
};
