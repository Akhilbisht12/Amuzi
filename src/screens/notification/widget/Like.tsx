import {Image, StyleSheet, Text, View} from 'react-native';
import {iLikeNotification} from '../../../types/notifications/notifications';
import {width} from '../../../constants/dimensions';
import React from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import globalStyles from '../../../styles/globals';
import {px1, px2, pyh} from '../../../constants/spacing';
import Avatar from '../../../components/avatar/Avatar';

type Props = {
  notification: iLikeNotification;
};
dayjs.extend(relativeTime);
const Like = ({notification}: Props) => {
  let statement = '';
  if (notification.recentUpvote.length === 1) {
    statement = `${notification.recentUpvote[0].name} liked your post.`;
  } else if (notification.upvoteCount === 2) {
    statement = `${notification.recentUpvote[0].name} and ${notification.recentUpvote[1].name} liked your post.`;
  } else {
    statement = `${notification.recentUpvote[0].name}, ${
      notification.recentUpvote[1].name
    } and ${notification.upvoteCount - 2} ${
      notification.upvoteCount - 2 > 1 ? 'others' : 'other'
    } liked your post.`;
  }
  return (
    <View style={styles.list}>
      <View style={styles.avatarView}>
        {notification.recentUpvote.map((voter, index) => {
          return voter.image ? (
            <Image
              key={index}
              style={[styles.avatar, {left: 0.04 * width * index}]}
              source={{uri: voter.image}}
            />
          ) : (
            <View
              style={{
                position: 'absolute',
                left: 0.04 * width * index,
                zIndex: -1 * index,
              }}>
              <Avatar scale={0.08} />
            </View>
          );
        })}
      </View>
      <View style={styles.notificationText}>
        <Text style={[globalStyles.textLight]}>{statement}</Text>
        <Text style={globalStyles.lightLabel}>
          {dayjs(notification.createdAt).fromNow()}
        </Text>
      </View>
      {notification.image && (
        <View>
          <Image style={styles.postImage} source={{uri: notification.image}} />
        </View>
      )}
    </View>
  );
};

export default Like;

const styles = StyleSheet.create({
  avatarView: {
    width: 0.12 * width,
    height: 0.08 * width,
    position: 'relative',
  },
  avatar: {
    width: 0.08 * width,
    height: 0.08 * width,
    borderRadius: 0.05 * width,
    position: 'absolute',
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: pyh,
    justifyContent: 'space-between',
  },
  postImage: {
    width: 0.11 * width,
    height: 0.11 * width,
    marginHorizontal: px1,
    resizeMode: 'cover',
    borderRadius: 4,
  },
  notificationText: {
    width: 0.65 * width,
    paddingHorizontal: px2,
  },
});
