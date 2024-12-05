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
  Image,
} from 'react-native';

export default function ChatRoom({ route, navigation }) {
  const { roomName } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [inputContainerMargin, setInputContainerMargin] = useState(20);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false); // 설정 페이지 상태
  const [selectedParticipant, setSelectedParticipant] = useState(null); // 선택된 사용자 상태
  const flatListRef = useRef(null);

  // 예제 참여자 목록
  const [participants, setParticipants] = useState([
    { name: '홍길동', profileImage: require('../assets/default-profile.png') },
    { name: '김철수', profileImage: require('../assets/default-profile.png') },
    { name: '박영희', profileImage: require('../assets/default-profile.png') },
  ]);

  const [ratings, setRatings] = useState({
    홍길동: ['식사 매너를 잘 지켜요', '약속 시간을 잘 지켜요', '친절해요'],
    김철수: ['식사 매너를 잘 지켜요', '약속 시간을 잘 지켜요', '친절해요'],
    박영희: ['식사 매너를 잘 지켜요', '약속 시간을 잘 지켜요', '친절해요'],
  });

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
    const rightHeader = () => (
      <TouchableOpacity onPress={() => setIsSettingsVisible(true)}>
        <Text style={{ color: '#007BFF', marginRight: 10 }}>목록</Text>
      </TouchableOpacity>
    );

    navigation.setOptions({
      headerRight: rightHeader, // 콜백 함수가 navigation.setOptions 내에서 정의
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

  // 선택된 참여자에 대한 평가 모달 보여주기
  const handleParticipantClick = (name) => {
    setSelectedParticipant(name);
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
            <Text style={styles.modalTitle}>목록</Text>

            {/* 참여 중인 사람 목록 */}
            <Text style={styles.participantsTitle}>참여 중인 사람</Text>
            <FlatList
              data={participants}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.participantItem}
                  onPress={() => handleParticipantClick(item.name)}
                >
                  <Image
                    source={item.profileImage}
                    style={styles.profileImage}
                  />
                  <Text style={styles.participantName}>{item.name}</Text>
                </TouchableOpacity>
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

      {/* 선택된 사용자의 평가 모달 */}
      <Modal visible={selectedParticipant !== null} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedParticipant}의 평가
            </Text>

            {/* 사용자 평가 */}
            <FlatList
              data={ratings[selectedParticipant] || []}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text style={styles.participantRating}>{item}</Text>
              )}
              style={styles.participantsList}
            />

            {/* 닫기 버튼 */}
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#ccc' }]}
              onPress={() => setSelectedParticipant(null)}
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  participantsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  participantsList: {
    maxHeight: 200,
  },
  participantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  participantName: {
    fontSize: 16,
  },
  participantRating: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  modalButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
