import {Image, Linking, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {getAdsHandler} from '../../handlers/advertisement/adHandler';
import Carousel from 'react-native-snap-carousel-v4';
import {px1, px2, px4, py1, py2, pyh} from '../../constants/spacing';
import {height, width} from '../../constants/dimensions';
import useAdStore from '../../store/adStore';
import {iAd} from '../../types/advertisment/advertisement';
import globalStyles from '../../styles/globals';
import {black, gray, yellow} from '../../constants/colors';

const AdBanner = () => {
  const {ads} = useAdStore();
  useEffect(() => {
    (async function () {
      await getAdsHandler();
    })();
  }, []);
  const _renderCard = ({item, dataIndex}: {item: iAd; dataIndex: number}) => {
    return (
      <TouchableOpacity
        onPress={() => Linking.openURL(item.redirectionUrl)}
        style={{borderRadius: px4, backgroundColor: gray}}>
        <Image
          style={{borderRadius: px4, width: 0.85 * width, height: 0.45 * width}}
          key={dataIndex}
          source={{uri: item.image}}
        />
        <View
          style={{
            paddingVertical: px2,
            paddingHorizontal: px4,
            height: 0.1 * height,
          }}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={[
                {
                  backgroundColor: yellow,
                  paddingHorizontal: px2,
                  borderRadius: px1,
                  marginRight: px1,
                },
              ]}>
              <Text style={[globalStyles.textSmallLight, {color: black}]}>
                Ad
              </Text>
            </View>

            <Text style={globalStyles.textHeading}>{item.title}</Text>
          </View>

          <Text style={globalStyles.textLight}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{marginTop: pyh, marginBottom: py2}}>
      <Carousel
        loop
        data={ads}
        renderItem={_renderCard}
        sliderWidth={width}
        itemWidth={0.85 * width}
        style={{marginVertical: py1}}
      />
    </View>
  );
};

export default AdBanner;
