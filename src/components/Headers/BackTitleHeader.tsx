import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './backHeader';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {nm, xl} from '../../constants/fonts';
type Props = {
  title: string;
};
const BackTitleHeader = ({title}: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-outline" size={xl} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default BackTitleHeader;
