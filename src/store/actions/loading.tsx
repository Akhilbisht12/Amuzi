import {user} from '../../types/store/store';
import useStore from '../store';

const userActions: user = {
  userState: 'loggedOut',
  setUser: state => {
    useStore.setState({
      userState: state,
    });
  },
};
export default userActions;
