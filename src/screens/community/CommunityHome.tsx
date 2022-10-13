import {View, Text} from 'react-native';
import React from 'react';
import CommunityHeader from '../../components/Headers/CommunityHeader';
import styles from './styles';
import Create from './widgets/Create';

const CommunityHome = () => {
  return (
    <View style={styles.main}>
      <CommunityHeader title="Community" />
      <Text>CommunityHome</Text>
      <Create />
    </View>
  );
};

export default CommunityHome;
