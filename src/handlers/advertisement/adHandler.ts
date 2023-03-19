import useAdStore from '../../store/adStore';
import {getAds} from '../../api/advertisement/advertisement';

export const getAdsHandler = async () => {
  const {setAds} = useAdStore.getState();
  const data = await getAds();
  setAds(data);
};
