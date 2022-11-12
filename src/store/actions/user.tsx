import {user} from '../../types/store/store';
import useStore from '../store';

const userActions: user = {
  userState: 'loggedOut',
  setUserState: state => {
    useStore.setState({
      userState: state,
    });
  },
  access: undefined,
  setAccess: (access: string) => {
    useStore.setState({access});
  },
  userProfile: undefined,
  setUser: state => {
    useStore.setState({
      userProfile: state,
    });
  },
  changeUserProfileImage: url => {
    useStore.setState({
      userProfile: {...useStore.getState().userProfile, image: url},
    });
  },
};
export default userActions;
