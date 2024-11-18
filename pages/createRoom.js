import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Platform, TouchableOpacity, ScrollView, KeyboardAvoidingView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

export default function CreateRoom({ route, navigation }) {
  const { addRoom } = route.params;
  const [roomName, setRoomName] = useState('');
  const [people, setPeople] = useState(1);
  const [location, setLocation] = useState('');
  const [menuCategory, setMenuCategory] = useState('');
  const [specificMenu, setSpecificMenu] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [menuModalVisible, setMenuModalVisible] = useState(false);

  const handleCreateRoom = () => {
    if (!roomName || !location || !specificMenu || !meetingTime) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    if (isNaN(people) || people < 1 || people > 10) {
      alert('인원 수는 1부터 10명 사이여야 합니다.');
      return;
    }

    const date = new Date();
    const createdAt = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const roomDetails = {
      name: roomName,
      people: Number(people),
      location,
      menuCategory,
      specificMenu,
      meetingTime,
      createdAt,
    };

    addRoom(roomDetails);
    navigation.navigate('Main');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.label}>방 제목</Text>
        <TextInput
          style={styles.input}
          value={roomName}
          onChangeText={setRoomName}
          placeholder="방 제목 입력"
        />

        <Text style={styles.label}>인원: {people}명</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={people}
          onValueChange={value => setPeople(Math.floor(value))}
          minimumTrackTintColor="#ffaa00"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#ffaa00"
        />

        <Text style={styles.label}>장소</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="장소 입력"
        />

        <Text style={styles.label}>메뉴 종류</Text>
        <TouchableOpacity
          style={styles.pickerContainer}
          onPress={() => setMenuModalVisible(true)}
        >
          <Text style={styles.pickerText}>{menuCategory || '메뉴 선택'}</Text>
          <Ionicons name="chevron-down" size={20} color="black" style={styles.icon} />
        </TouchableOpacity>

        <Modal
          transparent={true}
          visible={menuModalVisible}
          animationType="slide"
          onRequestClose={() => setMenuModalVisible(false)}
        >
          <TouchableOpacity style={styles.modalOverlay} onPress={() => setMenuModalVisible(false)}>
            <View style={styles.modalContent}>
              {['한식', '일식', '중식'].map((category) => (
                <TouchableOpacity
                  key={category}
                  onPress={() => {
                    setMenuCategory(category);
                    setMenuModalVisible(false);
                  }}
                  style={styles.modalItem}
                >
                  <Text>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>

        <Text style={styles.label}>구체적인 메뉴</Text>
        <TextInput
          style={styles.input}
          value={specificMenu}
          onChangeText={setSpecificMenu}
          placeholder={`${menuCategory} 메뉴를 입력하세요.`}
        />

        <Text style={styles.label}>약속 시간</Text>
        <TextInput
          style={styles.input}
          value={meetingTime}
          onChangeText={setMeetingTime}
          placeholder="약속 시간 입력 (예: 오후 3시)"
        />
      </ScrollView>

      <TouchableOpacity style={styles.completeButton} onPress={handleCreateRoom}>
        <Text style={styles.completeButtonText}>완료</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 80,
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
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  pickerText: {
    fontSize: 16,
    color: 'black',
  },
  icon: {
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  completeButton: {
    backgroundColor: '#ffaa00',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
