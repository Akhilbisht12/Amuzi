import {View, StyleSheet, Platform, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import JWPlayer from 'react-native-jw-media-player';
import {height} from '../../constants/dimensions';
import {getPlaylist} from '../../api/playlist/playlist';
import {Text} from 'react-native-svg';
import {white} from '../../constants/colors';

type feed = {
  title: string;
  description: string;
  feedid: string;
  links: {
    first: string;
    last: string;
  };
  playlist: playlist[];
  feed_instance_id: string;
  sport: string;
};

interface playlist {
  title: string;
  mediaid: string;
  link: string;
  image: string;
  images: {
    src: string;
    width: string;
    type: string;
  }[];
  feedid: string;
  duration: number;
  pubdate: number;
  description: string;
  sources: {
    file: string;
    type: string;
    label: string;
  }[];
  tracks: {
    file: string;
    kind: string;
    label: string;
  }[];
}

interface jsPlay {
  title: string;
  mediaId: string;
  image: string;
  description: string;
  startTime: number;
  file: string;
  autostart: boolean;
  repeat: boolean;
  displayDescription: boolean;
  displayTitle: boolean;
  tracks: {
    file: string;
    label: string; // 'es', 'en'
  }[];
  sources: {
    file: string;
    label: string; // video, 'audio'
  }[];
}

const Sports = () => {
  const [feed, setFeed] = useState<playlist>();
  const [playlist, setPlaylist] = useState<jsPlay[]>();
  const getPlaylistHandler = async () => {
    try {
      const response = await getPlaylist('FXvgstJP');
      setFeed(response);
      setPlaylist(
        (response as feed).playlist.map(item => {
          return {
            image: item.image,
            title: item.title,
            images: item.images,
            sources: item.sources.map((source, index) => {
              return {
                file: source.file,
                type: source.label ? source.label : 'Auto',
                default: index === 0 ? true : false,
              };
            }),
          };
        }),
      );
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getPlaylistHandler();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    player: {
      height: height * 0.4,
    },
  });

  const config = {
    license:
      Platform.OS === 'android'
        ? 'V+JlysrAnjft72h+AhCGK/mIwWpztKZnUI1alMjG26cgSHZASphEl78Q+Ls='
        : 'lmVjnw8+Qe4J4NgSvzKq69+8zriRvKCR3Jzkl1jYpSjHnNqkZ8AyXzHtDSw=',
    autostart: true,
    backgroundAudioEnabled: true,
    styling: {
      colors: {},
    },
  };

  const renderPlaylistItem = ({item}: {item: jsPlay}) => {
    return (
      <View style={{backgroundColor: white}}>
        <Text>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {playlist && (
        <JWPlayer style={styles.player} config={{...config, playlist}} />
      )}
      {playlist && (
        <View style={{flexGrow: 1}}>
          <FlatList
            renderItem={renderPlaylistItem}
            data={playlist}
            keyExtractor={item => item.mediaId}
          />
        </View>
      )}
    </View>
  );
};

export default Sports;
