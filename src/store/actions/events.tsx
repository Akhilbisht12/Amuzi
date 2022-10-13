import {event} from '../../types/store';
import useStore from '../store';

const eventActions: event = {
  communityCreate: false,
  setCommunityCreate: (value: boolean) => {
    useStore.setState({communityCreate: value});
  },
};
export default eventActions;
