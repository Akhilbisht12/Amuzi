import http, {server} from '../http';

export const getAllScreens = async () => {
  const {data} = await http.get(`${server}/screen`);
  return data;
};
