import {
  createRoom,
  getJoinedRooms,
  joinRoom,
} from '../../api/watchParty/watchParty';
import useLiveStore from '../../store/liveStore';

export const getJoinedRoomsHandler = async (eventId: string) => {
  const {setChatRooms} = useLiveStore.getState();
  const rooms = await getJoinedRooms(eventId);
  setChatRooms(rooms);
};

export const createRoomHandler = async (roomName: string, eventId: string) => {
  await createRoom(roomName, eventId);
  await getJoinedRooms(eventId);
};

export const joinRoomHandler = async (roomId: string, eventId: string) => {
  await joinRoom(roomId, eventId);
  await getJoinedRooms(eventId);
};
