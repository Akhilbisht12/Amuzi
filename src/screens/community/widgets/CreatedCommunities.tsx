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
import {black, gray, grayLight, green, white} from '../../../constants/colors';
import {px1, px2, px4, py1, py2, pyh} from '../../../constants/spacing';
import Icon from 'react-native-vector-icons/Ionicons';
import {bold, md, nm, sm, xs2} from '../../../constants/fonts';
import {getCreatedCommunities} from '../../../api/community/community.api';
import useStore from '../../../store/store';
import {useNavigation} from '@react-navigation/native';

type communityBadge = {
  _id: string;
  name: string;
  image: string;
  approvalStatus: boolean | null;
  description: string;
};

const CreatedCommunities = () => {
  const [refresh, setRefresh] = useState(false);
  const [createdCommunities, setCreatedCommunities] =
    useState<communityBadge[]>();

  const navigation = useNavigation();
  const {createdRefresh, setCreatedRefresh} = useStore();
  const getJoinedCommunitiesHandler = async () => {
    try {
      const communities = await getCreatedCommunities();
      setCreatedCommunities(communities);
    } catch (error) {}
  };

  useEffect(() => {
    getJoinedCommunitiesHandler();
  }, [createdRefresh]);

  const renderCommunityView = ({item}: {item: communityBadge}) => {
    const CommunityView = ({community}: {community: communityBadge}) => {
      const [readMoreDesc, setReadMoreDesc] = useState(false);
      const [readMoreReason, setReadMoreReason] = useState(false);

      return (
        <TouchableOpacity
          // onPress={() =>
          //   navigation.navigate('CommunityPage', {
          //     name: item.name,
          //     item,
          //     isAdmin: true,
          //   })
          // }
          style={styles.communityViewMain}>
          <View style={styles.mediaStatus}>
            <Image
              style={styles.communityViewImage}
              source={{uri: item.image}}
            />

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
          </View>
          <View style={styles.communityDetails}>
            <Text style={styles.communityViewText}>{community.name}</Text>
            <Text style={styles.communityViewDesc}>
              <Text style={{color: grayLight, fontFamily: bold}}>
                Description:{' '}
              </Text>
              {readMoreDesc
                ? community.description
                : community.description.substring(0, 40)}

              <Text
                onPress={() => setReadMoreDesc(!readMoreDesc)}
                style={styles.readMoreText}>
                {readMoreDesc ? ' Read Less' : ' Read More'}
              </Text>
            </Text>
            <Text style={styles.communityViewDesc}>
              <Text style={{color: grayLight, fontFamily: bold}}>Reason: </Text>
              {readMoreReason
                ? community.description
                : community.description.substring(0, 40)}

              <Text
                onPress={() => setReadMoreReason(!readMoreReason)}
                style={styles.readMoreText}>
                {readMoreReason ? ' Read Less' : ' Read More'}
              </Text>
            </Text>
          </View>
        </TouchableOpacity>
      );
    };
    return <CommunityView community={item} />;
  };
  return (
    <View style={styles.main}>
      {createdCommunities?.length === 0 && (
        <View style={styles.emptyCommunity}>
          <Icon name="person-add" style={styles.emptyCommunityIcon} />
          <Text style={styles.emptyCommunityText}>
            Communities created by you will appear here.
          </Text>
        </View>
      )}
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => {
              setRefresh(true);
              setCreatedRefresh();
              setRefresh(false);
            }}
          />
        }
        data={createdCommunities}
        keyExtractor={item => item._id}
        renderItem={renderCommunityView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
    paddingVertical: py2,
    paddingHorizontal: px4,
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
    backgroundColor: gray,
    padding: px1,
    borderRadius: px2,
    marginVertical: py1,
  },
  mediaStatus: {
    marginRight: px2,
  },
  communityViewImage: {
    width: width * 0.2,
    height: 0.2 * width,
    borderRadius: 8,
    marginRight: px2,
  },
  communityDetails: {
    alignItems: 'flex-start',
    flex: 1,
  },
  communityViewText: {
    color: white,
    fontSize: sm,
    fontFamily: bold,
  },

  communityViewDesc: {
    color: grayLight,
    lineHeight: md,
    marginVertical: pyh,
  },
  readMoreButton: {},
  readMoreText: {
    color: white,
  },
  approvedBadge: {
    backgroundColor: green,
    padding: px1,
    borderRadius: px1,
    marginVertical: py1,
  },
  pendingBadge: {
    backgroundColor: 'orange',
    padding: px1,
    borderRadius: px1,
    marginVertical: py1,
  },
  rejectedBadge: {
    backgroundColor: 'red',
    padding: px1,
    borderRadius: px1,
    marginVertical: py1,
  },
  statusBadgeText: {
    color: white,
    fontSize: xs2,
    textAlign: 'center',
  },
  emptyCommunity: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCommunityIcon: {
    fontSize: 100,
    color: grayLight,
  },
  emptyCommunityText: {
    color: grayLight,
    paddingHorizontal: px4,
    marginVertical: py2,
  },
});

export default CreatedCommunities;
