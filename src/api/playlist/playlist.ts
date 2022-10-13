import http, {jw} from '../http';

export const getPlaylist = async (id: string) => {
  const {data} = await http.get(`${jw}/playlists/${id}`);
  return data;
};
