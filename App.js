import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/home'; // 홈 페이지
import SignUp from './pages/sign-up'; // 회원가입 페이지
import Main from './pages/main';
import RoomDetail from './pages/roomDetail';
import CreateRoom from './pages/createRoom';
import ChatRoom from './pages/chatRoom';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ title: '홈' }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: '회원가입' }} />
        <Stack.Screen name="Main" component={Main} options={{ title: '메인' }} />
        <Stack.Screen name="RoomDetail" component={RoomDetail} options={{ title: '방 상세 정보' }} />
        <Stack.Screen name="CreateRoom" component={CreateRoom} options={{ title: '방 만들기'}}/>
        <Stack.Screen name="ChatRoom" component={ChatRoom} option={{title: '채팅방'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
