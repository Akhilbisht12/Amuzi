import {View, Image, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommunityStack} from '../../../containers/routes/authenticated/community/CommunityRoutes';
import styles from './styles';
import BackTitleHeader from '../../../components/Headers/BackTitleHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  communityPostsPageChange,
  getCommunityPosts,
} from '../../../api/community/community.api';
import Post from '../widgets/PostCard';
import useStore from '../../../store/store';
import AdminSettings from './AdminSettings';
import useCommunityStore from '../../../store/communityStore';
import PaginatedList from '../../../components/paginatedList/PaginatedList';

type Props = NativeStackScreenProps<CommunityStack, 'CommunityPage'>;

const CommunityPage = ({navigation}: Props) => {
  const {userProfile} = useStore();
  const {posts, setPosts, community} = useCommunityStore();
  const [descReadMore, setDescReadMore] = useState(false);

  const getCommunityPostsHandler = async (pageLength: number, page: number) => {
    try {
      const response = await getCommunityPosts(
        community!._id,
        pageLength,
        page,
      );
      setPosts([...response]);
    } catch (error) {}
  };

  useEffect(() => {
    getCommunityPostsHandler(10, 1);
  }, []);

  const renderPost = ({item, index}: {item: any; index: number}) => {
    return (
      <Post
        navigate={true}
        key={item._id}
        index={index}
        post={{
          ...item,
          name: community!.name,
          profile: community!.image,
          communityId: community!._id,
        }}
      />
    );
  };

  return (
    <View style={styles.main}>
      <BackTitleHeader title={community!.name} />
      <PaginatedList
        onPageChange={async (page: number) => {
          return await communityPostsPageChange(community!._id, 10, page);
        }}
        refreshAction={() => getCommunityPostsHandler(10, 1)}
        Header={
          <>
            <View style={styles.container}>
              <View style={styles.communityHeader}>
                <View>
                  <Image
                    source={{uri: community!.image}}
                    style={styles.communityHeaderImage}
                  />

                  {community!.admin === userProfile?.phoneNo && (
                    <AdminSettings />
                  )}
                </View>
                <View style={styles.titleDesc}>
                  <Text style={styles.communityDetailsTitle}>
                    {community!.name}
                  </Text>
                  <Text style={styles.communityDetailsDescription}>
                    {descReadMore
                      ? community!.description
                      : community!.description.length < 80
                      ? community!.description
                      : community!.description.substring(0, 80) + '...'}
                    {community!.description.length > 80 && (
                      <Text
                        onPress={() => setDescReadMore(!descReadMore)}
                        style={styles.readMoreToggle}>
                        {descReadMore ? 'Read Less' : 'Read More'}
                      </Text>
                    )}
                  </Text>
                  <Text style={styles.communityDetailsDescription}>
                    {community!.postCount} Posts · {community!.memberCount}{' '}
                    Members
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.divider} />
          </>
        }
        data={posts}
        renderItem={renderPost}
      />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CreatePost', {
            name: 'Create Community Post',
            community: community!.name,
            communityId: community!._id,
          })
        }
        style={styles.createPost}>
        <Icon style={styles.createPostIcon} name="add-outline" />
      </TouchableOpacity>
    </View>
  );
};

export default CommunityPage;
