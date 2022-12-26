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
import JWPlayer, {Config, PlaylistItem} from 'react-native-jw-media-player';
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
  ({playlist, changePlaylistItem}: {playlist: PlaylistItem}, ref) => {
    const player = useRef<JWPlayer>(null);
    const config: Config = {
      license:
        Platform.OS === 'ios'
          ? '4CgAXHzCyznDrVR7jAZOZ3JqeQ0qh49YmVFIuAPqZcp+7AcWjGrkBgAti9c='
          : '6OVf7W54zrVXWkBwsxP/sOyFFhBtmfAIjPyWz0dN95PuCB3xR7PlPq1F2Xg=',
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
      advertising: {
        adClient: 'vast',
        // adVmap:
        // 'https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpreonly&ciu_szs=300x250%2C728x90&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator=',
        // tag: 'https://waf.upgrate.in/ad',
        adSchedule: {
          tag: 'https://waf.upgrate.in/ad',

          // tag: 'https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpreonly&ciu_szs=300x250%2C728x90&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator=',
          offset: 'pre',
        },
      },
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
          // onPlay={_ => setLoading(false)}
          onBeforePlay={_ => setLoading(false)}
          ref={player}
          style={styles.player}
          config={config}
          onFullScreenRequested={landscapeOnFullScreen}
          onFullScreenExit={exitLandscape}
          onPlayerError={error => console.log(error)}
          onSetupPlayerError={error => console.log('setup', error)}
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
