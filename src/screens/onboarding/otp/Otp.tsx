import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
} from 'react';
import BackTitleHeader from '../../../components/Headers/BackTitleHeader';
import {UnauthenticatedStack} from '../../../containers/routes/Unauthenticated';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import styles from './styles';
import Button from '../../../components/button/Button';
import {resendOtp, verifyOtp} from '../../../api/auth/auth';
import Storage from '@react-native-async-storage/async-storage';
import useStore from '../../../store/store';

type Props = NativeStackScreenProps<UnauthenticatedStack, 'Otp'>;

const Otp = ({route}: Props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const {setUser, setLoading} = useStore();
  const OtpBoxRef = useRef(null);
  // component to render timer
  const RenderTimer = () => {
    const [seconds, setSeconds] = useState(90);
    const interval = useRef<number>(0);
    const startInterval = useCallback(() => {
      interval.current = setInterval(() => {
        setSeconds(state => state - 1);
      }, 1000);
    }, []);

    useEffect(() => {
      if (seconds <= 0) {
        clearInterval(interval.current);
      }
    }, [seconds]);

    useEffect(() => {
      startInterval();
    }, [startInterval]);

    const handleResentOtp = async () => {
      setLoading(true);
      setSeconds(90);
      try {
        startInterval();
        const {data} = await resendOtp(route.params.phone);
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
      } catch (error: any) {
        ToastAndroid.show(error.data.error, ToastAndroid.SHORT);
      } finally {
        setLoading(false);
      }
    };

    return (
      <View style={styles.resend}>
        {seconds <= 90 && seconds !== 0 && (
          <TouchableOpacity style={styles.resendButton}>
            <Text style={styles.resendText}>Resend code in</Text>
            <Text style={styles.resendTextHighlight}>{seconds}s </Text>
          </TouchableOpacity>
        )}
        {seconds === 0 && (
          <TouchableOpacity
            onPress={handleResentOtp}
            style={styles.resendButton}>
            <Text style={styles.resendTextHighlight}>Resend OTP </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const handleVerifyOtp = () => {
    if (OtpBoxRef) {
      OtpBoxRef.current?.verify();
    }
  };

  // coponent to render input box
  const RenderOtpInput = forwardRef((_, ref) => {
    const [localOtp, setLocalOtp] = useState(['', '', '', '']);
    const [focussed, setFocussed] = useState(0);
    const inputRefs = useRef<TextInput[]>([]);
    useImperativeHandle(ref, () => ({
      // api call to verify entered otp and save user
      verify: async () => {
        setLoading(true);
        setErrorMessage('');
        try {
          const {data} = await verifyOtp(route.params.phone, localOtp.join(''));
          await Storage.setItem('access', data.accessToken);
          await Storage.setItem('refresh', data.refreshToken);
          await Storage.setItem('onBoarded', data.onboarded.toString());
          setUser(data.onboarded ? 'onBoarded' : 'loggedIn');
        } catch (error: any) {
          setErrorMessage(error.data.error);
        } finally {
          setLoading(false);
        }
      },
    }));

    return (
      <View style={styles.inputContainer}>
        {localOtp.map((digit, index) => {
          return (
            <TextInput
              key={index}
              maxLength={1}
              value={digit}
              onKeyPress={e => {
                if (e.nativeEvent.key === 'Backspace') {
                  if (!localOtp[index] && inputRefs.current[index - 1]) {
                    inputRefs.current[index - 1].focus();
                    setFocussed(state => state - 1);
                  }
                }
              }}
              onChangeText={text => {
                setLocalOtp(state => {
                  state[index] = text;
                  return [...state];
                });
                if (inputRefs.current[index + 1] && localOtp[index]) {
                  inputRefs.current[index + 1].focus();
                  setFocussed(state => state + 1);
                }
              }}
              ref={el => {
                if (el) {
                  inputRefs.current[index] = el;
                }
              }}
              style={[styles.input, focussed === index && styles.inputBorder]}
            />
          );
        })}
      </View>
    );
  });

  return (
    <View style={styles.main}>
      <BackTitleHeader title={route.params.name} />
      <View style={styles.otpContainer}>
        <Text style={styles.title}>Enter the 4-digit OTP sent to</Text>
        <Text style={styles.phone}>+91 {route.params.phone}</Text>
        <RenderOtpInput ref={OtpBoxRef} />
        <RenderTimer />
        <Button title="Continue" colored={true} onPress={handleVerifyOtp} />
        <View>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>
      </View>
    </View>
  );
};

export default Otp;
