import {
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {io} from 'socket.io-client';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {iChatRoomRoutes} from '../../../../containers/layout/WatchPartyRoutes';
import useLiveStore from '../../../../store/liveStore';
import useStore from '../../../../store/store';
import {server} from '../../../../constants/secrets';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {black, blackLight, white} from '../../../../constants/colors';
import globalStyles from '../../../../styles/globals';
import {px1, px2, px4, py1, pyh} from '../../../../constants/spacing';
import {height, width} from '../../../../constants/dimensions';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/Ionicons';
import {medium} from '../../../../constants/fonts';
import {useNavigation} from '@react-navigation/native';

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

  const navigation = useNavigation();
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
              ? styles.chatRight
              : styles.chatLeft,
          ]}>
          {item.sender !== userProfile?.phoneNo && (
            <View style={styles.userInfo}>
              {profiles.get(item.sender)!.image ? (
                <Image
                  source={{uri: profiles.get(item.sender)!.image}}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.avatar}>
                  <Icon name="person-outline" color={white} size={20} />
                </View>
              )}
              <Text style={[styles.username]}>
                {profiles.get(item.sender)!.name}
              </Text>
            </View>
          )}
          <Text
            style={[
              globalStyles.textLight,
              item.sender === userProfile?.phoneNo
                ? styles.textRight
                : styles.textLeft,
            ]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-outline" size={20} color={white} />
          </TouchableOpacity>
          <Text style={[globalStyles.textHeading, {marginLeft: px1}]}>
            {chatRooms[roomIndex].roomName}
          </Text>
        </View>
        <View>
          <TouchableOpacity style={styles.inviteView} onPress={copyInviteCode}>
            <Text style={globalStyles.textLight}>Invite Code </Text>
            <Icon name="copy-outline" size={20} color={white} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        ref={scrollRef}
        style={{paddingHorizontal: px2}}
        data={messages}
        renderItem={renderChat}
        keyExtractor={(_, index) => index.toString()}
      />
      <View style={{paddingHorizontal: px4}}>
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
  chatArea: {},
  chatRight: {
    alignItems: 'flex-end',
    backgroundColor: '#286cfc',
    borderTopLeftRadius: px4,
    borderBottomLeftRadius: px4,
    borderTopRightRadius: px4,
    paddingLeft: px4,
    paddingRight: px2,
  },
  chatViewRight: {
    alignItems: 'flex-end',
  },
  chatViewLeft: {
    alignItems: 'flex-start',
  },
  chatLeft: {
    alignItems: 'flex-start',
    backgroundColor: '#343044',
    borderTopLeftRadius: px4,
    borderBottomRightRadius: px4,
    borderTopRightRadius: px4,
    paddingLeft: px1,
    paddingRight: px4,
  },
  textRight: {
    textAlign: 'right',
  },
  textLeft: {
    marginTop: pyh,
  },
  chatBox: {
    justifyContent: 'flex-end',
    paddingVertical: py1,
  },
  chatMessage: {
    backgroundColor: blackLight,

    marginHorizontal: pyh,
    paddingVertical: pyh,
  },
  inviteView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: pyh,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 0.06 * width,
    width: 0.06 * width,
    borderRadius: 0.03 * width,
  },
  username: {
    color: white,
    fontFamily: medium,
    marginLeft: px1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: py1,
    paddingHorizontal: px2,
  },
});
