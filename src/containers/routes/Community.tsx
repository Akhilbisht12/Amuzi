import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CommunityHome from '../../screens/community/CommunityHome';
import CreateCommunity from '../../screens/community/create_community/CreateCommunity';
import Discover from '../../screens/community/discover/Discover';
import CommunityPage from '../../screens/community/community_page/CommunityPage';
import Post from '../../screens/community/post/Post';
import {COMMENT} from '../../types/community/post';
import Reply from '../../screens/community/post/widgets/Replies';
import CreatePost from '../../screens/community/create_post/CreatePost';

type name = {
  name: string;
};

export interface CommunityStack {
  CommunityHome: undefined;
  CreateCommunity: name;
  Discover: name;
  CommunityPage: {
    name: string;
    item: {
      name: string;
      _id: string;
      image: string;
      description: string;
      members: number;
      category: string;
      memberCount: number;
      postCount: number;
    };
  };
  Post: {
    _id: string;
    community_id: string;
  };
  Reply: {
    comment: COMMENT;
  };
  CreatePost: {
    name: string;
    community: string;
    communityId: string;
  };
}

const Community = () => {
  const Stack = createNativeStackNavigator<CommunityStack>();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CommunityHome" component={CommunityHome} />
      <Stack.Screen name="CreateCommunity" component={CreateCommunity} />
      <Stack.Screen name="Discover" component={Discover} />
      <Stack.Screen name="CommunityPage" component={CommunityPage} />
      <Stack.Screen name="Post" component={Post} />
      <Stack.Screen name="Reply" component={Reply} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
    </Stack.Navigator>
  );
};

export default Community;
