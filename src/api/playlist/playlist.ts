import axios from 'axios';
import http, {jw, server} from '../http';

export const getPlaylist = async (id: string) => {
  const {data} = await http.get(`${jw}/playlists/${id}`);
  return data;
};

export const getPlaylists = async () => {
  const {data} = await http.get(`${server}/playlists`);
  return data;
};

export const searchMedia = async (
  query: string,
  tag: string,
  page: number,
  pageLength: number,
) => {
  const {data} = await http.get(
    `${server}/jwp/search-media?title=${query}&tags=${tag}&page=${page}&pageLength=${pageLength}`,
  );
  const media = await Promise.all(
    data.media.map((item: any) => getMedia(item.id)),
  );
  console.log(media);
  const results = media.map((item, i) => (data.media[i] = item.playlist[0]));
  return results;
};

export const getMedia = async (mediaId: string) => {
  const {data} = await axios.get(
    `https://cdn.jwplayer.com/v2/media/${mediaId}`,
  );
  return data;
};
