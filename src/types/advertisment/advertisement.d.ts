export interface iAd {
  _id: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  redirectionUrl: string;
}

export interface iAdvertisementStore {
  ads: iAd[];
  setAds: (ads: iAd[]) => void;
}
