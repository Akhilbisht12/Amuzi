import {View, Image, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommunityStack} from '../../../containers/routes/authenticated/community/CommunityRoutes';
import styles from './styles';
import BackTitleHeader from '../../../components/Headers/BackTitleHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import {getCommunityPosts} from '../../../api/community/community.api';
import Post from '../widgets/PostCard';
import useStore from '../../../store/store';
import AdminSettings from './AdminSettings';
import ViewWrapper from '../../../components/wrappers/ViewWrapper';
import {py4} from '../../../constants/spacing';
import useCommunityStore from '../../../store/communityStore';

type Props = NativeStackScreenProps<CommunityStack, 'CommunityPage'>;

const CommunityPage = ({navigation}: Props) => {
  const {userProfile} = useStore();
  const {posts, setPosts, community} = useCommunityStore();
  const [skip, setSkip] = useState(0);
  const [descReadMore, setDescReadMore] = useState(false);

  const getCommunityPostsHandler = async () => {
    try {
      const response = await getCommunityPosts(community!._id, skip);
      setPosts([...response]);
    } catch (error) {}
  };

  useEffect(() => {
    getCommunityPostsHandler();
  }, []);

  const renderPost = ({item, index}: {item: any; index: number}) => {
    console.log(index);
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
      <ViewWrapper refreshAction={() => getCommunityPostsHandler()}>
        <FlatList
          ListHeaderComponent={() => (
            <>
              <View style={styles.container}>
                <View style={styles.communityHeader}>
                  <View>
                    <Image
                      source={{uri: community!.image}}
                      style={styles.communityHeaderImage}
                    />
                    <Text style={styles.communityDetailsCategory}>
                      {community!.category}
                    </Text>

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
          )}
          data={posts}
          keyExtractor={item => item._id}
          renderItem={renderPost}
        />
        <View style={{paddingVertical: py4}} />
      </ViewWrapper>
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
