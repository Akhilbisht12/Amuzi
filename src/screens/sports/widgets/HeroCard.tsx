import {Text, ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import {PLAYLIST_MEDIA} from '../../../types/content/playlist';
import {px3} from '../../../constants/spacing';
import {width} from '../../../constants/dimensions';
import {white} from '../../../constants/colors';
import {medium} from '../../../constants/fonts';

const HeroCard = ({media}: {media: PLAYLIST_MEDIA}) => {
  return (
    <ImageBackground
      borderRadius={10}
      style={styles.main}
      source={{uri: media.images[0].src}}>
      <Text style={styles.title}>{media.title}</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  main: {
    height: (0.9 * width) / 1.8,
    width: 0.85 * width,
    resizeMode: 'cover',
    marginRight: px3,
  },
  title: {
    color: white,
    position: 'absolute',
    fontFamily: medium,
    bottom: 15,
    left: 15,
    width: 0.83 * width,
  },
});
export default HeroCard;