import {View, Image, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommunityStack} from '../../../containers/routes/authenticated/community/Community';
import styles from './styles';
import BackTitleHeader from '../../../components/Headers/BackTitleHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import {getCommunityPosts} from '../../../api/community/community.api';
import Post from '../widgets/PostCard';
import useStore from '../../../store/store';
import AdminSettings from './AdminSettings';
import ViewWrapper from '../../../components/wrappers/ViewWrapper';
import {py4} from '../../../constants/spacing';

type Props = NativeStackScreenProps<CommunityStack, 'CommunityPage'>;

const CommunityPage = ({route, navigation}: Props) => {
  const community = route.params.item;

  const {userProfile, posts, setPosts} = useStore();
  const [skip, setSkip] = useState(0);

  const getCommunityPostsHandler = async () => {
    try {
      const response = await getCommunityPosts(community._id, skip);
      setPosts([...response]);
      console.log('this ran');
    } catch (error) {}
  };

  useEffect(() => {
    getCommunityPostsHandler();
  }, []);

  return (
    <View style={styles.main}>
      <BackTitleHeader title={route.params.name} />
      <ViewWrapper refreshAction={() => getCommunityPostsHandler()}>
        <View style={styles.container}>
          <View style={styles.communityHeader}>
            <Image
              source={{uri: community.image}}
              style={styles.communityHeaderImage}
            />
            <View style={styles.communityCountView}>
              <Text style={styles.communityCount}>{community.postCount}</Text>
              <Text style={styles.communityCountName}>Posts</Text>
            </View>
            <View style={styles.communityCountView}>
              <Text style={styles.communityCount}>{community.memberCount}</Text>
              <Text style={styles.communityCountName}>Members</Text>
            </View>
            {community.admin === userProfile?.phoneNo ? (
              // <View style={styles.adminManageView}>
              //   <TouchableOpacity style={styles.adminManageButton}>
              //     <Icon name="settings-outline" color={white} size={30} />
              //   </TouchableOpacity>
              // </View>
              <AdminSettings />
            ) : (
              <View />
            )}
          </View>
          <View style={styles.communityDetails}>
            <Text style={styles.communityDetailsTitle}>{community.name}</Text>
            <Text style={styles.communityDetailsCategory}>
              {community.category}
            </Text>
            <Text style={styles.communityDetailsDescription}>
              {community.description}
            </Text>
          </View>
        </View>
        <View style={styles.divider} />

        {/* posts render */}
        {posts.map(post => {
          return (
            <Post
              key={post._id}
              isAdmin={community.admin === userProfile?.phoneNo}
              post={{
                ...post,
                name: community.name,
                profile: community.image,
                communityId: community._id,
              }}
            />
          );
        })}
        <View style={{paddingVertical: py4}} />
      </ViewWrapper>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CreatePost', {
            name: 'Create Community Post',
            community: community?.name,
            communityId: community?._id,
          })
        }
        style={styles.createPost}>
        <Icon style={styles.createPostIcon} name="add-outline" />
      </TouchableOpacity>
    </View>
  );
};

export default CommunityPage;
