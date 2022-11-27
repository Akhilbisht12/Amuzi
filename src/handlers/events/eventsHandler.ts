import {getEvents} from '../../api/events/events.api';
import useLiveStore from '../../store/liveStore';

export const GetEventHandler = async () => {
  const {setEvents} = useLiveStore.getState();
  const events = await getEvents();
  setEvents(events);
};
