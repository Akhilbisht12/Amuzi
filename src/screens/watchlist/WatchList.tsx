import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {iAuthenticated} from '../../containers/routes/authenticated/Authenticated';
import BackTitleHeader from '../../components/Headers/BackTitleHeader';
import ViewWrapper from '../../components/wrappers/ViewWrapper';
import {styles} from './styles';
import useWatchListStore from '../../store/states/watchlistStore';
import {GetWatchListMediaHandler} from '../../handlers/watchlist/watchListHandler';
import {PLAYLIST_MEDIA} from '../../types/content/playlist';
import {px4} from '../../constants/spacing';

type Props = NativeStackScreenProps<iAuthenticated, 'watchlist'>;

const WatchList = ({navigation}: Props) => {
  const {watchlist, watchListMedia} = useWatchListStore();
  useEffect(() => {
    GetWatchListMediaHandler();
  }, [watchlist]);

  const renderItem = ({item}: {item: PLAYLIST_MEDIA}) => {
    const {duration} = item;
    const minute = Math.floor(duration / 60);
    const second = duration % 60;
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('OnDemand', {
            feed: {
              playlist: watchListMedia,
              description: 'Watchlist',
              title: 'WatchList',
              feedid: 'jwp ',
            },
            mediaid: item.mediaid,
          })
        }
        style={styles.resultCard}>
        <View>
          <Image style={styles.resultImage} source={{uri: item.image}} />
          <Text style={styles.resultDuration}>
            {`${minute}:${second <= 9 ? '0' : ''}${second}`}
          </Text>
        </View>
        <Text style={styles.resultTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.main}>
      <BackTitleHeader title="Watchlist" />
      <ViewWrapper>
        <View style={{paddingHorizontal: px4}}>
          <FlatList
            data={watchListMedia}
            renderItem={renderItem}
            keyExtractor={item => item.mediaid}
          />
        </View>
      </ViewWrapper>
    </View>
  );
};

export default WatchList;
