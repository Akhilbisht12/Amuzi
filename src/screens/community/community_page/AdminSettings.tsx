import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {black, grayLight, green, white} from '../../../constants/colors';
import RBSheet from 'react-native-raw-bottom-sheet';
import {sm, xs} from '../../../constants/fonts';
import {px2, px4, px6, py1} from '../../../constants/spacing';
import {useNavigation} from '@react-navigation/native';

const AdminSettings = () => {
  const adminSheet = useRef<RBSheet | null>(null);
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => adminSheet.current?.open()}>
        <Icon name="settings" color={white} size={30} />
      </TouchableOpacity>
      <RBSheet height={150} ref={adminSheet}>
        <View style={{backgroundColor: black, flex: 1, padding: px4}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileSettings')}
            style={styles.editCardActionView}>
            <Icon
              style={styles.editCardActionIcon}
              color={white}
              size={30}
              name="image"
            />
            <View>
              <Text style={styles.editCardActionHeading}>Change Profile</Text>
              <Text style={styles.editCardActionPara}>
                Tap to edit community profile
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Approvals')}
            style={styles.editCardActionView}>
            <Icon
              style={styles.editCardActionIcon}
              color={white}
              size={30}
              name="edit"
            />
            <View>
              <Text style={styles.editCardActionHeading}>Post Approvals</Text>
              <Text style={styles.editCardActionPara}>
                Tap to change community description
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  editCardAction: {
    paddingHorizontal: px4,
  },
  editCardActionView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: py1,
  },
  editCardActionIcon: {
    fontSize: 30,
    color: white,
    marginRight: px2,
  },
  editCardActionHeading: {
    color: white,
    fontSize: sm,
  },
  editCardActionPara: {
    color: grayLight,
    fontSize: xs,
  },
  button: {
    position: 'absolute',
    bottom: -15,
    right: 10,
    backgroundColor: green,
    padding: px2,
    borderRadius: px6,
  },
});
export default AdminSettings;
