import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import ViewWrapper from '../../components/wrappers/ViewWrapper';
import useNotificationStore from '../../store/notificationStore';
import BackTitleHeader from '../../components/Headers/BackTitleHeader';
import {getNotificationHandler} from '../../handlers/notifications/notificationHandler';
import {NotificationType} from '../../types/notifications/notifications';
import Like from './widget/Like';
import CommentNotification from './widget/Comment';
import {px2, px4} from '../../constants/spacing';
import PostApproval from './widget/PostApproval';
import RewardNotification from './widget/Reward';
import CommunityApproveNotification from './widget/Community';
import useStore from '../../store/store';

const Notification = () => {
  const {notifications} = useNotificationStore();
  const {userProfile, setUser} = useStore();
  useEffect(() => {
    (async function () {
      await getNotificationHandler(10, 1);
      userProfile!.data.notificationFlag = false;
      setUser(userProfile!);
    })();
  }, []);
  console.log(notifications);
  return (
    <View style={styles.main}>
      <BackTitleHeader title="Notification" />
      <ViewWrapper refreshAction={() => getNotificationHandler(10, 1)}>
        <View style={styles.padded}>
          {notifications.map(notification => {
            if (notification.type === NotificationType.POST_LIKE) {
              return (
                <Like key={notification._id} notification={notification} />
              );
            } else if (notification.type === NotificationType.POST_COMMENT) {
              return (
                <CommentNotification
                  key={notification._id}
                  notification={notification}
                />
              );
            } else if (notification.type === NotificationType.POST_APPROVAL) {
              return (
                <PostApproval
                  notification={notification}
                  key={notification._id}
                />
              );
            } else if (notification.type === NotificationType.COINS_REWARD) {
              return (
                <RewardNotification
                  key={notification._id}
                  notification={notification}
                />
              );
            } else if (
              notification.type === NotificationType.COMMUNITY_APPROVAL
            ) {
              return (
                <CommunityApproveNotification
                  key={notification._id}
                  notification={notification}
                />
              );
            }
          })}
        </View>
      </ViewWrapper>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: px4,
    paddingVertical: px2,
  },
});
