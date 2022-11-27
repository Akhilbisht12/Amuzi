import {getCategories, getXclusivePosts} from '../../api/xclusive/xclusive.api';
import useXclusiveStore from '../../store/xclusiveStore';

export const GetXclusiveCategories = async () => {
  const {setCategories} = useXclusiveStore.getState();
  const categories = await getCategories();
  setCategories(categories);
};

export const GetXclusivePosts = async () => {
  const {selectedCategory, selectedSubCategories, setPosts} =
    useXclusiveStore.getState();
  const posts = await getXclusivePosts(
    1,
    10,
    selectedCategory,
    selectedSubCategories,
  );
  setPosts(posts);
};
