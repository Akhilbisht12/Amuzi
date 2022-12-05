import {
  View,
  Image,
  Animated,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {iAuthenticated} from '../../../containers/routes/authenticated/Authenticated';
import Player from '../../../components/Players/Player';
import useLiveStore from '../../../store/liveStore';
import BackTitleHeader from '../../../components/Headers/BackTitleHeader';
import {
  black,
  blue,
  grayLight,
  green,
  red,
  white,
} from '../../../constants/colors';
import Dayjs from 'dayjs';
import {px4, px6, py1} from '../../../constants/spacing';
import {md, medium, nm} from '../../../constants/fonts';
import {width} from '../../../constants/dimensions';
import globalStyles from '../../../styles/globals';
import {
  createEventOrderHandler,
  getEventPassHandler,
} from '../../../handlers/pricing/pricingHandler';
import usePricingStore from '../../../store/pricingStore';
import SuccessModal from '../../../components/modals/SuccessModal';
import useStore from '../../../store/store';

type Props = NativeStackScreenProps<iAuthenticated, 'sportsOverview'>;
const successTitle = 'Congratulations';
const successBody = 'You have successfully purchased the subscription';
const Overview = ({route, navigation}: Props) => {
  const {index} = route.params;
  const [visible, setVisible] = useState(false);
  const {events} = useLiveStore();
  const {eventPass} = usePricingStore();
  const {setOpenSubscriptionPanel, setCurrentEvent} = useStore();
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

  useEffect(() => {
    (async function () {
      await getEventPassHandler(channel.id);
    })();
  }, [channel.id]);

  useEffect(() => {
    setCurrentEvent(channel.id);
  }, [channel.id, setCurrentEvent]);

  const handleEventPurchase = async () => {
    try {
      await createEventOrderHandler(channel.id);
      setVisible(true);
    } catch (error) {}
  };

  return (
    <>
      <View style={styles.main}>
        <BackTitleHeader title="" />
        <View style={{paddingHorizontal: px4}}>
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
        <View style={styles.mainArea}>
          <Text style={[globalStyles.textLight, {marginTop: py1}]}>
            #{channel.eventType}
          </Text>
          <Text style={styles.title}>{channel.title}</Text>
          {!eventPass?.pass && (
            <>
              <TouchableOpacity
                onPress={handleEventPurchase}
                style={globalStyles.button}>
                <Text style={globalStyles.buttonText}>
                  Watch With ₹{channel.price} Pass
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setOpenSubscriptionPanel(true)}
                style={globalStyles.buttonLight}>
                <Text style={globalStyles.buttonLightText}>
                  Buy Subscription
                </Text>
              </TouchableOpacity>
            </>
          )}
          {eventPass?.pass && (
            <TouchableOpacity
              onPress={() => navigation.navigate('sportsLive', {index: index})}
              style={globalStyles.button}>
              <Text style={globalStyles.buttonText}>Watch Now</Text>
            </TouchableOpacity>
          )}
          <Text style={globalStyles.textLight}>{channel?.description}</Text>
        </View>
      </View>
      <SuccessModal
        visible={visible}
        setVisible={setVisible}
        title={successTitle}
        body={successBody}
        buttonAction={() => getEventPassHandler(channel.id)}
      />
    </>
  );
};

export default Overview;

export const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  mainArea: {
    paddingHorizontal: px4,
    flex: 1,
  },
  thumbnail: {
    height: (9 / 16) * width,
    borderRadius: 15,
  },
  title: {
    color: white,
    fontSize: md,
    fontFamily: medium,
  },
  eventTypeView: {
    alignItems: 'flex-start',
  },
  eventTypeBadge: {
    color: white,
    textTransform: 'capitalize',
    paddingVertical: py1,
    paddingHorizontal: px4,
    borderRadius: px6,
    backgroundColor: green,
    marginBottom: py1,
  },
  description: {
    color: grayLight,
    fontSize: nm,
  },
  badge: {
    color: white,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingVertical: py1,
    paddingHorizontal: px4,
    position: 'absolute',
  },
  button: {
    backgroundColor: white,
    paddingVertical: py1,
  },
  buttonText: {
    color: black,
  },
});
