import {
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {px3, px4, py1} from '../../../constants/spacing';
import {width} from '../../../constants/dimensions';
import {blue, red, white} from '../../../constants/colors';
import {medium} from '../../../constants/fonts';
import {iLive} from '../../../types/store/live';
import {useNavigation} from '@react-navigation/native';

const HeroCard = ({live, index}: {live: iLive; index: number}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={index === 0 && {marginLeft: px4}}
      onPress={() => navigation.navigate('sportsLive', {index: index})}>
      <ImageBackground
        borderRadius={15}
        style={styles.main}
        source={{uri: live.thumbnailUrl}}>
        <Text style={styles.title}>{live.title}</Text>
        <Text
          style={[
            styles.live,
            {backgroundColor: live.state === 2 ? red : blue},
          ]}>
          {live.state === 2 ? 'Live' : 'Upcoming'}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    height: (0.85 * width * 9) / 16,
    width: 0.85 * width,
    resizeMode: 'cover',
    marginRight: px3,
  },
  title: {
    color: white,
    position: 'absolute',
    fontFamily: medium,
    bottom: 15,
    left: 15,
    width: 0.83 * width,
  },
  live: {
    position: 'absolute',
    color: white,
    paddingHorizontal: px4,
    paddingVertical: py1,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
});
export default HeroCard;
