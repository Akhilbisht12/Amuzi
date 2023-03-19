import http, {server} from '../http';

export const getAds = async () => {
  const {data} = await http.get(`${server}/adv-banners`);
  return data;
};
