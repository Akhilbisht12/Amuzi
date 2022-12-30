import React, {useEffect, useRef, useState} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {useMemo} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import useLiveStore from '../../store/liveStore';
import {blackLight, gray, white} from '../../constants/colors';
import {px2, px4, py1} from '../../constants/spacing';
import globalStyles from '../../styles/globals';
import {createRoomHandler} from '../../handlers/watchParty/watchPartyHandler';

const CreateRoom = () => {
  const [roomName, setRoomName] = useState('');
  const {createModalSheet, setCreateModalSheet, onLiveIndex, events} =
    useLiveStore();
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['10%', '20%'], []);

  const handleClose = () => {
    setCreateModalSheet(false);
    sheetRef.current?.close();
  };

  const requestToCreateRoom = async () => {
    try {
      if (onLiveIndex !== null) {
        await createRoomHandler(roomName, events[onLiveIndex].id);
        setRoomName('');
      }
    } finally {
    }
  };

  useEffect(() => {
    if (createModalSheet === true) {
      sheetRef.current?.snapToIndex(1);
    }
  }, [createModalSheet]);

  return (
    <>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        index={-1}
        containerStyle={styles.modalContainer}
        handleIndicatorStyle={{backgroundColor: white}}
        backgroundStyle={{backgroundColor: blackLight}}>
        <View style={styles.container}>
          <Text style={[globalStyles.textHeading]}>Create New Room</Text>

          <TextInput
            value={roomName}
            onChangeText={text => setRoomName(text)}
            style={styles.input}
            placeholder="Room Name"
            placeholderTextColor={white}
          />
          <TouchableOpacity
            onPress={requestToCreateRoom}
            style={globalStyles.button}>
            <Text style={globalStyles.buttonText}>Create</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
      {createModalSheet === true && (
        <TouchableOpacity
          onPress={handleClose}
          style={StyleSheet.absoluteFill}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    zIndex: 10,
  },
  container: {
    paddingHorizontal: px4,
  },
  input: {
    backgroundColor: gray,
    borderRadius: px2,
    color: white,
    paddingHorizontal: px4,
    marginVertical: py1,
  },
});

export default CreateRoom;
