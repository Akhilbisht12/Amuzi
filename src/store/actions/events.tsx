import {event} from '../../types/store';
import useStore from '../store';

const eventActions: event = {
  communityCreate: false,
  postRefresh: true,
  setCommunityCreate: (value: boolean) => {
    useStore.setState({communityCreate: value});
  },
  setPostRefresh: () => {
    useStore.setState({postRefresh: !useStore.getState().postRefresh});
  },
};
export default eventActions;
