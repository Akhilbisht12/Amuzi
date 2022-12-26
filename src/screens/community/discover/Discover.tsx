import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import {joinCommunity} from '../../../api/community/community.api';
import {grayLight, white} from '../../../constants/colors';
import useStore from '../../../store/store';
import {COMMUNITY} from '../../../types/community/community';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {iCommunityTabs} from '../../../containers/routes/authenticated/community/CommunityTabs';
import useCommunityStore from '../../../store/communityStore';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommunityStack} from '../../../containers/routes/authenticated/community/CommunityRoutes';
import {getDiscoverCommunitiesHandler} from '../../../handlers/community/discover';

type Props = CompositeScreenProps<
  MaterialTopTabScreenProps<iCommunityTabs, 'Discover'>,
  NativeStackScreenProps<CommunityStack>
>;

const Discover = ({navigation}: Props) => {
  const {setLoading} = useStore();
  const [refresh, setRefresh] = useState(false);
  const {setCommunity, discoverCommunities, removeDiscoverCommunity} =
    useCommunityStore();

  useEffect(() => {
    (async function () {
      await getDiscoverCommunitiesHandler();
    })();
  }, []);

  const EmptyCommunity = () => {
    return (
      <View style={styles.emptyCommunityView}>
        <Icon name="search-outline" color={grayLight} size={100} />
        <Text style={styles.emptyCommunity}>
          Communities suggested to you will appear here.
        </Text>
      </View>
    );
  };

  const renderItem = ({item}: {item: COMMUNITY}) => {
    const CommunityCard = () => {
      const [readMore, setReadMore] = useState(false);
      const joinCommunityHandler = async (communityId: string) => {
        try {
          setLoading(true);
          await joinCommunity(communityId);
          setCommunity(item);
          removeDiscoverCommunity(item._id);
          navigation.navigate('CommunityPage');
        } catch (error) {
          ToastAndroid.show('Try Again!', ToastAndroid.SHORT);
        } finally {
          setLoading(false);
        }
      };

      return (
        <View style={styles.communityMain}>
          <Image style={styles.communityImage} source={{uri: item.image}} />
          <View style={styles.communityDetailsView}>
            <Text style={styles.communityTitle}>{item.name}</Text>
            <Text style={styles.communityCategory}>
              {item.category} · {item.postCount} Posts · {item.memberCount}{' '}
              members
            </Text>
            <Text style={styles.communityCategory}>
              {readMore
                ? item.description
                : item.description.substring(0, 80) +
                  (item.description.length > 80 && '... ')}
              {item.description.length > 80 && (
                <Text
                  onPress={() => setReadMore(!readMore)}
                  style={{color: white}}>
                  {readMore ? ' Read Less' : ' Read More'}
                </Text>
              )}
            </Text>
            <TouchableOpacity
              style={styles.joinButton}
              onPress={() => joinCommunityHandler(item._id)}>
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    };
    return <CommunityCard />;
  };
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => {
                setRefresh(true);
                getDiscoverCommunitiesHandler();
                setRefresh(false);
              }}
            />
          }
          contentContainerStyle={styles.communityList}
          ListEmptyComponent={() => <EmptyCommunity />}
          data={discoverCommunities}
          keyExtractor={item => item._id}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default Discover;
