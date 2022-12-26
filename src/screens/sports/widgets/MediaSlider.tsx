import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FEED, PLAYLIST_MEDIA} from '../../../types/content/playlist';
import {getPlaylist} from '../../../api/playlist/playlist';
import {medium, nm, sm} from '../../../constants/fonts';
import {black, white} from '../../../constants/colors';
import {px3, px4, py1, py2} from '../../../constants/spacing';
import {useNavigation} from '@react-navigation/native';
import {width} from '../../../constants/dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import {formatVideoLength} from '../../../utils/helpers';

const MediaSlider = ({playlistId}: {playlistId: string}) => {
  const [feed, setFeed] = useState<FEED>();
  const navigation = useNavigation();
  useEffect(() => {
    const getMediaHandler = async () => {
      try {
        const response = await getPlaylist(playlistId);
        setFeed(response);
      } catch (error) {}
    };
    getMediaHandler();
  }, [playlistId]);

  const renderCard = ({item}: {item: PLAYLIST_MEDIA}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('OnDemand', {mediaid: item.mediaid, feed})
        }>
        <View>
          <Image style={styles.card} source={{uri: item.images[0].src}} />
          <Text style={styles.cardDuration}>
            <Icon name="play" /> {formatVideoLength(item.duration)}
          </Text>
        </View>
        <Text style={styles.cardTitle}>
          {item.title.length > 35
            ? item.title.substring(0, 35) + '...'
            : item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return feed?.playlist ? (
    <View style={styles.main}>
      <TouchableOpacity
        onPress={() => navigation.navigate('mediaList', {playlistId})}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.title}>{feed.title}</Text>
        <Icon
          color={white}
          style={{paddingRight: 10}}
          size={25}
          name="chevron-forward-outline"
        />
      </TouchableOpacity>
      <FlatList
        horizontal
        data={feed?.playlist}
        renderItem={renderCard}
        keyExtractor={item => item.mediaid}
      />
    </View>
  ) : (
    <View />
  );
};

const styles = StyleSheet.create({
  main: {
    marginVertical: py1,
    paddingLeft: px4,
  },
  title: {
    fontSize: nm,
    fontFamily: medium,
    color: white,
    marginVertical: py2,
  },
  card: {
    height: (0.55 * width * 9) / 16,
    width: 0.55 * width,
    resizeMode: 'cover',
    marginRight: px3,
    borderRadius: 10,
  },
  cardTitle: {
    color: white,
    width: 0.55 * width,
    marginVertical: py1,
    fontSize: sm,
  },
  cardDuration: {
    color: white,
    fontSize: sm,
    position: 'absolute',
    bottom: 10,
    left: 10,
    borderRadius: 5,
    padding: 5,
    backgroundColor: black,
  },
});
export default MediaSlider;
