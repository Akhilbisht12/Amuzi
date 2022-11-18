import {COMMUNITY} from '../../types/community/community';
import {COMMENT, POST} from '../../types/community/post';
import {event} from '../../types/store/store';
import useStore from '../store';

const eventActions: event = {
  sportScrollYOffset: 0,
  scrollUp: false,
  setSportScrollYOffset: value => {
    useStore.setState({
      sportScrollYOffset: value,
      scrollUp: useStore.getState().sportScrollYOffset > value ? false : true,
    });
  },
  communityCreate: false,
  community: null,
  setCommunity: (community: COMMUNITY) => {
    useStore.setState({community});
  },
  posts: [],
  setPosts: (posts: POST[]) => {
    useStore.setState({posts});
  },
  deleteStoragePost: (id: string) => {
    const posts = useStore.getState().posts;
    const index = posts.findIndex(item => item._id === id);
    posts.splice(index, 1);
    useStore.setState({posts});
  },
  postRefresh: true,
  createdRefresh: true,
  setCommunityCreate: (value: boolean) => {
    useStore.setState({communityCreate: value});
  },
  setPostRefresh: () => {
    useStore.setState({postRefresh: !useStore.getState().postRefresh});
  },
  setCreatedRefresh: () => {
    useStore.setState({createdRefresh: !useStore.getState().createdRefresh});
  },
  post: null,
  setPost: (post: POST) => {
    useStore.setState({post});
  },
  deleteStoreComment: (id: string) => {
    const post = useStore.getState().post;
    const index = post!.comments.findIndex((item: COMMENT) => item._id === id);
    post?.comments.splice(index, 1);
    useStore.setState({post});
  },
  editStoreComment: (id: string, content: string) => {
    const post = useStore.getState().post;
    const index = post!.comments.findIndex((item: COMMENT) => item._id === id);
    post!.comments[index].content = content;
    useStore.setState({post});
  },
  setCommunityImage: (url: string) => {
    const community = useStore.getState().community;
    community.image = url;
    useStore.setState({community});
  },
  approvalPosts: [],
  setApprovalPosts: posts => {
    useStore.setState({approvalPosts: posts});
  },
  updateApprovalPosts: id => {
    const posts = useStore.getState().approvalPosts;
    const index = posts!.findIndex(item => item._id === id);
    posts.splice(index, 1);
    useStore.setState({approvalPosts: posts});
  },
};
export default eventActions;
