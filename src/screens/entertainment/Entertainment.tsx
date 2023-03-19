import React, {useEffect} from 'react';
import Carousel from 'react-native-snap-carousel-v4';
import ViewWrapper from '../../components/wrappers/ViewWrapper';
import SportScreen from '../sports/SportScreen';
import SportsHeader from '../sports/widgets/SportsHeader';
import movies_one from '../../assets/images/movies_one.jpeg';
import movies_two from '../../assets/images/movies_two.jpeg';
import movies_three from '../../assets/images/movies_three.jpeg';
import {Image} from 'react-native';
import {width} from '../../constants/dimensions';
import {px4, py1} from '../../constants/spacing';
import {getEntertainmentScreenHandler} from '../../handlers/entertainment/entertainment';
import useEntertainmentStore from '../../store/entertainmentStore';
import AdBanner from '../../components/ad_banner/AdBanner';

const Entertainment = () => {
  const {screen} = useEntertainmentStore();
  const entertainment = {
    _id: screen?._id,
    name: 'movies',
    icon: 'https://amuzi-s3-bucket.s3.ap-south-1.amazonaws.com/screens-icon/636f674d69e3f7f4f7b12e50/919d8d77-1ec0-4b5e-9973-a0a0aa68f6d71668245325528?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYPSVKUOEJER4M2DE%2F20230219%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230219T132419Z&X-Amz-Expires=300&X-Amz-Signature=86dc57e918533122346092b3d20177a444d89c1cb0d03a8470aed930d912c249&X-Amz-SignedHeaders=host',
    colorScheme: '#ffffff',
    playlists: screen?.playlists ? screen.playlists : [],
    live: true,
    position: 0,
    searchTag: screen?.searchTag,
  };

  useEffect(() => {
    (async function () {
      await getEntertainmentScreenHandler();
    })();
  }, []);

  return (
    <ViewWrapper>
      <SportsHeader />
      <SportScreen sport={entertainment} />
    </ViewWrapper>
  );
};

export default Entertainment;
