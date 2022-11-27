import {View, StyleSheet} from 'react-native';
import React from 'react';
import CommunityHeader from '../../components/Headers/CommunityHeader';
import CommunityTabs from '../../containers/routes/authenticated/community/CommunityTabs';
import {black} from '../../constants/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommunityStack} from '../../containers/routes/authenticated/community/CommunityRoutes';
import Create from './widgets/Create';

type Props = NativeStackScreenProps<CommunityStack, 'CommunityHome'>;

const Community = ({}: Props) => {
  return (
    <View style={styles.main}>
      <CommunityHeader title="Communities" />
      <CommunityTabs />
      <Create />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
  },
});

export default Community;
