import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface icon {
  size?: number;
  color?: string;
}

const Add = ({size, color}: icon) => {
  return (
    <Svg
      width={size ? size : 25}
      height={size ? size : 25}
      viewBox={`0 0 ${size ? size : 25} ${size ? size : 25}`}
      fill="none"
      xmlns="http://www.w3.org/2000/Svg">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.7305 17.502C12.282 17.502 11.918 17.138 11.918 16.6895V8.75195C11.918 8.30345 12.282 7.93945 12.7305 7.93945C13.179 7.93945 13.543 8.30345 13.543 8.75195V16.6895C13.543 17.138 13.179 17.502 12.7305 17.502Z"
        fill={color ? color : '#FAFAFA'}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.7019 13.5312H8.75781C8.30823 13.5312 7.94531 13.1673 7.94531 12.7188C7.94531 12.2703 8.30823 11.9062 8.75781 11.9062H16.7019C17.1504 11.9062 17.5144 12.2703 17.5144 12.7188C17.5144 13.1673 17.1504 13.5312 16.7019 13.5312Z"
        fill={color ? color : '#FAFAFA'}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.65332 2.70898C4.65032 2.70898 2.70898 4.76407 2.70898 7.9469V17.5127C2.70898 20.6956 4.65032 22.7507 7.65332 22.7507H17.8063C20.8104 22.7507 22.7507 20.6956 22.7507 17.5127V7.9469C22.7507 4.76407 20.8104 2.70898 17.8063 2.70898H7.65332ZM17.8063 24.3756H7.65332C3.72407 24.3756 1.08398 21.6175 1.08398 17.5127V7.9469C1.08398 3.84215 3.72407 1.08398 7.65332 1.08398H17.8063C21.7356 1.08398 24.3756 3.84215 24.3756 7.9469V17.5127C24.3756 21.6175 21.7356 24.3756 17.8063 24.3756Z"
        fill={color ? color : '#FAFAFA'}
      />
    </Svg>
  );
};
export default Add;
