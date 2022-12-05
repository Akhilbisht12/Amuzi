import {userProfile} from '../../types/store/store';
import http, {server} from '../http';

export const createProfile = async (profile: any) => {
  const response = await http.post(`${server}/profile`, profile, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
  return response.data;
};

export const getProfile = async () => {
  const {data} = await http.get(`${server}/profile`);
  return data;
};

export const updateProfileImage = async (imageData: any) => {
  const {data} = await http.put(`${server}/profile/image`, imageData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
  return data;
};

export const updateProfile = async (
  name: string,
  dob: string,
  gender: string,
): Promise<userProfile> => {
  const {data} = await http.put(`${server}/profile`, {
    name,
    dob,
    gender,
  });
  return data;
};
