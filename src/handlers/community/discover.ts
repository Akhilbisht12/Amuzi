import {discoverCommunities} from '../../api/community/community.api';
import useCommunityStore from '../../store/communityStore';

export const getDiscoverCommunitiesHandler = async (
  pageLength: number,
  page: number,
) => {
  const {setDiscoverCommunities} = useCommunityStore.getState();
  const data = await discoverCommunities(pageLength, page);
  setDiscoverCommunities(data);
};

export const discoverCommunitiesPageChange = async (
  pageLength: number,
  page: number,
) => {
  const store = useCommunityStore.getState();
  const data = await discoverCommunities(pageLength, page);
  store.setDiscoverCommunities([...store.discoverCommunities, ...data]);
  return data.length;
};
