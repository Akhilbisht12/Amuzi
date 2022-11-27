import {View, Text} from 'react-native';
import React, {useState} from 'react';
import styles from '../styles';
import useLiveStore from '../../../../store/liveStore';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {iLiveTabs} from '../../../../containers/layout/LiveTabs';
import ViewWrapper from '../../../../components/wrappers/ViewWrapper';
import {white} from '../../../../constants/colors';

type Props = MaterialTopTabScreenProps<iLiveTabs, 'info'>;

const LiveInfo = ({route}: Props) => {
  const [readMore, setReadMore] = useState(false);
  const {events} = useLiveStore();
  const channel = events[route.params.index];
  return (
    <ViewWrapper>
      <View style={styles.mainArea}>
        <Text style={styles.title}>{channel.title}</Text>
        <View style={styles.eventTypeView}>
          <Text style={styles.eventTypeBadge}>{channel.eventType}</Text>
        </View>
        <Text style={styles.description}>
          {readMore
            ? channel.description
            : channel.description.substring(0, 120) + '...'}

          <Text style={{color: white}} onPress={() => setReadMore(!readMore)}>
            {readMore ? ' Read Less' : ' Read More'}
          </Text>
        </Text>
      </View>
    </ViewWrapper>
  );
};

export default LiveInfo;
