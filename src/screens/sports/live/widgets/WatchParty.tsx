import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import {getJoinedRoomsHandler} from '../../../../handlers/watchParty/watchPartyHandler';
import useLiveStore from '../../../../store/liveStore';
import ViewWrapper from '../../../../components/wrappers/ViewWrapper';
import {FlatList} from 'react-native-gesture-handler';
import {iChatRoom} from '../../../../types/store/live';
import globalStyles from '../../../../styles/globals';
import {px1, px2, px4, py1, py2, pyh} from '../../../../constants/spacing';
import {black, blackLight, gray, white} from '../../../../constants/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {iChatRoomRoutes} from '../../../../containers/layout/WatchPartyRoutes';
import {height, width} from '../../../../constants/dimensions';
import {watchParty} from '../../../../constants/files';
import Icon from 'react-native-vector-icons/Ionicons';

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
      <Image style={styles.emptyRoomImage} source={watchParty} />
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

const WatchPartyHeader = ({
  showButtons,
  index,
}: {
  showButtons: boolean;
  index: number;
}) => {
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
    <View style={styles.watchPartyHeader}>
      <Text style={globalStyles.textHeading}>Watch Party</Text>
      {showButtons && (
        <View style={styles.watchPartyHeader}>
          <TouchableOpacity
            onPress={openCreateSheet}
            style={[styles.roomIconButton, {backgroundColor: white}]}>
            <Text style={globalStyles.buttonText}>Create Room</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={openJoinSheet}
            style={[styles.roomIconButton, {backgroundColor: gray}]}>
            <Text style={globalStyles.buttonLightText}>Join Room</Text>
          </TouchableOpacity>
        </View>
      )}
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
        <View style={[styles.wpHeaderButtonView, globalStyles.flag]}>
          <Icon name="people" color={black} size={20} />
          <Text style={[globalStyles.buttonText, {marginLeft: px1}]}>
            {item.memberCount}
          </Text>
        </View>
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
        ListHeaderComponent={
          <WatchPartyHeader
            index={eventIndex}
            showButtons={chatRooms.length === 0 ? false : true}
          />
        }
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
    paddingHorizontal: px4,
  },
  emptyRooms: {
    flex: 1,
    paddingHorizontal: px2,
  },
  roomContainer: {
    backgroundColor: blackLight,
    padding: px4,
    borderRadius: px2,
    marginVertical: pyh,
  },
  emptyRoomImage: {
    height: 0.3 * height,
    width: 0.9 * width,
    marginVertical: py2,
    resizeMode: 'contain',
  },
  watchPartyHeader: {
    paddingVertical: px2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wpHeaderButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  roomIconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: px2,
    paddingVertical: pyh,
    borderRadius: px1,
    elevation: 5,
    marginLeft: px1,
  },
});

export default WatchParty;
