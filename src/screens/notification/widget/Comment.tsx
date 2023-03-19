import {Image, StyleSheet, Text, View} from 'react-native';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import {iCommentNotification} from '../../../types/notifications/notifications';
import {width} from '../../../constants/dimensions';
import React from 'react';
import globalStyles from '../../../styles/globals';
import {px1, px2, pyh} from '../../../constants/spacing';
import {gray, grayLight} from '../../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  notification: iCommentNotification;
};
dayjs.extend(relativeTime);
const CommentNotification = ({notification}: Props) => {
  return (
    <View style={styles.list}>
      <View style={styles.avatarView}>
        <Image
          style={[styles.avatar]}
          source={{uri: notification.comment.author.image}}
        />
        {notification.comment.author.image ? (
          <Image
            style={styles.headerImage}
            source={{uri: notification.comment.author.image}}
          />
        ) : (
          <View style={styles.headerImage}>
            <Icon name="person" color={grayLight} size={40} />
          </View>
        )}
      </View>
      <View style={styles.notificationText}>
        <Text style={[globalStyles.textLight]}>
          {notification.comment.author.name} commented{': '}
          {notification.comment.content}
        </Text>
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

export default CommentNotification;

const styles = StyleSheet.create({
  avatarView: {
    width: 0.12 * width,
    height: 0.08 * width,
  },
  avatar: {
    width: 0.11 * width,
    height: 0.11 * width,
    borderRadius: 0.052 * width,
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: pyh,
    justifyContent: 'space-between',
    flex: 1,
  },
  headerImage: {
    width: 0.12 * width,
    height: 0.12 * width,
    marginRight: px2,
    borderRadius: 0.15 * width,
    resizeMode: 'contain',
    backgroundColor: gray,
    alignItems: 'center',
    justifyContent: 'center',
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
