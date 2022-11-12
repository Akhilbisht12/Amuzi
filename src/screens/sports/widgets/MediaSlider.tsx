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
import {bold, md, medium, nm, sm} from '../../../constants/fonts';
import {white} from '../../../constants/colors';
import {px3, px4, py1, py2} from '../../../constants/spacing';
import {useNavigation} from '@react-navigation/native';
import {height, width} from '../../../constants/dimensions';

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
            {Math.round(item.duration / 60)} mins
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
      <Text style={styles.title}>{feed.title}</Text>
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
    marginVertical: py2,
    paddingLeft: px4,
  },
  title: {
    fontSize: nm,
    fontFamily: medium,
    color: white,
    marginVertical: py2,
  },
  card: {
    height: 0.18 * height,
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
  },
});
export default MediaSlider;
