import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ViewWrapper from '../../components/wrappers/ViewWrapper';
import {px4, py1} from '../../constants/spacing';
import {black, white} from '../../constants/colors';
import {md, medium} from '../../constants/fonts';
import NewsHeroCard, {news} from './widgets/NewsHeroCard';
import MediaSlider from '../sports/widgets/MediaSlider';
import NewsCard from './widgets/NewsCard';

const newsHead = [
  {
    badgeText: '#Top News',
    title:
      'Rumours about Barcelona return for Lionel Messi shut down by Argentine’s camp',
    creatorName: 'Soccer News',
    creatorImage:
      'https://images.unsplash.com/photo-1659893982154-d4f9a9f0922e',
    time: '1 hour ago',
    image: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c',
  },
  {
    badgeText: '#Top News',
    title:
      'Rumours about Barcelona return for Lionel Messi shut down by Argentine’s camp',
    creatorName: 'Soccer News',
    creatorImage:
      'https://images.unsplash.com/photo-1659893982154-d4f9a9f0922e',
    time: '1 hour',
    image: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c',
  },
  {
    badgeText: '#Top News',
    title:
      'Rumours about Barcelona return for Lionel Messi shut down by Argentine’s camp',
    creatorName: 'Soccer News',
    creatorImage:
      'https://images.unsplash.com/photo-1659893982154-d4f9a9f0922e',
    time: '1 hour ago',
    image: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c',
  },
  {
    badgeText: '#Top News',
    title:
      'Rumours about Barcelona return for Lionel Messi shut down by Argentine’s camp',
    creatorName: 'Soccer News',
    creatorImage:
      'https://images.unsplash.com/photo-1659893982154-d4f9a9f0922e',
    time: '1 hour',
    image: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c',
  },
];

const Xclusive = () => {
  const renderNewsHero = ({item, index}: {item: news; index: number}) => {
    return <NewsHeroCard news={item} index={index} />;
  };
  const renderNews = ({item}: {item: news}) => {
    return <NewsCard news={item} />;
  };
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Amuzi Xclusive</Text>
      </View>
      <ViewWrapper>
        <FlatList
          style={styles.heroSlider}
          renderItem={renderNewsHero}
          horizontal
          data={newsHead}
        />
        <MediaSlider playlistId="pqZLtwsU" />
        <FlatList
          style={styles.newsList}
          renderItem={renderNews}
          data={newsHead}
        />
        <MediaSlider playlistId="pqZLtwsU" />
      </ViewWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
  },
  header: {
    paddingHorizontal: px4,
    paddingVertical: py1,
  },
  headerText: {
    color: white,
    fontSize: md,
    fontFamily: medium,
  },
  heroSlider: {
    marginVertical: py1,
  },
  newsList: {
    marginVertical: py1,
    paddingHorizontal: px4,
  },
});

export default Xclusive;
