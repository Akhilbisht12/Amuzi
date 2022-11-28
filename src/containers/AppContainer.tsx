import React from 'react';
import Storage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import Authenticated from './routes/authenticated/Authenticated';
import ProfileSetup from './routes/unauthenticated/ProfileSetup';
import Unauthenticated from './routes/unauthenticated/Unauthenticated';
import useStore from '../store/store';
import {getProfile} from '../api/profile/profile.api';
import jwtDecode from 'jwt-decode';
import {GetWatchListHandler} from '../handlers/watchlist/watchListHandler';
import RNBootSplash from 'react-native-bootsplash';
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
        const {exp} = await jwtDecode(access);
        const expDate = new Date(1970, 0, 1);
        expDate.setSeconds(exp);
        if (expDate < Date.now()) {
          Storage.clear();
          setUserState('loggedOut');
          return;
        }
        setAccess(access);
        getProfile().then(user => {
          if (user.onboarded) {
            setUser(user);
            setUserState('onBoarded');
          } else {
            setUser(user);
            setUserState('loggedIn');
          }
        });
      }
    };
    getUser();
    if (userState === 'onBoarded') {
      GetWatchListHandler();
    }
  }, [setUser, setUserState, setAccess, userState]);

  if (userState !== null) RNBootSplash.hide({fade: true});

  if (userState === 'loggedIn') {
    return <ProfileSetup />;
  } else if (userState === 'onBoarded') {
    return <Authenticated />;
  } else if (userState === 'loggedOut') {
    return <Unauthenticated />;
  }
};

export default AppContainer;
