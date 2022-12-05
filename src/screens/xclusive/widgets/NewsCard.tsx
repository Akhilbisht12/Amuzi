import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {width} from '../../../constants/dimensions';
import {px1, px2, px3, pyh} from '../../../constants/spacing';
import {gray} from '../../../constants/colors';
import {iXclusivePost} from '../../../types/store/xclusiveStore';
import globalStyles from '../../../styles/globals';
import {medium} from '../../../constants/fonts';

export type news = {
  badgeText: string;
  title: string;
  creatorName: string;
  creatorImage: string;
  time: string;
  image: string;
};

const NewsCard = ({post}: {post: iXclusivePost; index: number}) => {
  return (
    <View style={[styles.main]}>
      <View style={styles.newsInfo}>
        <Image style={styles.image} source={{uri: post.image}} />
        <View style={{width: 0.65 * width}}>
          <Text style={[globalStyles.textHeading, {fontFamily: medium}]}>
            {post.title}
          </Text>
          {/* <Text style={globalStyles.textLight}>
            {post.content.substring(0, 120)}..<Text>Read More</Text>
          </Text> */}
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
    paddingHorizontal: px2,
    marginHorizontal: px3,
    borderRadius: px2,
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
});

export default NewsCard;
