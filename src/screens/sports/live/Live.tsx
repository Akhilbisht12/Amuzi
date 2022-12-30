import {View, Image, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {iAuthenticated} from '../../../containers/routes/authenticated/Authenticated';
import Player from '../../../components/Players/Player';
import useLiveStore from '../../../store/liveStore';
import BackTitleHeader from '../../../components/Headers/BackTitleHeader';
import styles from './styles';
import {blue, red} from '../../../constants/colors';
import LiveTabs from '../../../containers/layout/LiveTabs';
import Dayjs from 'dayjs';

type Props = NativeStackScreenProps<iAuthenticated, 'sportsLive'>;

const Live = ({route}: Props) => {
  const {index} = route.params;
  const {events} = useLiveStore();
  const channel = events[index];
  const eventState = useRef(new Animated.Value(1)).current;
  const eventTime = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(eventState, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(eventTime, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(eventTime, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(eventState, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, [eventState, eventTime]);

  return (
    <View style={[styles.main]}>
      <BackTitleHeader title="" />
      <View style={styles.mainArea}>
        {channel.state === 2 && (
          <Player
            config={{
              playlist: [
                {
                  file: channel.streamingUrls.HLS,
                },
              ],
              viewOnly: false,
              autostart: true,
              enableLockScreenControls: true,
              pipEnabled: false,
            }}
          />
        )}
        {channel.state !== 2 && (
          <View>
            <Image
              style={styles.thumbnail}
              source={{uri: channel.thumbnailUrl}}
            />
            <Animated.Text
              style={[
                styles.badge,
                {
                  backgroundColor: channel.state === 2 ? red : blue,
                  opacity: eventState,
                },
              ]}>
              Upcoming
            </Animated.Text>
            <Animated.Text
              style={[
                styles.badge,
                {
                  backgroundColor: channel.state === 2 ? red : blue,
                  opacity: eventTime,
                },
              ]}>
              Live at {Dayjs(channel.startLiveAt).format('hh:mm a')}
            </Animated.Text>
          </View>
        )}
      </View>
      <LiveTabs index={index} />
    </View>
  );
};

export default Live;
