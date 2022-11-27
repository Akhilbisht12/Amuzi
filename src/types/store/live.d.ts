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
}

export interface iLiveStore {
  events: iLive[];
  setEvents: (events: iLive[]) => void;
}
