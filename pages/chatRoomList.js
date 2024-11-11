import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function ChatRoomList({ navigation }) {
  // 예시로 채팅방 목록
  const chatRooms = [
    { id: 1, name: '채팅방 1' },
    { id: 2, name: '채팅방 2' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>참여중인 채팅방</Text>
      <FlatList
        data={chatRooms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ChatRoom', { roomId: item.id })}>
            <View style={styles.roomItem}>
              <Text style={styles.roomName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  roomItem: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 10,
  },
  roomName: {
    fontSize: 18,
  },
});
