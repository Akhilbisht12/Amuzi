import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface icon {
  size?: number;
  color?: string;
}

const SearchIco = ({size, color}: icon) => {
  return (
    <Svg
      width={size ? size : 25}
      height={size ? size : 25}
      viewBox={`0 0 ${size ? size : 25} ${size ? size : 25}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.5785 2.16602C6.82785 2.16602 2.16602 6.72489 2.16602 12.3485C2.16602 17.9722 6.82785 22.5311 12.5785 22.5311C15.0381 22.5311 17.2984 21.6971 19.0801 20.3027L22.4645 23.6037L22.5545 23.6795C22.8688 23.9069 23.3142 23.881 23.5986 23.6023C23.9113 23.2956 23.9106 22.7991 23.5971 22.4933L20.2525 19.231C21.953 17.4187 22.991 15.0021 22.991 12.3485C22.991 6.72489 18.3292 2.16602 12.5785 2.16602ZM12.5785 3.73442C17.4434 3.73442 21.3872 7.5911 21.3872 12.3486C21.3872 17.106 17.4434 20.9627 12.5785 20.9627C7.71361 20.9627 3.76983 17.106 3.76983 12.3486C3.76983 7.5911 7.71361 3.73442 12.5785 3.73442Z"
        fill={color ? color : '#FAFAFA'}
      />
    </Svg>
  );
};
export default SearchIco;
