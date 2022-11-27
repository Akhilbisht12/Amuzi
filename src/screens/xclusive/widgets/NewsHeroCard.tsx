import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {height, width} from '../../../constants/dimensions';
import {px2, px4, px6, py1, pyh} from '../../../constants/spacing';
import {blackLight, grayLight, green, white} from '../../../constants/colors';
import {bold, medium, nm, regular, sm} from '../../../constants/fonts';
import {iXclusivePost} from '../../../types/store/xclusiveStore';
import useXclusiveStore from '../../../store/xclusiveStore';
import Icon from 'react-native-vector-icons/Ionicons';

export type news = {
  badgeText: string;
  title: string;
  creatorName: string;
  creatorImage: string;
  time: string;
  image: string;
};

const NewsHeroCard = ({post}: {post: iXclusivePost; index: number}) => {
  const {categories} = useXclusiveStore();

  return (
    <View style={[styles.main]}>
      <View style={styles.imageView}>
        {post.type === 'image' && (
          <Image style={styles.image} source={{uri: post?.image}} />
        )}
        {post.type === 'video' && (
          <View style={styles.imageView}>
            <Image
              style={styles.image}
              source={{uri: post.media?.playlist[0].image}}
            />
            <View style={styles.playBadge}>
              <Icon name="play" size={50} color={white} />
            </View>
          </View>
        )}
        <Text style={styles.badgeText}>
          {categories.find(item => item._id === post.category)?.name}
        </Text>
      </View>

      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content}>
        {post.content.substring(0, 120)}...
        <Text style={styles.readMore}> Read More</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: px4,
    marginVertical: py1,
  },
  imageView: {
    position: 'relative',
  },
  image: {
    width: 0.92 * width,
    height: 0.6 * width,
    borderRadius: px2,
    textAlign: 'center',
  },
  badgeText: {
    color: white,
    position: 'absolute',
    backgroundColor: green,
    top: 10,
    left: 10,
    borderRadius: px6,
    paddingHorizontal: px2,
    paddingVertical: py1,
    fontSize: sm,
  },
  playBadge: {
    position: 'absolute',
    right: 0.37 * width,
    top: 0.22 * width,
    backgroundColor: blackLight,
    borderRadius: 0.2 * width,
    height: 0.1 * height,
    width: 0.1 * height,
    padding: px2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: white,
    fontSize: nm,
    fontFamily: medium,
    width: 0.9 * width,
    marginVertical: pyh,
  },
  content: {
    fontSize: sm,
    color: grayLight,
    fontFamily: regular,
  },
  readMore: {
    color: white,
    fontFamily: bold,
  },
});

export default NewsHeroCard;
