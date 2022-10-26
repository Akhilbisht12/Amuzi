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
import {green, white} from '../../../constants/colors';
import {px1, px2, px4, py1, py2} from '../../../constants/spacing';
import Icon from 'react-native-vector-icons/Ionicons';
import {bold, md, nm, sm, xs, xs2} from '../../../constants/fonts';
import {getCreatedCommunities} from '../../../api/community/community.api';

type communityBadge = {
  _id: string;
  name: string;
  image: string;
  approvalStatus: boolean | null;
};

const CreatedCommunities = () => {
  const [createdCommunities, setCreatedCommunities] =
    useState<communityBadge[]>();
  const getJoinedCommunitiesHandler = async () => {
    try {
      const communities = await getCreatedCommunities();
      setCreatedCommunities(communities);
    } catch (error) {}
  };

  useEffect(() => {
    getJoinedCommunitiesHandler();
  }, []);

  const renderCommunityView = ({item}: {item: communityBadge}) => {
    return (
      <TouchableOpacity style={styles.communityViewMain}>
        <Image style={styles.communityViewImage} source={{uri: item.image}} />
        <Text style={styles.communityViewText}>
          {item.name.length > 12
            ? item.name.substring(0, 12) + '...'
            : item.name}
        </Text>
        {item.approvalStatus === null ? (
          <View style={styles.pendingBadge}>
            <Text style={styles.statusBadgeText}>Pending</Text>
          </View>
        ) : item.approvalStatus === true ? (
          <View style={styles.approvedBadge}>
            <Text style={styles.statusBadgeText}>Approved</Text>
          </View>
        ) : (
          <View style={styles.rejectedBadge}>
            <Text style={styles.statusBadgeText}>Rejected</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <View style={styles.communityHeader}>
        <Text style={styles.communityHeaderTitle}>My Communities</Text>
        <Icon name="chevron-forward" style={styles.communityHeaderIcon} />
      </View>
      <FlatList
        data={createdCommunities}
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
  approvedBadge: {
    position: 'absolute',
    backgroundColor: green,
    padding: px1,
    borderRadius: px2,
  },
  pendingBadge: {
    position: 'absolute',
    backgroundColor: 'orange',
    padding: px1,
    borderRadius: px2,
  },
  rejectedBadge: {
    position: 'absolute',
    backgroundColor: 'red',
    padding: px1,
    borderRadius: px2,
  },
  statusBadgeText: {
    color: white,
    fontSize: xs2,
  },
});

export default CreatedCommunities;
