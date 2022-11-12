import {TouchableOpacity, View, Text, ScrollView} from 'react-native';
import React from 'react';
import CommunityHeader from '../../components/Headers/CommunityHeader';
import styles from './styles';
import Create from './widgets/Create';
import JoinedCommunitiesSlider from './widgets/JoinedCommunitiesSlider';
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {CommunityStack} from '../../containers/routes/Community';
import CreatedCommunities from './widgets/CreatedCommunities';

type Props = NativeStackScreenProps<CommunityStack, 'CommunityHome'>;

const CommunityHome = ({navigation}: Props) => {
  return (
    <View style={styles.main}>
      <ScrollView style={{flexGrow: 1}}>
        <CommunityHeader title="Community" />
        <View style={styles.container}>
          <View style={styles.discoverContainer}>
            <TouchableOpacity
              style={styles.discoverButton}
              onPress={() =>
                navigation.navigate('Discover', {name: 'Discover'})
              }>
              <Text style={styles.discoverText}>Discover</Text>
            </TouchableOpacity>
          </View>
        </View>
        <JoinedCommunitiesSlider />
        <CreatedCommunities />
      </ScrollView>
      <Create />
    </View>
  );
};

export default CommunityHome;
