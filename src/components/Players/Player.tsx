import React, {useRef} from 'react';
import {Platform, StatusBar, StyleSheet} from 'react-native';
import JWPlayer, {Config} from 'react-native-jw-media-player';
import Orientation from 'react-native-orientation-locker';
import {width} from '../../constants/dimensions';
import {px2} from '../../constants/spacing';

type Props = {
  // ref: React.RefObject<JWPlayer>;
  config: Omit<Config, 'license'>;
};



const Player = ({config}: Props) => {
  const landscapeOnFullScreen = () => {
    Orientation.lockToLandscape();
    StatusBar.setHidden(true);
  };

  const exitLandscape = () => {
    Orientation.lockToPortrait();
    StatusBar.setHidden(false);
  };

  const ref = useRef<JWPlayer>(null);
  return (
    <JWPlayer
      config={{
        license:
          Platform.OS === 'ios'
            ? 'y0DeWSyjixhmZ/tBu/bidi9rqn3jqjiVo1ZP7SJHzGfjyJM48Ru/kHQOD34='
            : 'qgDAENLeDwYY3/N8TqcAIWdfJbXWnToTz9yPRWeWxiIrHQETupvMPpYecBg=',
        ...config,
      }}
      style={styles.player}
      ref={ref}
      onFullScreenRequested={landscapeOnFullScreen}
      onFullScreenExit={exitLandscape}
    />
  );
};

const styles = StyleSheet.create({
  player: {
    height: (9 / 16) * width,
    borderRadius: px2,
  },
});

export default Player;
