import {View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import SportsHeader from '../widgets/SportsHeader';
import styles from './styles';
import PreferenceSlider from './widgets/PreferenceSlider';
import {getPlaylists} from '../../../api/playlist/playlist';
import MediaSlider from '../widgets/MediaSlider';

const PreferredSports = () => {
  const [playlists, setPlaylists] = useState<string[]>();
  const getPlaylistHandler = async () => {
    try {
      const response = await getPlaylists();
      setPlaylists(response);
    } catch (error) {}
  };

  useEffect(() => {
    getPlaylistHandler();
  }, []);
  return (
    <View style={styles.main}>
      <ScrollView>
        <SportsHeader selected={0} />
        <PreferenceSlider />
        {playlists?.map(playlistId => {
          return <MediaSlider key={playlistId} playlistId={playlistId} />;
        })}
      </ScrollView>
    </View>
  );
};

export default PreferredSports;
