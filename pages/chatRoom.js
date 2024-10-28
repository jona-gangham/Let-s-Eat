import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard } from 'react-native';

export default function ChatRoom({ route }) {
  const { roomName } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [inputContainerMargin, setInputContainerMargin] = useState(20);
  const flatListRef = useRef(null); // FlatList 참조

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
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setInputContainerMargin(5));
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setInputContainerMargin(20));

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() && socket) {
      const newMessage = { text: message, sender: 'user', timestamp: new Date().toISOString() };
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
          <View style={[styles.messageContainer, item.sender === 'user' ? styles.myMessage : styles.otherMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
      />
      
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
    alignSelf: 'flex-start', // 상대방 메시지 왼쪽 정렬
    backgroundColor: '#f1f1f1', // 상대방 메시지 배경색
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
});


