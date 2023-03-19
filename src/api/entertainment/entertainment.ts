import http, {server} from '../http';

export const getEntertainmentScreen = async () => {
  const {data} = await http.get(`${server}/entertainment-screen`);
  return data;
};
