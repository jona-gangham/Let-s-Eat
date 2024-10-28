import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function Main({ navigation }) {
  const [rooms, setRooms] = useState([]);

  const addRoom = (roomDetails) => {
    setRooms([{ ...roomDetails, id: rooms.length + 1 }, ...rooms]);
  };

  // 방 상세 페이지로 이동하는 함수
  const goToRoomDetail = (room) => {
    navigation.navigate('RoomDetail', { room });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateRoom', { addRoom })}>
          <Text style={styles.buttonText}>방 만들기</Text>
        </TouchableOpacity>

        <Text style={styles.title}>방 목록</Text>

        <FlatList
          data={rooms}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => goToRoomDetail(item)}>
              <View style={styles.roomContainer}>
                <Text style={styles.roomName}>{item.name}</Text>
                <Text style={styles.roomDetails}>생성 시간: {item.createdAt}</Text>
                <Text style={styles.roomDetails}>인원: {item.people}</Text>
                <Text style={styles.roomDetails}>장소: {item.location}</Text>
                <Text style={styles.roomDetails}>메뉴: {item.menu}</Text>
                <Text style={styles.roomDetails}>약속 시간: {item.meetingTime}</Text>
              </View>
            </TouchableOpacity>
          )}
          style={styles.list}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // 화면 전체를 차지하도록 함
    backgroundColor: 'white',
    padding: 10,
  },
  button: {
    width: 80,
    backgroundColor: '#ffaa00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 13,
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  roomContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    width: '100%',
    height: 125,
    borderWidth: 1,
    borderColor: '#ffaa00',
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  roomDetails: {
    fontSize: 14,
    color: '#888',
  },
  list: {
    flex: 1,
    padding: 10,
  },
});


