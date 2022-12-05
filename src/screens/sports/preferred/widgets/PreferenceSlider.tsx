import {View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import HeroCard from '../../widgets/HeroCard';
import useLiveStore from '../../../../store/liveStore';
import {iLive} from '../../../../types/store/live';
import {width} from '../../../../constants/dimensions';
import Carousel from 'react-native-snap-carousel-v4';
type Props = {
  category?: string;
};

const PreferenceSlider = ({category}: Props) => {
  const [filteredEvents, setFilteredEvents] = useState<iLive[]>([]);
  const {events} = useLiveStore();
  const flatListRef = useRef(null);

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
    <Carousel
      loop
      data={filteredEvents}
      renderItem={renderCard}
      sliderWidth={width}
      itemWidth={0.85 * width}
      ref={flatListRef}
    />
  );
};

export default PreferenceSlider;
