import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function MyPage({ navigation }) {
  const [name, setName] = useState('홍길동');
  const [email, setEmail] = useState('honggildong@example.com');

  const gotosettingpage = () => {
    navigation.navigate('SettingPage', {
      name,        // 현재 이름
      email,       // 현재 이메일
      setName,     // 이름 업데이트 함수
      setEmail,    // 이메일 업데이트 함수
    });
  };

  return (
    <View style={styles.container}>
      {/* 고정된 기본 프로필 사진 */}
      <Image 
        source={require('../assets/default-profile.png')} 
        style={styles.profileImage} 
      />
      
      {/* 사용자 이름 */}
      <Text style={styles.name}>{name}</Text>  {/* name 상태값 사용 */}
      
      {/* 사용자 이메일 */}
      <Text style={styles.email}>{email}</Text> {/* email 상태값 사용 */}

      {/* 설정 섹션 */}
      <View style={styles.settingsContainer}>
        <TouchableOpacity 
          style={styles.settingItem} 
          onPress={gotosettingpage}  // 설정 페이지로 이동
        >
          <Text style={styles.settingText}>설정</Text> {/* <Text>로 감싸기 */}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  settingsContainer: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 20,
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
