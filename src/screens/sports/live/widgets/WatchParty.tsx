import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {getJoinedRoomsHandler} from '../../../../handlers/watchParty/watchPartyHandler';
import useLiveStore from '../../../../store/liveStore';
import ViewWrapper from '../../../../components/wrappers/ViewWrapper';
import {FlatList} from 'react-native-gesture-handler';
import {iChatRoom} from '../../../../types/store/live';
import globalStyles from '../../../../styles/globals';
import {px2, px4, py1, pyh} from '../../../../constants/spacing';
import {blackLight} from '../../../../constants/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {iChatRoomRoutes} from '../../../../containers/layout/WatchPartyRoutes';

type Props = NativeStackScreenProps<iChatRoomRoutes, 'joinedRooms'>;

const EmptyRooms = ({index}: {index: number}) => {
  const {setCreateModalSheet, setJoinModalSheet, setOnLiveIndex} =
    useLiveStore();
  const openCreateSheet = () => {
    setOnLiveIndex(index);
    setCreateModalSheet(true);
  };
  const openJoinSheet = () => {
    setOnLiveIndex(index);
    setJoinModalSheet(true);
  };
  return (
    <View style={styles.emptyRooms}>
      <TouchableOpacity onPress={openCreateSheet} style={[globalStyles.button]}>
        <Text style={[globalStyles.buttonText]}>Create Room</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={openJoinSheet}
        style={[globalStyles.buttonLight]}>
        <Text style={[globalStyles.buttonLightText]}>Join Room</Text>
      </TouchableOpacity>
    </View>
  );
};

const WatchParty = ({route, navigation}: Props) => {
  const {events, chatRooms} = useLiveStore();
  const {eventIndex} = route.params;

  const renderRoom = ({item, index}: {item: iChatRoom; index: number}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('chatRoom', {eventIndex, roomIndex: index})
        }
        style={styles.roomContainer}>
        <Text style={globalStyles.textLight}>{item.roomName}</Text>
        <Text style={globalStyles.flag}>
          Active Members : {item.memberCount}
        </Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    (async function () {
      await getJoinedRoomsHandler(events[eventIndex].id);
    })();
  }, [events, eventIndex]);
  return (
    <ViewWrapper>
      <FlatList
        contentContainerStyle={styles.roomScroll}
        ListHeaderComponentStyle={{marginVertical: py1}}
        ListHeaderComponent={() => (
          <>
            <Text style={globalStyles.textHeading}>Active Rooms</Text>
          </>
        )}
        ListEmptyComponent={<EmptyRooms index={eventIndex} />}
        keyExtractor={item => item._id}
        renderItem={renderRoom}
        data={chatRooms}
      />
    </ViewWrapper>
  );
};

const styles = StyleSheet.create({
  roomScroll: {
    flexGrow: 1,
    paddingHorizontal: px2,
  },
  emptyRooms: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: px2,
  },
  roomContainer: {
    backgroundColor: blackLight,
    padding: px4,
    borderRadius: px2,
    marginVertical: pyh,
  },
});

export default WatchParty;
