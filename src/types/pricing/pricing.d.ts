export interface iEventPass {
  pass: boolean;
  passType: 'subscription-plan' | 'event-pass';
}

export interface iSubscription {
  _id: string;
  name: string;
  price: number;
  discountPrice: number;
  validity: number;
}

export interface iUserSubscription {
  planId: string;
  name: string;
  expiresAt: string;
}

export interface iTransaction {
  _id: string;
  type: 0 | 1;
  amount: number;
  paymentAt: string;
  planName?: string;
  eventTitle?: string;
}

export interface iPricingStore {
  eventPass: iEventPass | null;
  setEventPass: (pass: iEventPass) => void;
  subscriptions: iSubscription[];
  setSubscriptions: (subscriptions: iSubscription[]) => void;
  userSubscription: iUserSubscription | null;
  setUserSubscription: (subscriptions: iUserSubscription) => void;
  transactions: iTransaction[];
  setTransactions: (transactions: iTransaction[]) => void;
}

export interface iRazorPayOptions {
  description?: string;
  image: 'https://cdn.pixabay.com/photo/2021/12/26/19/27/nature-6895756_960_720.jpg';
  currency: 'INR';
  key: 'rzp_test_Hbu1Q6A2fYievR';
  amount: number;
  name: string;
  prefill: {
    email: string;
    contact: string;
    name: string;
  };
  theme: {
    color: string;
  };
}

export interface iEventOrderResponse {
  id: string;
  entity: 'order';
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: 'INR';
  receipt: null;
  offer_id: null;
  status: string;
  attempts: number;
  notes: {
    eventId: string;
    phoneNo: string;
  };
  created_at: number;
}
