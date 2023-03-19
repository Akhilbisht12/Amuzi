import {getEntertainmentScreen} from '../../api/entertainment/entertainment';
import useEntertainmentStore from '../../store/entertainmentStore';

export const getEntertainmentScreenHandler = async () => {
  const {setScreen} = useEntertainmentStore.getState();
  const screen = await getEntertainmentScreen();
  setScreen(screen);
};
