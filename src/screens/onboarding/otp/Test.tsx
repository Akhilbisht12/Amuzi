import {Text, TouchableOpacity, Keyboard, TextInput} from 'react-native';
import React, {useRef} from 'react';
import {white} from '../../../constants/colors';
import useStore from '../../../store/store';

const Test = () => {
  const input = useRef<TextInput>(null);
  input.current?.focus();
  Keyboard.addListener('keyboardDidShow', e => {
    console.log(e.duration);
  });
  console.log(input.current?.state);
  const {otp} = useStore();
  return (
    <TouchableOpacity onPress={() => Keyboard}>
      <TextInput ref={input} style={{color: white, display: 'none'}} />
      {otp.map(item => {
        return <Text style={{color: white}}>{item}</Text>;
      })}
    </TouchableOpacity>
  );
};

export default Test;
