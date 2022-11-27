import http, {server} from '../http';

export const getWatchList = async () => {
  const {data} = await http.get(`${server}/watch-list`);
  return data;
};

export const addToWatchList = async (mediaId: string) => {
  const {data} = await http.post(`${server}/watch-list/${mediaId}`);
  console.log(data);
  return data;
};

export const removeFromWatchList = async (mediaId: string) => {
  const {data} = await http.delete(`${server}/watch-list/${mediaId}`);
  console.log(data);
  return data;
};
