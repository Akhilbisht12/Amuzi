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
import {joinRoomHandler} from '../../handlers/watchParty/watchPartyHandler';

const JoinRoom = () => {
  const [roomId, setRoomId] = useState('');
  const {joinModalSheet, setJoinModalSheet, onLiveIndex, events} =
    useLiveStore();
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['10%', '20%'], []);

  const handleClose = () => {
    setJoinModalSheet(false);
    sheetRef.current?.close();
  };

  const joinRoom = async () => {
    if (onLiveIndex !== null) {
      await joinRoomHandler(roomId, events[onLiveIndex].id);
    }
  };
  useEffect(() => {
    if (joinModalSheet === true) {
      sheetRef.current?.snapToIndex(1);
    }
  }, [joinModalSheet]);

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
          <Text style={[globalStyles.textHeading]}>Join Room</Text>

          <TextInput
            value={roomId}
            onChangeText={text => setRoomId(text)}
            style={styles.input}
            placeholder="Enter Room Id"
            placeholderTextColor={white}
          />
          <TouchableOpacity onPress={joinRoom} style={globalStyles.button}>
            <Text style={globalStyles.buttonText}>Join</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
      {joinModalSheet === true && (
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

export default JoinRoom;
