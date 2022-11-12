import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {width} from '../../../constants/dimensions';
import {px1, px2, px3, px4, py1} from '../../../constants/spacing';
import {gray, grayLight, white} from '../../../constants/colors';
import {medium, nm, sm} from '../../../constants/fonts';

export type news = {
  badgeText: string;
  title: string;
  creatorName: string;
  creatorImage: string;
  time: string;
  image: string;
};

const NewsCard = ({news}: {news: news}) => {
  return (
    <View style={[styles.main]}>
      <View style={styles.newsInfo}>
        <Image style={styles.image} source={{uri: news.image}} />
        <Text style={styles.title}>{news.title}</Text>
      </View>
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
    marginVertical: py1,
    backgroundColor: gray,
    padding: px2,
    borderRadius: px2,
  },
  newsInfo: {
    flexDirection: 'row',
  },
  image: {
    width: 0.2 * width,
    height: 0.2 * width,
    borderRadius: px4,
    marginRight: px4,
  },

  title: {
    color: white,
    fontSize: nm,
    fontFamily: medium,
    width: 0.6 * width,
  },
  creatorView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: py1,
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

export default NewsCard;
