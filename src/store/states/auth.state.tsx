import {authState} from '../../types/store/store';
import useStore from '../store';

const authActions: authState = {
  otp: [],
  timer: 90,
  pushOtp: (value: number) => {
    const otp = useStore.getState().otp;
    if (otp.length < 4) {
      otp.push(value);
    }
    useStore.setState({otp});
  },
  popOtp: () => {
    const otp = useStore.getState().otp;
    otp.pop();
    useStore.setState({otp});
  },
  setTimer: () => {
    const timer = useStore.getState().timer;
    useStore.setState({timer: timer - 1});
  },
  resetTimer: () => {
    useStore.setState({timer: 90});
  },
};
export default authActions;
