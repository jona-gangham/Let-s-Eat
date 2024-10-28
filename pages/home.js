import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function Home({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fontsLoaded] = useFonts({
    tokki: require("../assets/Fonts/HSSantokki-Regular.ttf"),
    jeju: require("../assets/Fonts/EF_jejudoldam(TTF).ttf"),
});

// 회원의 아이디와 비밀번호를 db에서 받아와서 비교
  const handleLogin = () => {
    if(username === ''){
        Alert.alert('아이디를 입력하세요.');
        return false;
    }
    if(password === ''){
        Alert.alert('비밀번호를 입력하세요.');
        return false;
    }
    return true;
  };

  return (
    <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={styles.emoji}>
                {String.fromCodePoint(0x1F374)}
            </Text>
            <Text style={styles.text}>
                밥먹자
            </Text>
            <Text style={styles.emoji}>
                {String.fromCodePoint(0x1F374)}
            </Text>
        </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="아이디"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          autoComplete='off'
          textContentType="oneTimeCode"
        />
        <TextInput
          type="password"
          style={[styles.input, styles.passwordInput]}
          placeholder="비밀번호"
          placeholderTextColor="#999"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          autoComplete='off'
          textContentType="oneTimeCode"
        />

          {/* 로그인 버튼을 눌렀을 때 Main 페이지로 이동 */}
        <TouchableOpacity style={styles.button} 
          onPress= {async() => {
            if(await handleLogin()){
              navigation.navigate("Main");
            }
          }}
        >
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>

        {/* 회원가입 버튼을 눌렀을 때 SignUp 페이지로 이동 */}
        <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signupButtonText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 80,
  },
  textContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 110,
    marginTop: 20,
  },
  text: {
    fontFamily: 'tokki',
    fontSize: 70,
    color: "#ffaa00",
    fontWeight: 'regular',
    margin: 5,
  },
  emoji: {
    fontSize: 40,
  },
  form: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 20,
    marginBottom: 10,
    fontSize: 18,
  },
  passwordInput: {
    marginBottom: 30,
  },
  button: {
    width: '100%',
    height: 50,
    paddingVertical: 10,
    backgroundColor: '#ffaa00',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  signupButton: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ffaa00',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  signupButtonText: {
    color: '#ffaa00',
    fontSize: 18,
  },
});

