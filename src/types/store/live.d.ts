export interface iLive {
  id: string;
  title: string;
  description: string;
  eventType: string;
  channel: string;
  state: number;
  stateString: 'PRE_LIVE' | 'LIVE_UNPUBLISHED' | 'LIVE_PUBLISHED';
  thumbnailUrl: string;
  startLiveAt: string;
  endLiveAt: string;
  streamingUrls: {
    HLS: string;
    DASH: string;
    HSS: string;
  };
  price: number;
}

export interface iChatRoom {
  _id: string;
  roomName: string;
  eventId: string;
  createdBy: number;
  memberCount: number;
}

export interface iLiveStore {
  events: iLive[];
  setEvents: (events: iLive[]) => void;
  chatRooms: iChatRoom[];
  setChatRooms: (rooms: iChatRoom[]) => void;
  createModalSheet: boolean;
  setCreateModalSheet: (value: boolean) => void;
  joinModalSheet: boolean;
  setJoinModalSheet: (value: boolean) => void;
  onLiveIndex: number | null;
  setOnLiveIndex: (index: number) => void;
}
