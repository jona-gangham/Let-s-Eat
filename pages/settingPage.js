import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

export default function SettingPage({ route, navigation }) {
  // route.params에서 전달된 데이터 확인
  const { name: initialName, email: initialEmail, setName, setEmail } = route.params;

  const [name, setNameInput] = useState(initialName || '기본 이름'); // 기본값 설정
  const [email, setEmailInput] = useState(initialEmail || 'example@example.com'); // 기본값 설정

  useEffect(() => {
    if (!initialName || !initialEmail) {
      console.warn("초기 데이터가 없습니다.");
    }
  }, [initialName, initialEmail]);

  const handleSave = () => {
    // 부모 컴포넌트의 상태를 업데이트
    setName(name); // 부모 컴포넌트로 전달된 setName 호출
    setEmail(email); // 부모 컴포넌트로 전달된 setEmail 호출
    navigation.goBack(); // 이전 화면으로 돌아가기
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>설정페이지</Text>

      {/* 이름 수정 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => setNameInput(text)} // 이름 변경
        />
      </View>

      {/* 이메일 수정 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmailInput(text)} // 이메일 변경
        />
      </View>

      {/* 저장 버튼 */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>저장</Text>
      </TouchableOpacity>

      {/* 알림 설정 페이지로 이동 */}
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navigation.navigate('NotificationSettings')}
      >
        <Text style={styles.settingText}>알림 설정</Text>
      </TouchableOpacity>

      {/* 참여중인 채팅방 페이지로 이동 */}
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navigation.navigate('ChatRoomList')}
      >
        <Text style={styles.settingText}>참여중인 채팅방</Text>
      </TouchableOpacity>

      {/* 로그아웃 */}
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => {
          console.log('로그아웃');
          navigation.navigate('Home');
        }}
      >
        <Text style={styles.settingText}>로그아웃</Text>
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  saveButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 15,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingText: {
    fontSize: 18,
  },
});
