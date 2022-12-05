import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import JWPlayer, {Config} from 'react-native-jw-media-player';
import Orientation from 'react-native-orientation-locker';
import {black, white} from '../../constants/colors';
import {width} from '../../constants/dimensions';
import {px2} from '../../constants/spacing';

type Props = {
  // ref: React.RefObject<JWPlayer>;
  config: Omit<Config, 'license'>;
};

const Player = ({config}: Props) => {
  const [loading, setLoading] = useState(true);
  const landscapeOnFullScreen = () => {
    Orientation.lockToLandscape();
    StatusBar.setHidden(true);
  };

  const exitLandscape = () => {
    Orientation.lockToPortrait();
    StatusBar.setHidden(false);
  };

  useEffect(() => {
    setLoading(true);
  }, [config]);

  const ref = useRef<JWPlayer>(null);
  return (
    <View style={styles.main}>
      <JWPlayer
        config={{
          license:
            Platform.OS === 'ios'
              ? '4CgAXHzCyznDrVR7jAZOZ3JqeQ0qh49YmVFIuAPqZcp+7AcWjGrkBgAti9c='
              : '6OVf7W54zrVXWkBwsxP/sOyFFhBtmfAIjPyWz0dN95PuCB3xR7PlPq1F2Xg=',
          ...config,
        }}
        style={styles.player}
        ref={ref}
        onPlay={_ => setLoading(false)}
        onFullScreenRequested={landscapeOnFullScreen}
        onFullScreenExit={exitLandscape}
      />
      {loading && (
        <View style={[StyleSheet.absoluteFill, styles.loader]}>
          <ActivityIndicator size={40} color={white} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    position: 'relative',
  },
  player: {
    height: (9 / 16) * width,
    borderRadius: px2,
    width: 'auto',
  },
  loader: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: black,
    zIndex: 30,
  },
});

export default Player;
