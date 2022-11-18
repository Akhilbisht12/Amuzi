import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getPlaylist} from '../../../../api/playlist/playlist';
import {FEED, PLAYLIST_MEDIA} from '../../../../types/content/playlist';
import HeroCard from '../../widgets/HeroCard';
import {px4} from '../../../../constants/spacing';

const PreferenceSlider = () => {
  const [playlist, setPlaylist] = useState<FEED>();
  const getPlaylistHandler = async () => {
    const response = await getPlaylist('fGt4FY4s');
    setPlaylist(response);
    try {
    } catch (error) {}
  };

  useEffect(() => {
    getPlaylistHandler();
  }, []);

  const renderCard = ({item}: {item: PLAYLIST_MEDIA}) => {
    return <HeroCard media={item} />;
  };

  return playlist?.playlist ? (
    <FlatList
      style={{padding: px4}}
      horizontal
      data={playlist?.playlist}
      renderItem={renderCard}
      keyExtractor={card => card.mediaid}
    />
  ) : (
    <View />
  );
};

export default PreferenceSlider;
