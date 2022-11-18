import {StyleSheet, Platform, StatusBar} from 'react-native';
import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import JWPlayer, {Config, JWPlayerState} from 'react-native-jw-media-player';
import {width} from '../../constants/dimensions';
import Orientation from 'react-native-orientation-locker';

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

    const isPlaying = async () => {
      const playerState = await player.current?.playerState();
      return playerState === JWPlayerState.JWPlayerStatePlaying;
    };

    const onPlaylistItem = async () => {
      // console.log(await player.current?.playerState());
      console.log(await isPlaying());
      (await isPlaying()) === false && initBuffering();
      // console.log(await player.current?.playerState());
    };

    const initBuffering = () => {
      player.current?.setState(_ => (Platform.OS === 'ios' ? 2 : 1));
    };

    const landscapeOnFullScreen = () => {
      Orientation.lockToLandscape();
      StatusBar.setHidden(true);
    };

    const exitLandscape = () => {
      Orientation.lockToPortrait();
      StatusBar.setHidden(false);
    };

    return (
      <JWPlayer
        ref={player}
        style={styles.player}
        config={config}
        onPlaylistItem={onPlaylistItem}
        onFullScreenRequested={landscapeOnFullScreen}
        onFullScreenExit={exitLandscape}
      />
    );
  },
);

const styles = StyleSheet.create({
  player: {
    height: (9 / 16) * width,
  },
});

export default OnDemandPlayer;
