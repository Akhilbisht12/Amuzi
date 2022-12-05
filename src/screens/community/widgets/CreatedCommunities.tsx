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
import {
  black,
  blackLight,
  grayLight,
  green,
  white,
} from '../../../constants/colors';
import {px1, px2, px4, py1, py2, pyh} from '../../../constants/spacing';
import Icon from 'react-native-vector-icons/Ionicons';
import {bold, md, medium, nm, xs2} from '../../../constants/fonts';
import {getCreatedCommunities} from '../../../api/community/community.api';
import {CompositeScreenProps} from '@react-navigation/native';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {iCommunityTabs} from '../../../containers/routes/authenticated/community/CommunityTabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommunityStack} from '../../../containers/routes/authenticated/community/CommunityRoutes';
import useCommunityStore from '../../../store/communityStore';

type communityBadge = {
  _id: string;
  name: string;
  image: string;
  approvalStatus: boolean | null;
  description: string;
};

type ApprovalProp = CompositeScreenProps<
  MaterialTopTabScreenProps<iCommunityTabs, 'Approvals'>,
  NativeStackScreenProps<CommunityStack>
>;

const CreatedCommunities = ({}: ApprovalProp) => {
  const [refresh, setRefresh] = useState(false);
  const [createdCommunities, setCreatedCommunities] =
    useState<communityBadge[]>();

  const {createdRefresh, setCreatedRefresh} = useCommunityStore();
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
        <TouchableOpacity style={styles.communityViewMain}>
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
                : community.description.substring(0, 80)}

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
                : community.description.substring(0, 80)}

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

  const EmptyComponent = () => {
    return (
      <View style={styles.emptyCommunity}>
        <Icon name="person-add" style={styles.emptyCommunityIcon} />
        <Text style={styles.emptyCommunityText}>
          Communities created by you will appear here.
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.main}>
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
        ListEmptyComponent={() => <EmptyComponent />}
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
    paddingVertical: pyh,
    paddingHorizontal: px4,
  },
  communityViewMain: {
    backgroundColor: blackLight,
    padding: px1,
    borderRadius: px2,
    marginVertical: pyh,
    elevation: 5,
  },
  mediaStatus: {},
  communityViewImage: {
    width: 'auto',
    height: 0.15 * height,
    borderRadius: px2,
  },
  communityDetails: {
    alignItems: 'flex-start',
    flex: 1,
    paddingVertical: py1,
    paddingHorizontal: px1,
  },
  communityViewText: {
    color: white,
    fontSize: nm,
    fontFamily: medium,
  },

  communityViewDesc: {
    color: grayLight,
    lineHeight: md,
    marginVertical: pyh,
  },
  readMoreButton: {},
  readMoreText: {
    color: grayLight,
    fontFamily: bold,
  },
  approvedBadge: {
    backgroundColor: green,
    padding: px1,
    borderRadius: px1,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  pendingBadge: {
    backgroundColor: 'orange',
    padding: px1,
    borderRadius: px1,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  rejectedBadge: {
    backgroundColor: 'red',
    padding: px1,
    borderRadius: px1,
    position: 'absolute',
    top: 10,
    left: 10,
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
