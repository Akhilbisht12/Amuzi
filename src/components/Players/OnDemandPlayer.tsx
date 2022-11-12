import {StyleSheet, Platform} from 'react-native';
import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import JWPlayer, {Config} from 'react-native-jw-media-player';
import {width} from '../../constants/dimensions';

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
          ? 'aMgByQuUOewafjvm3mpLUTECOfl/Qs5m25hRJ0sadFj6MybWgNcre870Msw='
          : 'iApV2ZR/i2Vhw/LKuRN1OkhIDgPROccV6trHN++EPqs37usNohicEd+ZWlk=',
      autostart: true,
      backgroundAudioEnabled: true,
      styling: {
        menuStyle: {},
      },
      viewOnly: false,
      pipEnabled: true,
      enableLockScreenControls: true,
      hideUIGroup: 'playlist',
      playlist: playlist,
    };

    useImperativeHandle(ref, () => ({
      changePlaylistIndex(index: number) {
        player.current?.setPlaylistIndex(index);
      },
    }));

    return (
      <JWPlayer
        ref={player}
        onSeek={event => console.log(event.position)}
        onPlaylistItem={event => console.log(event.mediaId)}
        onSetupPlayerError={event => console.log(event.error)}
        onPlayerError={event => console.log(event)}
        style={styles.player}
        config={config}
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
