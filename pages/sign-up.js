import React, { useState } from 'react';
import { Button, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import ModalComponent from '../srcs/ModalComponent';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [university, setUniversity] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // 모달 가시성 상태


  const handleSendVerificationCode = () => {
    if (university === '' || email === '') {
      Alert.alert('오류', '대학교와 이메일을 모두 입력해주세요.');
      return;
    }
    // 이메일 인증번호 전송 로직 (서버 연동 필요)
    Alert.alert('인증번호 전송', `인증번호가 ${email}@${university}로 전송되었습니다.`);
  };

  const handleSignUp = () => {
    // 회원가입 로직 (서버 연동 필요)
    if (verificationCode !== '1234') { // 예시로 인증번호 1234를 올바른 값으로 가정
      Alert.alert('오류', '인증번호가 올바르지 않습니다.');
    } else if(password !== repassword){
      Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
    }else{
        Alert.alert('회원가입 성공', '회원가입이 완료되었습니다.');
    }
  };

  // 선택된 대학으로 setUniversity가 됨
  const handleSelectUniversity = (selectUniversity) => {
    setUniversity(selectUniversity);
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>

      {/* 아이디 입력 */}
        <TextInput
            style={styles.input}
            placeholder="아이디"
            value={username}
            onChangeText={setUsername}
        />

      {/* 비밀번호 입력 */}
        <TextInput
            style={styles.input}
            placeholder="비밀번호"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
        />

        <TextInput
            style={styles.input}
            placeholder="비밀번호 재입력"
            secureTextEntry={true}
            value={repassword}
            onChangeText={setRePassword}
        />

      {/* 닉네임 입력 */}
        <TextInput
            style={styles.input}
            placeholder="닉네임"
            value={nickname}
            onChangeText={setNickname}
        />

        {/* 대학교 선택 */}
        <TouchableOpacity style={styles.pickerContainer} onPress={() => setModalVisible(true)}>
            {university ? (
                <Text style={{ color: 'black', fontSize: 16 }}>{university}</Text>
            ) : (
                <Text style={{ color: '#ccc', fontSize: 16 }}>대학교 선택</Text>
            )}
        </TouchableOpacity>

        {/* modalVisible과 setModalVisible을 자식에게 props로 전달 */}
        <ModalComponent 
            modalVisible={modalVisible} 
            setModalVisible={setModalVisible} 
            onSelectUniversity={handleSelectUniversity}
        />


      {/* 대학교 이메일 입력 */}
        <View style={styles.emailContainer}>
            <TextInput
            style={styles.emailInput}
            placeholder="이메일 입력"
            value={email}
            onChangeText={setEmail}
            />
            <Text style={{flex: 1, textAlign: 'center', fontSize: 20, marginBottom: 20, marginLeft: 10}}>@</Text>
            <View style={styles.emailDomain}>
            </View>
        </View>

      {/* 인증번호 전송 버튼 */}
        <TouchableOpacity style={styles.button} onPress={handleSendVerificationCode}>
            <Text style={styles.buttonText}>인증번호 전송</Text>
        </TouchableOpacity>

      {/* 인증번호 입력 */}
        <TextInput
            style={styles.input}
            placeholder="이메일로 받은 인증번호 입력"
            value={verificationCode}
            onChangeText={setVerificationCode}
        />

      {/* 회원가입 버튼 */}
        <TouchableOpacity 
            style={[styles.button, { marginTop: 50 }]} 
            onPress={async () => {
            await handleSignUp(); // 비동기 회원가입 처리
            navigation.navigate('Home'); // 처리 후 홈으로 이동
            }}
        >
            <Text style={styles.buttonText}>회원가입</Text>
        </TouchableOpacity>
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
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  pickerContainer: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    justifyContent:'center',
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: 50,
  },
  emailInput: {
    flex: 3,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    height: '80%',
    marginBottom: 20,
    paddingLeft: 20,
  },
  emailDomain: {
    height: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    flex: 3,
    marginLeft: 10,
    fontSize: 16,
    marginBottom: 20,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  button: {
    width: '100%',
    backgroundColor: '#ffaa00',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },

});


