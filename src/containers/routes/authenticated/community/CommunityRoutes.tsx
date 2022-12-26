import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateCommunity from '../../../../screens/community/create_community/CreateCommunity';
import CommunityPage from '../../../../screens/community/community_page/CommunityPage';
import Post from '../../../../screens/community/post/Post';
import {COMMENT} from '../../../../types/community/post';
import Reply from '../../../../screens/community/post/widgets/Replies';
import CreatePost from '../../../../screens/community/create_post/CreatePost';
import EditPost from '../../../../screens/community/post/EditPost';
import CommunitySettings from '../../../../screens/community/community_page/CommunitySettings';
import EditComment from '../../../../screens/community/post/widgets/EditComment';
import Approvals from '../../../../screens/community/community_page/Approvals';
import CommunityHome from '../../../../screens/community/Community';
import {NavigatorScreenParams} from '@react-navigation/native';
import {iCommunityTabs} from './CommunityTabs';
type name = {
  name: string;
};

export type CommunityStack = {
  CommunityHome: NavigatorScreenParams<iCommunityTabs>;
  CreateCommunity: name;
  CommunityPage: undefined;
  Post: {
    _id: string;
    community_id: string;
    index: number;
  };
  Reply: {
    parentIndex: number;
    postIndex: number;
  };
  CreatePost: {
    name: string;
    community: string;
    communityId: string;
  };
  EditPost: {
    postIndex: number;
  };
  ProfileSettings: undefined;
  EditComment: {
    commentId: string;
    postId: string;
    communityId: string;
    comment: string;
    postIndex: number;
  };
  Approvals: undefined;
};

const CommunityRoutes = () => {
  const Stack = createNativeStackNavigator<CommunityStack>();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CommunityHome" component={CommunityHome} />
      <Stack.Screen name="CreateCommunity" component={CreateCommunity} />
      <Stack.Screen name="CommunityPage" component={CommunityPage} />
      <Stack.Screen name="ProfileSettings" component={CommunitySettings} />
      <Stack.Screen name="Approvals" component={Approvals} />
      <Stack.Screen name="Post" component={Post} />
      <Stack.Screen name="EditPost" component={EditPost} />
      <Stack.Screen name="Reply" component={Reply} />
      <Stack.Screen name="EditComment" component={EditComment} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
    </Stack.Navigator>
  );
};

export default CommunityRoutes;
