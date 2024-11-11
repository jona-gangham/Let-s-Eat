import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function Main({ navigation }) {
  const [rooms, setRooms] = useState([]);

  const addRoom = (roomDetails) => {
    setRooms([{ ...roomDetails, id: rooms.length + 1 }, ...rooms]);
  };

  // 방 상세 페이지로 이동하는 함수  
  const goToRoomDetail = (room) => {
    navigation.navigate('RoomDetail', { room });
  };

  // 방 마이페이지로 이동하는 함수 
  const goToMyPage = () => {
    navigation.navigate('MyPage'); // MyPage로 이동
  };
 
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={goToMyPage}>
          <Text style={styles.buttonText}>마이페이지</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateRoom', { addRoom })}>
          <Text style={styles.buttonText}>방 만들기</Text>
        </TouchableOpacity>
      </View>

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
              <Text style={styles.roomDetails}>메뉴: {item.menuCategory} - {item.specificMenu}</Text>  {/* 메뉴 정보 출력 */}
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
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // 버튼을 왼쪽으로 정렬
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#ffaa00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5, // 버튼 간의 간격을 좁힘
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
