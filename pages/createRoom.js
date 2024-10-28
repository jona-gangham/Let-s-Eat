import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { TouchableOpacity } from 'react-native';

export default function CreateRoom({ route, navigation }) {
  const { addRoom } = route.params;

  const [name, setName] = useState("");
  const [people, setPeople] = useState(1);
  const [location, setLocation] = useState('');
  const [menu, setMenu] = useState('');
  const [meetingTime, setMeetingTime] = useState('');

  const handleCreateRoom = () => {
    const date = new Date();
    const createdAt = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const roomDetails = { name, people, location, menu, meetingTime, createdAt };
    addRoom(roomDetails);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>

        <Text style={styles.label}>방 제목</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="방 제목 입력" />

      <Text style={styles.label}>인원: {people}명</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={people}
        onValueChange={setPeople}
        minimumTrackTintColor="#ffaa00"  // 최소 트랙 색상
        maximumTrackTintColor="#ddd"     // 최대 트랙 색상
        thumbTintColor="#ffaa00" 
      />

      <Text style={styles.label}>장소</Text>
      <TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="장소 입력" />

      <Text style={styles.label}>메뉴</Text>
      <TextInput style={styles.input} value={menu} onChangeText={setMenu} placeholder="메뉴 입력" />

      <Text style={styles.label}>약속 시간</Text>
      <TextInput style={styles.input} value={meetingTime} onChangeText={setMeetingTime} placeholder="약속 시간 입력 (예: 오후 3시)" />

      <TouchableOpacity style={styles.completeButton} onPress={handleCreateRoom}>
        <Text style={styles.completeButtonText}>완료</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  slider: {
    width: '100%',
    marginBottom: 15,
  },
  completeButton: {
    backgroundColor: '#ffaa00',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 180,
    borderRadius: 5,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
