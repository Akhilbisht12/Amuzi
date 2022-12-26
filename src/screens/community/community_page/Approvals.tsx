import {
  View,
  Text,
  StyleSheet,
  Switch,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ViewWrapper from '../../../components/wrappers/ViewWrapper';
import BackTitleHeader from '../../../components/Headers/BackTitleHeader';
import {
  blackLight,
  gray,
  grayLight,
  green,
  white,
} from '../../../constants/colors';
import {px2, px4, py1, py2, pyh} from '../../../constants/spacing';
import {
  castApprovalStatus,
  getPostsForApproval,
  switchApprovalRequired,
} from '../../../api/community/community.api';
import {width} from '../../../constants/dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import {medium, sm, xs} from '../../../constants/fonts';
import {POST} from '../../../types/community/post';
import useCommunityStore from '../../../store/communityStore';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const Approvals = () => {
  const {community, setApprovalPosts, approvalPosts, updateApprovalPosts} =
    useCommunityStore();
  const [approvalSwitch, setApprovalSwitch] = useState(
    community?.approvalRequired,
  );
  const switchApprovalHandler = async (value: boolean) => {
    try {
      await switchApprovalRequired(community!._id, value);
      setApprovalSwitch(value);
    } catch (error) {}
  };

  const getPostForApprovalHandler = async () => {
    try {
      const posts = await getPostsForApproval(community!._id);

      setApprovalPosts(posts);
    } catch (error) {}
  };

  useEffect(() => {
    getPostForApprovalHandler();
  }, []);

  const renderApprovalPosts = ({item}: {item: POST}) => {
    return <ApproveCard post={item} />;
  };

  const ApproveCard = ({post}: {post: POST}) => {
    const approvalHandler = async (action: boolean) => {
      try {
        updateApprovalPosts(post._id);
        await castApprovalStatus(post.communityId, post._id, action);
      } catch (error) {}
    };
    return (
      <View key={post._id} style={styles.postMain}>
        <View style={styles.postHeader}>
          <View style={styles.postHeader}>
            {post.author.image ? (
              <Image
                style={styles.headerImage}
                source={{uri: post.author.image}}
              />
            ) : (
              <View style={styles.headerImage}>
                <Icon name="person" color={grayLight} size={40} />
              </View>
            )}

            <View>
              <Text style={styles.headerCommunityName}>{post.author.name}</Text>
              <Text style={styles.headerPostDetails}>
                {dayjs(post.createdAt).fromNow()}
              </Text>
            </View>
          </View>

          <View />
        </View>
        <View>
          <View style={styles.contentView}>
            <Text style={styles.contentText}>{post.content}</Text>
          </View>
          {post.image !== null && (
            <Image style={styles.postImage} source={{uri: post.image}} />
          )}
          <View style={styles.approveView}>
            <TouchableOpacity
              onPress={() => approvalHandler(false)}
              style={[
                styles.approvalButton,
                {borderColor: '#f94449', backgroundColor: '#f94449'},
              ]}>
              <Text style={[styles.buttonText, {color: white}]}>
                Disapprove
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => approvalHandler(true)}
              style={[styles.approvalButton, {borderColor: green}]}>
              <Text style={[styles.buttonText, {color: green}]}>Approve</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const EmptyList = () => {
    return (
      <View style={styles.emptyCommunityView}>
        <Icon name="people" color={grayLight} size={100} />
        <Text style={styles.emptyCommunity}>
          Posts for approvals in your community will appear here
        </Text>
      </View>
    );
  };
  return (
    <ViewWrapper>
      <BackTitleHeader title="Post Approvals" />
      <View style={styles.main}>
        <View style={styles.approvalSwitch}>
          <Text style={styles.text}>Enable Approvals</Text>
          <Switch
            value={approvalSwitch}
            onValueChange={switchApprovalHandler}
          />
        </View>
        <View>
          <FlatList
            contentContainerStyle={{flexGrow: 1}}
            ListEmptyComponent={() => <EmptyList />}
            keyExtractor={item => item._id}
            renderItem={renderApprovalPosts}
            data={approvalPosts}
          />
        </View>
      </View>
    </ViewWrapper>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: px2,
  },
  text: {
    color: white,
  },
  approvalSwitch: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  postMain: {
    marginVertical: pyh,
    backgroundColor: blackLight,
    elevation: 5,
    padding: px2,
    borderRadius: px2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerImage: {
    width: 0.15 * width,
    height: 0.15 * width,
    marginRight: px2,
    borderRadius: 0.15 * width,
    resizeMode: 'contain',
    backgroundColor: gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCommunityName: {
    color: white,
    fontSize: sm,
    fontFamily: medium,
  },
  headerPostDetails: {
    color: white,
    fontSize: xs,
  },
  postImage: {
    width: width * 0.92,
    height: width * 0.92,
    marginVertical: pyh,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  contentView: {
    marginVertical: py1,
  },
  contentText: {
    color: white,
    fontSize: sm,
  },
  approveView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: py1,
  },
  approvalButton: {
    width: 0.45 * width,
    borderRadius: px2,
    paddingVertical: py1,
    borderWidth: 1,
  },
  buttonText: {
    color: white,
    textAlign: 'center',
    fontSize: sm,
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
});

export default Approvals;
