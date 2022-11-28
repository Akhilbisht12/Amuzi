import {
  StyleSheet,
  Platform,
  StatusBar,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import JWPlayer, {Config} from 'react-native-jw-media-player';
import {width} from '../../constants/dimensions';
import Orientation from 'react-native-orientation-locker';
import {black, white} from '../../constants/colors';

type Props = {
  playlist: {
    sources: {
      file: string;
      label: string;
      default?: boolean;
    }[];
  }[];
};

const OnDemandPlayer = forwardRef(
  ({playlist, changePlaylistItem}: Props, ref) => {
    const player = useRef<JWPlayer>(null);
    const config: Config = {
      license:
        Platform.OS === 'ios'
          ? 'y0DeWSyjixhmZ/tBu/bidi9rqn3jqjiVo1ZP7SJHzGfjyJM48Ru/kHQOD34='
          : 'qgDAENLeDwYY3/N8TqcAIWdfJbXWnToTz9yPRWeWxiIrHQETupvMPpYecBg=',
      autostart: true,
      backgroundAudioEnabled: true,
      styling: {
        menuStyle: {},
      },
      viewOnly: false,
      pipEnabled: false,
      enableLockScreenControls: true,
      hideUIGroup: 'playlist',
      landscapeOnFullScreen: true,
      preload: 'auto',
      playlist: playlist,
    };

    useImperativeHandle(ref, () => ({
      changePlaylistIndex(index: number) {
        player.current?.setPlaylistIndex(index);
      },
    }));

    const landscapeOnFullScreen = () => {
      Orientation.lockToLandscape();
      StatusBar.setHidden(true);
    };

    const exitLandscape = () => {
      Orientation.lockToPortrait();
      StatusBar.setHidden(false);
    };

    const [loading, setLoading] = useState(true);
    useEffect(() => {
      setLoading(true);
    }, [changePlaylistItem]);
    return (
      <View>
        <JWPlayer
          onPlay={_ => setLoading(false)}
          ref={player}
          style={styles.player}
          config={config}
          onFullScreenRequested={landscapeOnFullScreen}
          onFullScreenExit={exitLandscape}
        />
        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator size={40} color={white} />
          </View>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  player: {
    height: (9 / 16) * width,
  },
  loader: {
    height: (9 / 16) * width,
    position: 'absolute',
    backgroundColor: black,
    width: width,
    zIndex: 29,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OnDemandPlayer;
