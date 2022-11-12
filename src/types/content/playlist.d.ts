export interface PLAYLIST_MEDIA {
  title: string;
  mediaid: string;
  link: string;
  image?: string;
  images: {
    src: string;
    width: number;
    type: string;
  }[];
  feedid: string;
  duration: number;
  pubdate: number;
  description: string;
  sources?: {
    file: string;
    label?: string;
    default: false; // rnjwp
  }[];
  tracks: {
    file: string;
    kind: string;
  }[];

  variations: {};
}

export interface FEED {
  title: string;
  description: string;
  kind: string;
  feedid: string;
  links: {
    first: string;
    last: string;
  };
  playlist: PLAYLIST_MEDIA[];
  feed_instance_id: string;
}
