import http, {server} from '../http';

export const createProfile = async (profile: any) => {
  const response = await http.post(`${server}/profile`, profile, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
  return response.data;
};
