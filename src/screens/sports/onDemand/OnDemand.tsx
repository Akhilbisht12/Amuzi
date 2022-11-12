import {FlatList, View, Image, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import OnDemandPlayer from '../../../components/Players/OnDemandPlayer';
import styles from './styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {SportsStack} from '../../../containers/routes/Sports';
import {PLAYLIST_MEDIA} from '../../../types/content/playlist';

type Props = NativeStackScreenProps<SportsStack, 'onDemand'>;

const OnDemand = ({route}: Props) => {
  const {feed, mediaid} = route.params;
  const [playingIndex, setPlaylingIndex] = useState<number>(0);

  useEffect(() => {
    const index = feed.playlist.findIndex(item => item.mediaid === mediaid);
    player.current?.changePlaylistIndex(index);
  }, []);

  useEffect(() => {
    const index = feed.playlist.findIndex(item => item.mediaid === mediaid);
    setPlaylingIndex(index);
  }, [mediaid, feed]);

  const changePlaylistItem = (id: string) => {
    const index = feed.playlist.findIndex(item => item.mediaid === id);
    player.current?.changePlaylistIndex(index);
    setPlaylingIndex(index);
  };

  const renderPlaylistMedia = ({
    item,
    index,
  }: {
    item: PLAYLIST_MEDIA;
    index: number;
  }) => {
    const pubDate = new Date(item.pubdate).toDateString();
    return (
      <TouchableOpacity
        onPress={() => changePlaylistItem(item.mediaid)}
        style={[
          styles.mediaList,
          playingIndex === index && styles.selectedMediaList,
        ]}>
        <View style={styles.mediaImageView}>
          <Image
            style={styles.mediaListImage}
            source={{uri: item.images[0].src}}
          />
          <Text style={styles.mediaDuration}>
            {(item.duration / 60).toFixed(2)}
          </Text>
        </View>
        <View style={styles.mediaDesc}>
          <Text style={styles.mediaTitle}>{item.title}</Text>
          <Text style={styles.mediaTitle}>{pubDate} </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const player = useRef(null);

  return (
    <View style={styles.main}>
      <View>
        <OnDemandPlayer
          changePlaylistItem={changePlaylistItem}
          ref={player}
          playlist={feed.playlist.map(item => {
            return {
              sources: item.sources?.map(source => {
                return {
                  file: source.file,
                  label: source.label,
                  default: item.mediaid === mediaid ? true : false,
                };
              }),
            };
          })}
        />
      </View>

      <View style={styles.playingMediaDetails}>
        <Text style={styles.playingMediaTitle}>
          {feed.playlist[playingIndex].title}
        </Text>
        {feed.playlist[playingIndex].description && (
          <Text style={styles.playingMediaDesc}>
            {feed.playlist[playingIndex].description}
          </Text>
        )}
        <Text style={styles.playingPlaylistTitle}>
          {feed.title.toUpperCase()}
        </Text>
      </View>

      <FlatList
        style={styles.mediaListParent}
        data={feed.playlist}
        renderItem={renderPlaylistMedia}
        keyExtractor={item => item.mediaid}
      />
    </View>
  );
};

export default OnDemand;
