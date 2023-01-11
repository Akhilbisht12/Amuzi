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
import {px1, px2, px3, px4, py1, py2} from '../../../constants/spacing';
import {useNavigation} from '@react-navigation/native';
import {width} from '../../../constants/dimensions';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {iAuthenticated} from '../../../containers/routes/authenticated/Authenticated';
import BackTitleHeader from '../../../components/Headers/BackTitleHeader';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = NativeStackScreenProps<iAuthenticated, 'mediaList'>;

const MediaList = ({route}: Props) => {
  const {playlistId} = route.params;
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
            <Icon name="play" /> {Math.round(item.duration / 60)} mins
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
    <>
      <BackTitleHeader title={feed.title} />
      <View style={styles.main}>
        <FlatList
          numColumns={2}
          data={feed?.playlist}
          renderItem={renderCard}
          keyExtractor={item => item.mediaid}
          columnWrapperStyle={styles.cardColumn}
        />
      </View>
    </>
  ) : (
    <View />
  );
};

const styles = StyleSheet.create({
  main: {
    padding: px2,
    flex: 1,
  },
  title: {
    fontSize: nm,
    fontFamily: medium,
    color: white,
    marginVertical: py2,
  },
  cardColumn: {
    justifyContent: 'space-evenly',
  },
  card: {
    height: (0.45 * width * 9) / 16,
    resizeMode: 'cover',
    borderRadius: 10,
    marginHorizontal: px1,
    width: 0.45 * width,
  },
  cardTitle: {
    color: white,
    width: 0.45 * width,
    marginVertical: py1,
    fontSize: sm,
  },
  cardDuration: {
    color: white,
    fontSize: sm,
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: black,
    padding: 5,
    borderRadius: 5,
  },
});
export default MediaList;
