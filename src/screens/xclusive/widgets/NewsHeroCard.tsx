import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {width} from '../../../constants/dimensions';
import {px1, px2, px3, px4, py1} from '../../../constants/spacing';
import {grayLight, green, white} from '../../../constants/colors';
import {medium, nm, sm} from '../../../constants/fonts';

export type news = {
  badgeText: string;
  title: string;
  creatorName: string;
  creatorImage: string;
  time: string;
  image: string;
};

const NewsHeroCard = ({news, index}: {news: news; index: number}) => {
  return (
    <View style={[styles.main, index === 0 && {marginLeft: px4}]}>
      <Image style={styles.image} source={{uri: news.image}} />
      <Text style={styles.badgeText}>{news.badgeText}</Text>
      <Text style={styles.title}>{news.title}</Text>
      <View style={styles.creatorView}>
        <View style={styles.creatorInfo}>
          <Image
            style={styles.creatorImage}
            source={{uri: news.creatorImage}}
          />
          <Text style={styles.creatorName}>{news.creatorName}</Text>
        </View>
        <View>
          <Text style={styles.date}>{news.time}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    marginRight: px3,
  },
  image: {
    width: 0.9 * width,
    height: 0.6 * width,
    borderRadius: px4,
  },
  badgeText: {
    color: white,
    position: 'absolute',
    backgroundColor: green,
    top: 10,
    left: 10,
    borderRadius: px1,
    paddingHorizontal: px2,
    paddingVertical: py1,
    fontSize: sm,
  },
  title: {
    color: white,
    fontSize: nm,
    fontFamily: medium,
    width: 0.9 * width,
  },
  creatorView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: py1,
  },
  creatorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creatorName: {
    color: white,
    fontSize: nm,
    fontFamily: medium,
  },
  creatorImage: {
    width: 0.1 * width,
    height: 0.1 * width,
    borderRadius: 0.05 * width,
    marginRight: px2,
  },
  date: {
    color: grayLight,
    fontSize: sm,
    fontFamily: medium,
  },
});

export default NewsHeroCard;
