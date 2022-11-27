import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {height} from '../../../constants/dimensions';
import {black, blackLight, grayLight, white} from '../../../constants/colors';
import {px1, px2, px3, px4, py2, pyh} from '../../../constants/spacing';
import Icon from 'react-native-vector-icons/Ionicons';
import {bold, nm, sm, xs} from '../../../constants/fonts';
import {getJoinedCommunities} from '../../../api/community/community.api';
import {useNavigation} from '@react-navigation/native';
import {COMMUNITY} from '../../../types/community/community';
import useCommunityStore from '../../../store/communityStore';

const JoinedCommunities = () => {
  const [refresh, setRefresh] = useState(false);
  const [joinedCommunities, setJoinedCommunities] = useState<COMMUNITY[]>();
  const {setCommunity, setPosts} = useCommunityStore();
  const navigation = useNavigation();

  const getJoinedCommunitiesHandler = async () => {
    try {
      const communities = await getJoinedCommunities();
      setJoinedCommunities(communities);
    } catch (error) {}
  };

  useEffect(() => {
    getJoinedCommunitiesHandler();
  }, []);

  const EmptyList = () => {
    return (
      <View style={styles.emptyCommunityView}>
        <Icon name="people" color={grayLight} size={100} />
        <Text style={styles.emptyCommunity}>
          Communities joined by you will appear here.
        </Text>
      </View>
    );
  };

  const renderCommunityView = ({item}: {item: COMMUNITY}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setPosts([]);
          setCommunity(item);
          navigation.navigate('CommunityPage');
        }}
        style={styles.communityViewMain}>
        <Image style={styles.communityViewImage} source={{uri: item.image}} />
        <View style={styles.communityDetails}>
          <Text style={styles.communityViewText}>{item.name}</Text>
          <Text style={[styles.communityCategory]}>
            {item.category} · {item.postCount} Posts · {item.memberCount}{' '}
            Members
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <View style={styles.main}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => {
                setRefresh(true);
                getJoinedCommunitiesHandler();
                setRefresh(false);
              }}
            />
          }
          ListEmptyComponent={() => <EmptyList />}
          data={joinedCommunities}
          keyExtractor={item => item._id}
          renderItem={renderCommunityView}
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CreateCommunity', {name: 'Create Community'})
          }
          style={styles.fab}>
          <Icon name="add" color={black} size={30} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
    paddingHorizontal: px2,
  },
  communityViewMain: {
    marginVertical: pyh,
    marginHorizontal: px2,
    backgroundColor: blackLight,
    elevation: 5,
    borderRadius: px2,
    padding: px1,
  },
  communityViewImage: {
    width: 'auto',
    height: 0.15 * height,
    borderRadius: px2,
    resizeMode: 'cover',
  },
  communityNumbers: {
    color: grayLight,
    fontSize: sm,
    textTransform: 'capitalize',
  },
  communityDetails: {
    flex: 1,
    marginVertical: pyh,
    paddingHorizontal: px1,
    paddingVertical: pyh,
  },
  communityViewText: {
    color: white,
    fontSize: nm,
    fontFamily: bold,
  },
  communityCategory: {
    color: grayLight,
    fontSize: xs,
    textTransform: 'capitalize',
  },
  communityViewDesc: {
    color: grayLight,
    fontSize: xs,
    textTransform: 'capitalize',
    marginVertical: pyh,
    textAlign: 'center',
  },
  emptyCommunityView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCommunity: {
    color: grayLight,
    paddingHorizontal: px4,
    marginVertical: py2,
  },
  fab: {
    backgroundColor: white,
    padding: px3,
    borderRadius: 100,
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
});

export default JoinedCommunities;
