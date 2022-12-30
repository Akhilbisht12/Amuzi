import {
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {io} from 'socket.io-client';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {iChatRoomRoutes} from '../../../../containers/layout/WatchPartyRoutes';
import BackTitleHeader from '../../../../components/Headers/BackTitleHeader';
import useLiveStore from '../../../../store/liveStore';
import useStore from '../../../../store/store';
import {server} from '../../../../constants/secrets';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {black, blackLight, white} from '../../../../constants/colors';
import globalStyles from '../../../../styles/globals';
import {px2, px4, pyh} from '../../../../constants/spacing';
import {height} from '../../../../constants/dimensions';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = NativeStackScreenProps<iChatRoomRoutes, 'chatRoom'>;

const ChatRoom = ({route}: Props) => {
  const [messages, setMessages] = useState<{sender: number; text: string}[]>(
    [],
  );
  const [text, setText] = useState('');
  const {roomIndex} = route.params;
  const {chatRooms} = useLiveStore();
  const {access, userProfile} = useStore();
  const [profiles, setProfiles] = useState(new Map());
  const scrollRef = useRef<FlatList>(null);
  const socket = io(server);

  const copyInviteCode = () => {
    Clipboard.setString(chatRooms[roomIndex]._id);
    ToastAndroid.show('Room code copied to clipboard.', ToastAndroid.SHORT);
  };

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('join-room', {
        token: `Bearer ${access}`,
        roomId: chatRooms[roomIndex]._id,
        eventId: chatRooms[roomIndex].eventId,
      });
    });

    socket.on('join-success', message => {
      console.log(message);
    });
    socket.on('join-failure', message => {
      console.log(message);
    });
    socket.on('send-message-success', ({message, senderProfile}) => {
      if (!profiles.has(senderProfile.phoneNo)) {
        setProfiles(state => {
          state.set(senderProfile.phoneNo, {
            name: senderProfile.name,
            image: senderProfile.image,
          });
          return state;
        });
      }
      setMessages(prev => [
        ...prev,
        {sender: senderProfile.phoneNo, text: message},
      ]);
      scrollRef.current?.scrollToEnd();
    });
    socket.on('send-message-failure', message => {
      console.log(message);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (text === '') return;
    socket.emit('send-message', {
      token: `Bearer ${access}`,
      roomId: chatRooms[roomIndex]._id,
      eventId: chatRooms[roomIndex].eventId,
      message: text.trim(),
    });
    // setMessages(prev => [...prev, {text: text, sender: userProfile!.phoneNo}]);
    setText('');
    // scrollRef.current?.scrollToEnd();
  };
  const renderChat = ({
    item,
    index,
  }: {
    item: {text: string; sender: number};
    index: number;
  }) => {
    return (
      <View
        key={index}
        style={[
          styles.chatBox,

          item.sender === userProfile?.phoneNo
            ? styles.chatViewRight
            : styles.chatViewLeft,
        ]}>
        <View
          style={[
            styles.chatMessage,

            item.sender === userProfile?.phoneNo
              ? styles.chatViewRight
              : styles.chatViewLeft,
          ]}>
          <Text
            style={[
              globalStyles.textLight,
              item.sender === userProfile?.phoneNo && styles.textRight,
            ]}>
            {profiles.get(item.sender)!.name}
          </Text>
          <Text
            style={[
              globalStyles.textLight,
              item.sender === userProfile?.phoneNo && styles.textRight,
            ]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.main}>
      <BackTitleHeader title={chatRooms[roomIndex].roomName} />
      <FlatList
        ref={scrollRef}
        style={{paddingHorizontal: px2}}
        data={messages}
        renderItem={renderChat}
        keyExtractor={(_, index) => index.toString()}
      />
      <View style={{paddingHorizontal: px4}}>
        <TouchableOpacity style={styles.inviteView} onPress={copyInviteCode}>
          <Icon name="copy-outline" size={20} color={white} />
          <Text style={globalStyles.textLight}>Copy Room Code</Text>
        </TouchableOpacity>
        <TextInput
          returnKeyType="send"
          placeholder="Type message..."
          value={text}
          onBlur={handleSendMessage}
          style={styles.input}
          onChangeText={value => setText(value)}
        />
      </View>
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: black,
  },
  input: {
    backgroundColor: white,
    borderRadius: px4,
    paddingHorizontal: px4,
    height: 0.05 * height,
    marginBottom: px2,
  },
  chatArea: {
    paddingHorizontal: px2,
  },
  chatViewRight: {
    alignItems: 'flex-end',
  },
  chatViewLeft: {
    alignItems: 'flex-start',
  },
  textRight: {
    textAlign: 'right',
  },

  chatBox: {
    justifyContent: 'flex-end',
  },
  chatMessage: {
    backgroundColor: blackLight,
    paddingHorizontal: px4,
    marginVertical: pyh,
    paddingVertical: pyh,
    borderRadius: px4,
  },
  inviteView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: pyh,
  },
});
