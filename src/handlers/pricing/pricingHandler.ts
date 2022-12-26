import {
  createEventOrder,
  createSubscriptionOrder,
  getEventPass,
  getSubscriptionPlans,
  getUserSubscriptionPlan,
  getUserTransactions,
  verifyEventPassPayment,
  verifySubscriptionPayment,
} from '../../api/pricing/pricing';
import usePricingStore from '../../store/pricingStore';
import RazorPay, {CheckoutOptions} from 'react-native-razorpay';
import {iEventOrderResponse} from '../../types/pricing/pricing';
import useStore from '../../store/store';
import {black, green} from '../../constants/colors';

export const getEventPassHandler = async (eventId: string) => {
  const {setEventPass} = usePricingStore.getState();
  const pass = await getEventPass(eventId);
  setEventPass(pass);
};

export const verifyEventPassPaymentHandler = async (
  paymentId: string,
  orderId: string,
  signature: string,
) => {
  const data = await verifyEventPassPayment(paymentId, orderId, signature);
  return data;
};

export const createEventOrderHandler = async (eventId: string) => {
  const {userProfile} = useStore.getState();
  const order = (await createEventOrder(eventId)) as iEventOrderResponse;
  const options: CheckoutOptions = {
    amount: order.amount,
    currency: order.currency,
    order_id: order.id,
    key: 'rzp_test_Hbu1Q6A2fYievR',
    name: 'Amuzi',
    description: 'event pass',
    allow_rotation: false,
    prefill: {
      name: userProfile?.name,
      contact: userProfile?.phoneNo.toString(),
    },
    remember_customer: true,
    theme: {
      backdrop_color: black,
      color: green,
      hide_topbar: true,
    },
  };
  await razorPayHandler(options);
};

export const razorPayHandler = async (options: CheckoutOptions) => {
  const {razorpay_payment_id, razorpay_order_id, razorpay_signature} =
    await RazorPay.open(options);
  console.log(razorpay_order_id, razorpay_payment_id);
  // type === 0 &&
  //   (await verifyEventPassPaymentHandler(
  //     razorpay_payment_id,
  //     razorpay_order_id,
  //     razorpay_signature,
  //   ));
  // type === 1 &&
  //   verifySubscriptionPaymentHandler(
  //     razorpay_payment_id,
  //     razorpay_order_id,
  //     razorpay_signature,
  //   );
};

export const getSubscriptionPlansHandler = async () => {
  const {setSubscriptions} = usePricingStore.getState();
  const plans = await getSubscriptionPlans();
  setSubscriptions(plans);
};

export const createSubscriptionOrderHandler = async (planId: string) => {
  const {userProfile} = useStore.getState();
  const order = (await createSubscriptionOrder(planId)) as iEventOrderResponse;
  const options: CheckoutOptions = {
    amount: order.amount,
    currency: order.currency,
    order_id: order.id,
    key: 'rzp_test_Hbu1Q6A2fYievR',
    name: 'Amuzi',
    description: 'subscription',
    allow_rotation: false,
    prefill: {
      name: userProfile?.name,
      contact: userProfile?.phoneNo.toString(),
    },
    remember_customer: true,
    theme: {
      backdrop_color: black,
      color: green,
      hide_topbar: true,
    },
  };
  await razorPayHandler(options); // 1 for subscription order
};

export const verifySubscriptionPaymentHandler = async (
  paymentId: string,
  orderId: string,
  signature: string,
) => {
  const data = await verifySubscriptionPayment(paymentId, orderId, signature);
  return data;
};

export const getUserSubscriptionPlanHandler = async () => {
  const {setUserSubscription} = usePricingStore.getState();
  const data = await getUserSubscriptionPlan();
  if (data !== null) {
    setUserSubscription(data);
  }
};

export const getUserTransactionsHandler = async (
  page: number,
  pageLength: number,
) => {
  const {setTransactions} = usePricingStore.getState();
  const transactions = await getUserTransactions(page, pageLength);
  setTransactions(transactions);
};
