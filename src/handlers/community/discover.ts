import {discoverCommunities} from '../../api/community/community.api';
import useCommunityStore from '../../store/communityStore';

export const getDiscoverCommunitiesHandler = async () => {
  const {setDiscoverCommunities} = useCommunityStore.getState();
  const data = await discoverCommunities();
  setDiscoverCommunities(data);
};
