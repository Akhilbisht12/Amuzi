import http, {server} from '../http';

export const createCommunity = async (community: any) => {
  const {data} = await http.post(`${server}/community/request`, community, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
  return data;
};
