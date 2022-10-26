import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {width} from '../../../constants/dimensions';
import {white} from '../../../constants/colors';
import {px4, py2} from '../../../constants/spacing';
import Icon from 'react-native-vector-icons/Ionicons';
import {bold, md} from '../../../constants/fonts';
import {getJoinedCommunities} from '../../../api/community/community.api';
import {useNavigation} from '@react-navigation/native';

type communityBadge = {
  _id: string;
  name: string;
  image: string;
};

const JoinedCommunitiesSlider = () => {
  const navigation = useNavigation();
  const [joinedCommunities, setJoinedCommunities] =
    useState<communityBadge[]>();
  const getJoinedCommunitiesHandler = async () => {
    try {
      const communities = await getJoinedCommunities();
      setJoinedCommunities(communities);
    } catch (error) {}
  };

  useEffect(() => {
    getJoinedCommunitiesHandler();
  }, []);

  const renderCommunityView = ({item}: {item: communityBadge}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CommunityPage', {name: item.name, item})
        }
        style={styles.communityViewMain}>
        <Image style={styles.communityViewImage} source={{uri: item.image}} />
        <Text style={styles.communityViewText}>
          {item.name.length > 12
            ? item.name.substring(0, 12) + '...'
            : item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <View style={styles.communityHeader}>
        <Text style={styles.communityHeaderTitle}>Joined Communities</Text>
        <Icon name="chevron-forward" style={styles.communityHeaderIcon} />
      </View>
      <FlatList
        data={joinedCommunities}
        horizontal
        keyExtractor={item => item._id}
        renderItem={renderCommunityView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    paddingLeft: px4,
    alignItems: 'center',
  },
  communityViewImage: {
    width: width * 0.2,
    height: 0.2 * width,
    borderRadius: 8,
    marginVertical: 4,
  },
  communityViewText: {
    color: white,
  },
});

export default JoinedCommunitiesSlider;
