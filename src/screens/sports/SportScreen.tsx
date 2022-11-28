import {StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {iScreen} from '../../types/store/sport';
import MediaSlider from './widgets/MediaSlider';
import PreferenceSlider from './preferred/widgets/PreferenceSlider';
import ViewWrapper from '../../components/wrappers/ViewWrapper';
import {GetEventHandler} from '../../handlers/events/eventsHandler';

type Props = {
  sport: iScreen;
};

const SportScreen = ({sport}: Props) => {
  const renderSportComponents = ({item}: {item: string}) => {
    return <MediaSlider playlistId={item} />;
  };

  return (
    <ViewWrapper refreshAction={() => GetEventHandler()}>
      <FlatList
        ListHeaderComponent={
          <PreferenceSlider
            category={
              sport.name.toLowerCase() === 'all'
                ? undefined
                : sport.name.toUpperCase()
            }
          />
        }
        contentContainerStyle={styles.main}
        data={sport.playlists}
        renderItem={renderSportComponents}
      />
    </ViewWrapper>
  );
};

const styles = StyleSheet.create({
  main: {
    flexGrow: 1,
  },
});

export default SportScreen;
