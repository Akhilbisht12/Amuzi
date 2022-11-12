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
import {gray, grayLight, green, white} from '../../../constants/colors';
import {px2, px4, py1, py2, py4} from '../../../constants/spacing';
import useStore from '../../../store/store';
import {
  castApprovalStatus,
  getPostsForApproval,
  switchApprovalRequired,
} from '../../../api/community/community.api';
import {height, width} from '../../../constants/dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import {medium, sm, xs} from '../../../constants/fonts';
import {POST} from '../../../types/community/post';

const Approvals = () => {
  const {community, setApprovalPosts, approvalPosts, updateApprovalPosts} =
    useStore();
  const [approvalSwitch, setApprovalSwitch] = useState(
    community.approvalRequired,
  );
  const switchApprovalHandler = async (value: boolean) => {
    try {
      await switchApprovalRequired(community._id, value);
      setApprovalSwitch(value);
    } catch (error) {}
  };

  const getPostForApprovalHandler = async () => {
    try {
      const posts = await getPostsForApproval(community._id);

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
                &#183;
                {Math.round(
                  (Date.now() - new Date(post.date)) / (1000 * 60 * 60 * 24),
                )}
                D
              </Text>
            </View>
          </View>

          <View />
        </View>
        <TouchableOpacity>
          <View style={styles.contentView}>
            <Text style={styles.contentText}>{post.content}</Text>
          </View>
          {post.image !== null && (
            <Image style={styles.postImage} source={{uri: post.image}} />
          )}
          <View style={styles.approveView}>
            <TouchableOpacity
              onPress={() => approvalHandler(true)}
              style={[styles.approvalButton, {backgroundColor: green}]}>
              <Text style={styles.buttonText}>Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => approvalHandler(false)}
              style={[styles.approvalButton, {backgroundColor: 'red'}]}>
              <Text style={styles.buttonText}>Disapprove</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
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
          <FlatList renderItem={renderApprovalPosts} data={approvalPosts} />
        </View>
      </View>
    </ViewWrapper>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: px4,
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
    marginVertical: py2,
    borderBottomWidth: 2,
    borderBottomColor: gray,
    paddingBottom: py4,
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
    height: 0.5 * height,
    marginVertical: py1,
    borderRadius: 10,
    resizeMode: 'contain',
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
  },
  buttonText: {
    color: white,
    textAlign: 'center',
    fontSize: sm,
  },
});

export default Approvals;
