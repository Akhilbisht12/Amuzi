import {getNotification} from '../../api/notification/notification';
import useNotificationStore from '../../store/notificationStore';
export const getNotificationHandler = async (
  pageLength: number,
  page: number,
) => {
  const {setNotifications} = useNotificationStore.getState();
  const notifications = await getNotification(pageLength, page);
  setNotifications(notifications);
};
