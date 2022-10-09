import http from '../http';

export const signIn = async (number: number) => {
  return await http.post('/auth/sign-in/', {phoneNo: number});
};

export const verifyOtp = async (number: number, otp: string): Promise<any> => {
  return await http.post('/auth/verify-otp', {phoneNo: number, otp});
};

export const resendOtp = async (number: number): Promise<any> => {
  return await http.post('auth/resend-otp', {phoneNo: number});
};
