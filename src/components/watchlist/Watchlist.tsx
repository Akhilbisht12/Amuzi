import {Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import useWatchListStore from '../../store/states/watchlistStore';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {white} from '../../constants/colors';
import {
  addToWatchList,
  removeFromWatchList,
} from '../../api/watchlist/watchlist.api';

type Props = {
  mediaId: string;
};

const Watchlist = ({mediaId}: Props) => {
  const {watchlist, editWatchlist} = useWatchListStore();
  const [check, setCheck] = useState(false);
  useEffect(() => {
    const watchlistSet = new Set(watchlist);
    if (watchlistSet.has(mediaId)) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, [mediaId, watchlist]);
  const editWatchlistHandler = async () => {
    const watchlistSet = new Set(watchlist);
    if (watchlistSet.has(mediaId)) {
      await removeFromWatchList(mediaId);
    } else {
      await addToWatchList(mediaId);
    }
    editWatchlist(mediaId);
  };
  return (
    <TouchableOpacity onPress={editWatchlistHandler} style={styles.button}>
      {check ? (
        <Icon name="checkmark-outline" size={25} color={'blue'} />
      ) : (
        <Icon name="add-outline" size={25} color={white} />
      )}
      <Text style={styles.buttonText}>Watchlist</Text>
    </TouchableOpacity>
  );
};

export default Watchlist;
