import http from '../http';

export const createProfile = async (profile: any) => {
  const response = await http.post('/profile', profile, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
  return response.data;
};
