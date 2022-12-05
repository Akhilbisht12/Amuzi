import {FlatList, View, Image, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import OnDemandPlayer from '../../../components/Players/OnDemandPlayer';
import styles from './styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {PLAYLIST_MEDIA} from '../../../types/content/playlist';
import BackTitleHeader from '../../../components/Headers/BackTitleHeader';
import Watchlist from '../../../components/watchlist/Watchlist';
import {iAuthenticated} from '../../../containers/routes/authenticated/Authenticated';

type Props = NativeStackScreenProps<iAuthenticated, 'OnDemand'>;

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
  const ref = useRef(null);
  return (
    <View style={styles.main}>
      <View>
        {/* <Player
          ref={ref}
          config={{
            autostart: true,
            playlist: [
              {
                file: 'https://upgrately-live.cdn.vustreams.com/live/cb3b0b20-926b-4982-b643-f8427ae50574/live.isml/.m3u8',
                image: 'https://d3el35u4qe4frz.cloudfront.net/bkaovAYt-480.jpg',
              },
            ],
            styling: {
              colors: {},
              menuStyle: {},
            },
            viewOnly: true,
            pipEnabled: false,
            enableLockScreenControls: false,
          }}
        /> */}
        <BackTitleHeader title="" />
        <OnDemandPlayer
          changePlaylistItem={changePlaylistItem}
          ref={player}
          playlist={feed.playlist.map(item => {
            return {
              image: item.images[0].src,
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
      <View style={styles.actionView}>
      <Watchlist mediaId={feed.playlist[playingIndex].mediaid} />
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
