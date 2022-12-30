import {iChatRoom} from '../../types/store/live';
import http, {server} from '../http';

export const getJoinedRooms = async (eventId: string) => {
  const {data} = await http.get(`${server}/watch-party/rooms/${eventId}`);
  return data;
};

export const createRoom = async (
  roomName: string,
  eventId: string,
): Promise<iChatRoom> => {
  const {data} = await http.post(`${server}/watch-party/room/${eventId}`, {
    roomName,
  });
  return data as iChatRoom;
};

export const joinRoom = async (roomId: string, eventId: string) => {
  const {data} = await http.post(
    `${server}/watch-party/join/${eventId}/${roomId}`,
  );
  console.log(data);
  return data;
};
