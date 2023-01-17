import {Image, StyleSheet, Text, View} from 'react-native';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import {iPostApprovalNotification} from '../../../types/notifications/notifications';
import {width} from '../../../constants/dimensions';
import React from 'react';
import globalStyles from '../../../styles/globals';
import {px1, px2, pyh} from '../../../constants/spacing';

type Props = {
  notification: iPostApprovalNotification;
};
dayjs.extend(relativeTime);
const PostApproval = ({notification}: Props) => {
  return (
    <View style={styles.list}>
      <View style={styles.avatarView}>
        <Image
          style={[styles.avatar]}
          source={{uri: notification.community.image}}
        />
      </View>
      <View style={styles.notificationText}>
        <Text style={[globalStyles.textLight]}>
          Your post is approved by {notification.community.name}.
        </Text>
        <Text style={globalStyles.lightLabel}>
          {dayjs(notification.createdAt).fromNow()}
        </Text>
      </View>
      <View style={styles.postImage}>
        {notification.image && (
          <Image style={styles.postImage} source={{uri: notification.image}} />
        )}
      </View>
    </View>
  );
};

export default PostApproval;

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
