import {StyleSheet, ScrollView, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {iScreen} from '../../types/store/sport';
import {black} from '../../constants/colors';
import MediaSlider from './widgets/MediaSlider';
import PreferenceSlider from './preferred/widgets/PreferenceSlider';
import useStore from '../../store/store';
import {height} from '../../constants/dimensions';

type Props = {
  sport: iScreen;
};

const SportScreen = ({sport}: Props) => {
  const {setSportScrollYOffset, sportScrollYOffset, scrollUp} = useStore();
  const marginTop = useRef(new Animated.Value(0.185 * height)).current;
  useEffect(() => {
    marginAnim(scrollUp || sportScrollYOffset === 0 ? true : false);
  }, [scrollUp, sportScrollYOffset]);
  const marginAnim = (show: boolean) => {
    Animated.timing(marginTop, {
      toValue: show ? 0.185 * height : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: black,
        flexGrow: 1,
      }}
      onScroll={event => {
        setSportScrollYOffset(event.nativeEvent.contentOffset.y);
      }}>
      <Animated.View style={[styles.main]}>
        <PreferenceSlider />
        {sport.playlists?.map(playlistId => {
          return <MediaSlider key={playlistId} playlistId={playlistId} />;
        })}
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
  },
});

export default SportScreen;
