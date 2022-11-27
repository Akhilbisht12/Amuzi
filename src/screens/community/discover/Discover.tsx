import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import {
  discoverCommunities,
  joinCommunity,
} from '../../../api/community/community.api';
import {grayLight, white} from '../../../constants/colors';
import useStore from '../../../store/store';
import {COMMUNITY} from '../../../types/community/community';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {iCommunityTabs} from '../../../containers/routes/authenticated/community/CommunityTabs';

type Props = MaterialTopTabScreenProps<iCommunityTabs, 'Discover'>;

const Discover = ({navigation}: Props) => {
  const [communities, setCommunities] = useState<COMMUNITY[]>([]);
  const {setLoading, setCommunity} = useStore();
  const discoverCommunitiesHandler = async () => {
    const data = await discoverCommunities();
    setCommunities(data);
    try {
    } catch (error: any) {
      console.log(error.data.error);
    }
  };
  useEffect(() => {
    discoverCommunitiesHandler();
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
          navigation.navigate('CommunityPage', {
            item: item,
            name: item.name,
            isAdmin: false,
          });
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
            <Text style={styles.communityCategory}>{item.category}</Text>
            <Text style={styles.communityCategory}>
              {item.postCount}Posts · {item.memberCount} members
            </Text>
            <Text style={styles.communityCategory}>
              {readMore ? item.description : item.description.substring(0, 80)}
              <Text
                onPress={() => setReadMore(!readMore)}
                style={{color: white}}>
                {readMore ? ' Read Less' : ' Read More'}
              </Text>
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
          contentContainerStyle={styles.communityList}
          ListEmptyComponent={() => <EmptyCommunity />}
          numColumns={2}
          data={communities}
          keyExtractor={item => item._id}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default Discover;
