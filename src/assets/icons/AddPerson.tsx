import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface icon {
  size?: number;
  color?: string;
}

const AddPerson = ({size, color}: icon) => {
  return (
    <Svg
      width={size ? size : 25}
      height={size ? size : 25}
      viewBox={`0 0 ${size ? size : 25} ${size ? size : 25}`}
      fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.877 15.207C6.033 15.207 2.75 15.788 2.75 18.116C2.75 20.444 6.013 21.046 9.877 21.046C13.722 21.046 17.004 20.464 17.004 18.137C17.004 15.81 13.742 15.207 9.877 15.207Z"
        stroke={color ? color : '#FAFAFA'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.87758 11.886C12.4006 11.886 14.4456 9.841 14.4456 7.318C14.4456 4.795 12.4006 2.75 9.87758 2.75C7.35558 2.75 5.31058 4.795 5.31058 7.318C5.30158 9.832 7.33158 11.877 9.84658 11.886H9.87758Z"
        stroke={color ? color : '#FAFAFA'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M19.2031 8.66992V12.6799"
        stroke={color ? color : '#FAFAFA'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M21.2502 10.6738H17.1602"
        stroke={color ? color : '#FAFAFA'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
export default AddPerson;
