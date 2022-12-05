import http, {server} from '../http';

export const getEventPass = async (eventId: string) => {
  const {data} = await http.get(`${server}/event-pass/${eventId}`);
  return data;
};

export const createEventOrder = async (eventId: string) => {
  const {data} = await http.post(`${server}/order-event-pass/${eventId}`);
  return data;
};

export const verifyEventPassPayment = async (
  razorpayPaymentId: string,
  razorpayOrderId: string,
  razorpaySignature: string,
) => {
  const {data} = await http.post(`${server}/payment/event-pass/verify`, {
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
  });
  return data;
};

export const getSubscriptionPlans = async () => {
  const {data} = await http.get(`${server}/subscription-plans`);
  return data;
};

export const createSubscriptionOrder = async (planId: string) => {
  const {data} = await http.post(`${server}/order-subscription-plan/${planId}`);
  return data;
};

export const verifySubscriptionPayment = async (
  razorpayPaymentId: string,
  razorpayOrderId: string,
  razorpaySignature: string,
) => {
  const {data} = await http.post(`${server}/payment/subscription-plan/verify`, {
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
  });
  return data;
};

export const getUserSubscriptionPlan = async () => {
  const {data} = await http.get(`${server}/current-subscription-plan`);
  return data;
};
