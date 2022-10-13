import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
// import {useNavigation} from '@react-navigation/native';
import {bold, medium, nm} from '../../constants/fonts';
import {px4} from '../../constants/spacing';
import {height} from '../../constants/dimensions';
import {white} from '../../constants/colors';
import Add from '../../assets/icons/Add';
import SearchIco from '../../assets/icons/SearchIco';
import coin from '../../assets/icons/Coin.png';
import useStore from '../../store/store';
type Props = {
  title: string;
};
const CommunityHeader = ({title}: Props) => {
  // const navigation = useNavigation();
  const {setCommunityCreate} = useStore();
  return (
    <View style={styles.main}>
      <View style={styles.nameSection}>
        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={xl} style={styles.backIcon} />
        </TouchableOpacity> */}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => setCommunityCreate(true)}
          style={styles.icon}>
          <Add />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <SearchIco />
        </TouchableOpacity>
        <View style={styles.pointsView}>
          <TouchableOpacity style={styles.icon}>
            <Image source={coin} />
          </TouchableOpacity>
          <Text style={styles.pointsText}>1,450</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: px4,
    paddingTop: 0.06 * height,
    paddingBottom: 0.02 * height,
    borderBottomColor: 'black',
    borderBottomWidth: 0.3,
  },
  nameSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    color: white,
  },
  title: {
    color: white,
    fontSize: 18,
    // marginLeft: 30,
    fontFamily: bold,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    paddingHorizontal: 8,
  },
  pointsView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: nm,
    color: white,
    fontFamily: medium,
  },
});
export default CommunityHeader;
