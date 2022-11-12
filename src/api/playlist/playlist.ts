import http, {jw, server} from '../http';

export const getPlaylist = async (id: string) => {
  const {data} = await http.get(`${jw}/playlists/${id}`);
  return data;
};

export const getPlaylists = async () => {
  const {data} = await http.get(`${server}/playlists`);
  return data;
};
