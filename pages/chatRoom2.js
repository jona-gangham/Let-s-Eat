import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
  Modal,
} from 'react-native';

export default function ChatRoom({ route, navigation }) {
  const { roomName } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [inputContainerMargin, setInputContainerMargin] = useState(20);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false); // 설정 페이지 상태
  const flatListRef = useRef(null);

  // 예제 참여자 목록
  const [participants, setParticipants] = useState([
    '홍길동',
    '김철수',
    '박영희',
  ]);

  useEffect(() => {
    const newSocket = new WebSocket('ws://yourserver.com/socket');
    setSocket(newSocket);

    newSocket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      setInputContainerMargin(5)
    );
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      setInputContainerMargin(20)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // 방 나가기 함수
  const leaveRoom = () => {
    setIsSettingsVisible(false); // 설정 페이지 닫기
    navigation.goBack(); // 이전 화면으로 이동
  };

  // 설정 버튼 클릭 시 설정
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setIsSettingsVisible(true)}>
          <Text style={{ color: '#007BFF', marginRight: 10 }}>설정</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // 메시지 전송
  const sendMessage = () => {
    if (message.trim() && socket) {
      const newMessage = {
        text: message,
        sender: 'user',
        timestamp: new Date().toISOString(),
      };
      socket.send(JSON.stringify(newMessage));
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage('');
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 70}
    >
      <Text style={styles.title}>{roomName} 채팅방</Text>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.sender === 'user' ? styles.myMessage : styles.otherMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
      />

      {/* 메시지 입력창 */}
      <View style={[styles.inputContainer, { marginBottom: inputContainerMargin }]}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="메시지 입력"
        />
        <TouchableOpacity style={styles.emojiContainer} onPress={sendMessage}>
          <Text style={styles.emojiText}>{String.fromCodePoint(0x2191)}</Text>
        </TouchableOpacity>
      </View>

      {/* 설정 페이지 */}
      <Modal visible={isSettingsVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>설정</Text>

            {/* 참여 중인 사람 목록 */}
            <Text style={styles.participantsTitle}>참여 중인 사람</Text>
            <FlatList
              data={participants}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text style={styles.participantItem}>{item}</Text>
              )}
              style={styles.participantsList}
            />

            {/* 방 나가기 버튼 */}
            <TouchableOpacity style={styles.modalButton} onPress={leaveRoom}>
              <Text style={styles.modalButtonText}>방 나가기</Text>
            </TouchableOpacity>

            {/* 닫기 버튼 */}
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#ccc' }]}
              onPress={() => setIsSettingsVisible(false)}
            >
              <Text style={styles.modalButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settingsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  settingsButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f1f1',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  emojiContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#ffaa00',
  },
  emojiText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  participantsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  participantsList: {
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  participantItem: {
    fontSize: 14,
    marginBottom: 5,
  },
  modalButton: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#ff5c5c',
    alignItems: 'center',
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
