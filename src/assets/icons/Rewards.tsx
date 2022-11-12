import React from 'react';
import Svg, {Path} from 'react-native-svg';

type Props = {
  color?: string;
  focused?: boolean;
};

const Rewards = ({color, focused}: Props) => {
  return (
    <Svg
      width="22"
      height="19"
      viewBox="0 0 22 19"
      fill={focused ? color : 'none'}
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.9033 17.5C19.7254 17.5 21.2012 16.0426 21.2012 14.2431V11.6506C19.9955 11.6506 19.0245 10.6917 19.0245 9.50103C19.0245 8.31035 19.9955 7.35039 21.2012 7.35039L21.2001 4.75686C21.2001 2.95745 19.7233 1.5 17.9023 1.5H4.50009C2.67906 1.5 1.20221 2.95745 1.20221 4.75686L1.20117 7.43485C2.40685 7.43485 3.37785 8.31035 3.37785 9.50103C3.37785 10.6917 2.40685 11.6506 1.20117 11.6506V14.2431C1.20117 16.0426 2.67697 17.5 4.49904 17.5H17.9033Z"
        stroke={color ? color : 'black'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Rewards;