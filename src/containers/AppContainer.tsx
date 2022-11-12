import React from 'react';
import Storage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import Authenticated from './routes/Authenticated';
import ProfileSetup from './routes/ProfileSetup';
import Unauthenticated from './routes/Unauthenticated';
import useStore from '../store/store';
import {getProfile} from '../api/profile/profile.api';

const AppContainer = () => {
  // Storage.clear();
  const {userState, setUserState, setUser, setAccess} = useStore();

  useEffect(() => {
    const getUser = async () => {
      const access = await Storage.getItem('access');
      if (!access) {
        setUserState('loggedOut');
        return;
      }
      if (access) {
        setAccess(access);
        const user = await getProfile();
        if (user.onboarded) {
          setUser(user);
          setUserState('onBoarded');
        } else {
          setUser(user);
          setUserState('loggedIn');
        }
      }
    };
    getUser();
  }, [setUser, setUserState, setAccess]);

  console.log(userState);

  if (userState === 'loggedIn') {
    return <ProfileSetup />;
  } else if (userState === 'onBoarded') {
    return <Authenticated />;
  } else {
    return <Unauthenticated />;
  }
};

export default AppContainer;
