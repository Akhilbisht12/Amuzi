import React from 'react';
import Svg, {Path} from 'react-native-svg';

type Props = {
  color?: string;
  focused?: boolean;
};

const Xclusive = ({color, focused}: Props) => {
  return (
    <Svg
      width="24"
      height="23"
      viewBox="0 0 24 23"
      fill={focused ? color : 'none'}>
      <Path
        d="M13.1807 15.4114C8.67263 20.616 4.63685 26.164 0 18.3453C4.69887 18.2832 8.07633 14.1521 9.84138 11.9434C5.6768 7.46392 3.94514 5.09779 9.39773 1C9.84138 3.93381 11.1962 6.01372 12.9612 8.28444C15.7376 4.62552 21.0042 -0.483602 23.3703 6.51938C20.7513 6.17114 17.6315 9.89207 16.2099 11.8145C18.4472 13.9899 20.7179 15.7263 24 15.7263C20.5939 22.6005 17.5647 19.4472 13.1521 15.4448L13.1807 15.4114Z"
        stroke={color ? color : 'black'}
        stroke-miterlimit="10"
      />
    </Svg>
  );
};

export default Xclusive;
