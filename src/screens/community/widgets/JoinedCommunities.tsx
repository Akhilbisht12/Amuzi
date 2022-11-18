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
import {width} from '../../../constants/dimensions';
import {black, gray, grayLight, white} from '../../../constants/colors';
import {px1, px2, px3, px4, py1, py2, pyh} from '../../../constants/spacing';
import Icon from 'react-native-vector-icons/Ionicons';
import {bold, md, medium, sm, xs} from '../../../constants/fonts';
import {getJoinedCommunities} from '../../../api/community/community.api';
import {useNavigation} from '@react-navigation/native';
import useStore from '../../../store/store';
import {COMMUNITY} from '../../../types/community/community';

const JoinedCommunities = () => {
  const [refresh, setRefresh] = useState(false);
  const [joinedCommunities, setJoinedCommunities] = useState<COMMUNITY[]>();
  const {setCommunity} = useStore();

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

  const renderCommunityView = ({item}: {item: COMMUNITY}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setCommunity(item);
          navigation.navigate('CommunityPage', {name: item.name, item});
        }}
        style={styles.communityViewMain}>
        <Image style={styles.communityViewImage} source={{uri: item.image}} />
        <View style={styles.communityDetails}>
          <Text style={styles.communityViewText}>{item.name}</Text>
          <View style={{flexDirection: 'row', marginVertical: pyh}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="image" color={white} size={20} />
              <Text style={{color: white, marginRight: px4}}>
                {' '}
                {item.postCount}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="people" color={white} size={20} />
              <Text style={{color: white}}> {item.memberCount}</Text>
            </View>
          </View>
          <Text style={[styles.communityViewDesc]}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.main}>
      {joinedCommunities?.length === 0 && (
        <View style={styles.emptyCommunityView}>
          <Icon name="people" color={grayLight} size={100} />
          <Text style={styles.emptyCommunity}>
            Communities joined by you will appear here.
          </Text>
        </View>
      )}
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
        data={joinedCommunities}
        keyExtractor={item => item._id}
        renderItem={renderCommunityView}
      />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CreateCommunity', {name: 'Create Community'})
        }
        style={styles.fab}>
        <Icon name="add" color={black} size={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
    paddingHorizontal: px3,
  },
  communityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: px4,
    marginVertical: py2,
  },
  communityHeaderTitle: {
    color: white,
    fontSize: md,
    fontFamily: bold,
  },
  communityHeaderIcon: {
    color: white,
    fontSize: 25,
  },
  communityViewMain: {
    flexDirection: 'row',
    marginVertical: py1,
    backgroundColor: gray,
    borderRadius: px1,
    padding: px1,
  },
  communityViewImage: {
    width: width * 0.2,
    height: 0.2 * width,
    borderRadius: 5,
    marginRight: px2,
    resizeMode: 'contain',
  },
  communityDetails: {
    flex: 1,
  },
  communityViewText: {
    color: white,
    fontSize: sm,
    fontFamily: bold,
  },
  communityViewDesc: {
    color: grayLight,
    fontSize: xs,
    textTransform: 'capitalize',
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
