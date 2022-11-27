import {iXclusivePost} from '../../types/store/xclusiveStore';
import http, {server} from '../http';
import {getMedia} from '../playlist/playlist';

export const getCategories = async () => {
  const {data} = await http.get(`${server}/xclusive/categories`);
  return data;
};

export const getXclusivePosts = async (
  page: number,
  pageLength: number,
  category: string | null,
  subCategories: string[],
): Promise<iXclusivePost[]> => {
  const {data} = <{data: iXclusivePost[]}>await http.get(
    `${server}/xclusive/posts`,
    {
      params: {
        page,
        pageLength,
        category,
        subCategories: JSON.stringify(subCategories),
      },
    },
  );
  const media = await Promise.all(
    data.map(item => item.mediaId && getMedia(item.mediaId)),
  );
  let index = 0;
  data.forEach(item => {
    if (item.type === 'video') {
      item.media = media[index];
      index++;
    }
  });

  return data;
};
