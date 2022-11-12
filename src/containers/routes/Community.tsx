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
import CommunityTabs from './CommunityTabs';
import EditPost from '../../screens/community/post/EditPost';
import ProfileSettings from '../../screens/community/community_page/ProfileSettings';
import EditComment from '../../screens/community/post/widgets/EditComment';
import Approvals from '../../screens/community/community_page/Approvals';
import {COMMUNITY} from '../../types/community/community';

type name = {
  name: string;
};

export type CommunityStack = {
  CommunityHome: undefined;
  CreateCommunity: name;
  Discover: name;
  CommunityPage: {
    name: string;
    item: COMMUNITY;
    isAdmin?: boolean;
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
  EditPost: undefined;
  ProfileSettings: undefined;
  EditComment: {
    commentId: string;
    postId: string;
    communityId: string;
    comment: string;
  };
  Approvals: undefined;
};

const Community = () => {
  const Stack = createNativeStackNavigator<CommunityStack>();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CommunityHome" component={CommunityTabs} />
      <Stack.Screen name="CreateCommunity" component={CreateCommunity} />
      <Stack.Screen name="Discover" component={Discover} />
      <Stack.Screen name="CommunityPage" component={CommunityPage} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
      <Stack.Screen name="Approvals" component={Approvals} />
      <Stack.Screen name="Post" component={Post} />
      <Stack.Screen name="EditPost" component={EditPost} />
      <Stack.Screen name="Reply" component={Reply} />
      <Stack.Screen name="EditComment" component={EditComment} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
    </Stack.Navigator>
  );
};

export default Community;
