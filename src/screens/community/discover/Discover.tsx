import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommunityStack} from '../../../containers/routes/Community';
import CommunityHeader from '../../../components/Headers/CommunityHeader';
import styles from './styles';
import {
  discoverCommunities,
  joinCommunity,
} from '../../../api/community/community.api';

type Props = NativeStackScreenProps<CommunityStack, 'Discover'>;

type community = {
  _id: string;
  name: string;
  category: string;
  image: string;
  admin: number;
  approvalRequired: boolean;
  isBanned: boolean;
};

const Discover = ({route}: Props) => {
  const [communities, setCommunities] = useState<community[]>([]);
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
  const joinCommunityHandler = async (community: string) => {
    try {
      await joinCommunity(community);
    } catch (error) {}
  };

  const renderItem = ({item}: {item: community}) => {
    return (
      <View style={styles.communityMain}>
        <Image style={styles.communityImage} source={{uri: item.image}} />
        <View style={styles.communityDetailsView}>
          <Text style={styles.communityTitle}>{item.name}</Text>
          <Text style={styles.communityCategory}>
            {item.category} · 4 members
          </Text>
          <Text style={styles.communityCategory}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
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
  return (
    <View style={styles.main}>
      <CommunityHeader title={route.params.name} />
      <View style={styles.container}>
        <FlatList
          data={communities}
          keyExtractor={item => item._id}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default Discover;
