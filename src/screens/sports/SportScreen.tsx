import {View, StyleSheet} from 'react-native';
import React from 'react';
import {iScreen} from '../../types/store/sport';
import {black} from '../../constants/colors';
import MediaSlider from './widgets/MediaSlider';
import ViewWrapper from '../../components/wrappers/ViewWrapper';
import PreferenceSlider from './preferred/widgets/PreferenceSlider';

type Props = {
  sport: iScreen;
};

const SportScreen = ({sport}: Props) => {
  return (
    <ViewWrapper>
      <View style={styles.main}>
        <PreferenceSlider />
        {sport.playlists?.map(playlistId => {
          return <MediaSlider key={playlistId} playlistId={playlistId} />;
        })}
      </View>
    </ViewWrapper>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
  },
});

export default SportScreen;
