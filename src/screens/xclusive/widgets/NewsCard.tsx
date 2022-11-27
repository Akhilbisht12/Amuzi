import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {width} from '../../../constants/dimensions';
import {px1, px2, px3, px4, py1, pyh} from '../../../constants/spacing';
import {gray, grayLight, white} from '../../../constants/colors';
import {medium, nm, sm, xs} from '../../../constants/fonts';
import {iXclusivePost} from '../../../types/store/xclusiveStore';

export type news = {
  badgeText: string;
  title: string;
  creatorName: string;
  creatorImage: string;
  time: string;
  image: string;
};

const NewsCard = ({post, index}: {post: iXclusivePost; index: number}) => {
  return (
    <View style={[styles.main]}>
      <View style={styles.newsInfo}>
        <Image style={styles.image} source={{uri: post.image}} />
        <View>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.content}>
            {post.content.substring(0, 120)}..<Text>Read More</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    marginVertical: pyh,
    backgroundColor: gray,
    paddingVertical: px2,
    paddingHorizontal: px4,
  },
  newsInfo: {
    flexDirection: 'row',
  },
  image: {
    width: 0.2 * width,
    height: 0.2 * width,
    borderRadius: px1,
    marginRight: px2,
  },

  title: {
    color: white,
    fontSize: nm,
    fontFamily: medium,
    width: 0.7 * width,
  },
  content: {
    fontSize: xs,
    color: white,
    width: 0.7 * width,
  },
});

export default NewsCard;
