import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function RoomDetail({ route, navigation }) {
  const { room } = route.params;

  // 메뉴 정보 결합
  const menu = `${room.menuCategory} - ${room.specificMenu}`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{room.name}</Text>
      <Text style={styles.detail}>ID: {room.id}</Text>
      <Text style={styles.detail}>생성 시간: {room.createdAt}</Text>
      <Text style={styles.detail}>인원: {room.people}</Text>
      <Text style={styles.detail}>장소: {room.location}</Text>
      <Text style={styles.detail}>메뉴: {menu}</Text>  {/* 메뉴 정보 출력 */}
      <Text style={styles.detail}>약속 시간: {room.meetingTime}</Text>

      <TouchableOpacity onPress={() => navigation.navigate('ChatRoom', { roomName: room.name })} style={styles.chatButton}>
        <Text style={styles.chatButtonText}>chat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    marginVertical: 5,
  },
  chatButton: {
    borderColor: '#ffaa00', // 버튼 배경색
    borderWidth: 1,
    backgroundColor: 'transparent',

    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  chatButtonText: {
    color: 'black',             // 텍스트 색상
    fontSize: 16,
    fontWeight: 'bold',
  },
});
