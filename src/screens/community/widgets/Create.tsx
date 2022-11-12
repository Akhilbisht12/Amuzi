import {View, Text, Animated, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef} from 'react';
import AddPerson from '../../../assets/icons/AddPerson';
import CreateOutline from '../../../assets/icons/Create';
import {blackLight, gray, grayLight, white} from '../../../constants/colors';
import {px2, px3, px4, px7} from '../../../constants/spacing';
import {medium, nm, xs2} from '../../../constants/fonts';
import useStore from '../../../store/store';
import {height, width} from '../../../constants/dimensions';
import {useNavigation} from '@react-navigation/native';

const Create = () => {
  const {communityCreate, setCommunityCreate} = useStore();
  const position = useRef(new Animated.Value(-width / 2)).current;
  const navigation = useNavigation();
  useEffect(() => {
    if (communityCreate === true) {
      Animated.timing(position, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else if (communityCreate === false) {
      Animated.timing(position, {
        toValue: -width / 2,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [communityCreate, position]);
  return (
    <>
      <TouchableOpacity
        onPress={() => setCommunityCreate(false)}
        style={[styles.backdrop, communityCreate ? {} : {display: 'none'}]}
      />
      <Animated.View
        style={[{bottom: position, position: 'absolute', zIndex: 10}]}>
        <View style={styles.main}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CreateCommunity', {name: 'Create Community'})
            }>
            <View style={styles.createView}>
              <View style={styles.iconView}>
                <AddPerson />
              </View>
              <View style={styles.textView}>
                <Text style={styles.createHeading}>Create a Community</Text>
                <Text style={styles.createDesc}>
                  Create a public community, Your 500 Amuzi Coins will be
                  deducted
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.createView}>
            <View style={styles.iconView}>
              <CreateOutline />
            </View>
            <View style={styles.textView}>
              <Text style={styles.createHeading}>Create a Post</Text>
              <Text style={styles.createDesc}>
                Post in a community that you’ve joined
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    width: width,
    height: height,
    backgroundColor: `${gray}50`,
    position: 'absolute',
  },
  main: {
    padding: px2,
    backgroundColor: blackLight,
    borderTopRightRadius: px4,
    borderTopLeftRadius: px4,
    width: width,
  },
  createView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: px3,
  },
  iconView: {
    backgroundColor: gray,
    padding: px3,
    borderRadius: px7,
    marginRight: px4,
    justifyContent: 'center',
  },
  textView: {
    flexGrow: 1,
  },
  createHeading: {
    color: white,
    fontSize: nm,
    fontFamily: medium,
  },
  createDesc: {
    color: grayLight,
    fontSize: xs2,
    flexWrap: 'wrap',
    width: 0.75 * width,
  },
});

export default Create;
