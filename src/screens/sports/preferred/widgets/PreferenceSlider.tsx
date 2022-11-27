import {FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeroCard from '../../widgets/HeroCard';
import {px4} from '../../../../constants/spacing';
import useLiveStore from '../../../../store/liveStore';
import {iLive} from '../../../../types/store/live';

type Props = {
  category?: string;
};

const PreferenceSlider = ({category}: Props) => {
  const [filteredEvents, setFilteredEvents] = useState<iLive[]>([]);
  const {events} = useLiveStore();

  useEffect(() => {
    if (!category) return setFilteredEvents(events);
    const result = events.filter(
      item => item.eventType.toUpperCase() === category?.toUpperCase(),
    );
    setFilteredEvents(result);
  }, [category, events]);

  const renderCard = ({item, index}: {item: iLive; index: number}) => {
    return <HeroCard live={item} index={index} />;
  };
  if (filteredEvents.length === 0) return <View />;
  return (
    <FlatList
      style={{padding: px4}}
      horizontal
      data={filteredEvents}
      renderItem={renderCard}
      keyExtractor={item => item.id}
    />
  );
};

export default PreferenceSlider;
