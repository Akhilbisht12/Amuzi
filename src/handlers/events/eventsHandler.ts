import {getEvents} from '../../api/events/events.api';
import {getProfile} from '../../api/profile/profile.api';
import useLiveStore from '../../store/liveStore';
import useStore from '../../store/store';

export const GetEventHandler = async () => {
  const {setEvents} = useLiveStore.getState();
  const {setUser} = useStore.getState();
  const user = await getProfile();
  const events = await getEvents();
  setUser(user);
  setEvents(events);
};
