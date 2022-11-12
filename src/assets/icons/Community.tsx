import React from 'react';
import Svg, {Path} from 'react-native-svg';

type Props = {
  color?: string;
  focused?: boolean;
};

const Community = ({color, focused}: Props) => {
  return (
    <Svg
      width="23"
      height="19"
      viewBox="0 0 23 19"
      fill={focused ? color : 'none'}
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.5744 17.3681C8.33536 17.3681 5.56836 16.8781 5.56836 14.9161C5.56836 12.9541 8.31736 11.2461 11.5744 11.2461C14.8134 11.2461 17.5804 12.9381 17.5804 14.8991C17.5804 16.8601 14.8314 17.3681 11.5744 17.3681Z"
        stroke={color ? color : 'black'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.5746 8.449C13.7006 8.449 15.4246 6.726 15.4246 4.6C15.4246 2.474 13.7006 0.75 11.5746 0.75C9.44863 0.75 7.72463 2.474 7.72463 4.6C7.71863 6.718 9.42863 8.442 11.5476 8.449H11.5746Z"
        stroke={color ? color : 'black'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M17.9648 7.39202C19.2018 7.06102 20.1138 5.93302 20.1138 4.59002C20.1138 3.18902 19.1208 2.01902 17.7988 1.74902"
        stroke={color ? color : 'black'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M18.5449 10.5449C20.2989 10.5449 21.7969 11.7339 21.7969 12.7959C21.7969 13.4209 21.2799 14.1019 20.4959 14.2859"
        stroke={color ? color : 'black'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M5.18516 7.39202C3.94716 7.06102 3.03516 5.93302 3.03516 4.59002C3.03516 3.18902 4.02916 2.01902 5.35016 1.74902"
        stroke={color ? color : 'black'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M4.60356 10.5449C2.84956 10.5449 1.35156 11.7339 1.35156 12.7959C1.35156 13.4209 1.86856 14.1019 2.65356 14.2859"
        stroke={color ? color : 'black'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Community;
