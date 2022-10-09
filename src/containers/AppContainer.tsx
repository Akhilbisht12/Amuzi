import React from 'react';
import Storage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import Authenticated from './routes/Authenticated';
import ProfileSetup from './routes/ProfileSetup';
import Unauthenticated from './routes/Unauthenticated';
import useStore from '../store/store';

const AppContainer = () => {
  // Storage.clear();

  const {userState, setUser} = useStore();

  useEffect(() => {
    const getUser = async () => {
      try {
        const access = await Storage.getItem('access');
        const onBoardedValue = await Storage.getItem('onBoarded');
        let onBoarded;
        if (onBoardedValue) {
          onBoarded = JSON.parse(onBoardedValue);
        }
        if (access && onBoarded) {
          setUser('onBoarded');
        } else if (access && !onBoarded) {
          setUser('loggedIn');
        } else {
          setUser('loggedOut');
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [setUser]);

  if (userState === 'loggedIn') {
    return <ProfileSetup />;
  } else if (userState === 'onBoarded') {
    return <Authenticated />;
  } else {
    return <Unauthenticated />;
  }
};

export default AppContainer;
