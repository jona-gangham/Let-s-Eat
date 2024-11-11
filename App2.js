import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/home'; // 홈 페이지
import SignUp from './pages/sign-up'; // 회원가입 페이지
import Main from './pages/main';
import RoomDetail from './pages/roomDetail';
import CreateRoom from './pages/createRoom';
import ChatRoom from './pages/chatRoom';
import MyPage from './pages/mypage';
import SettingPage from './pages/settingPage';  // 설정 페이지 추가
import ChatRoomList from './pages/chatRoomList';  // 참여중인 채팅방 화면
import NotificationSettings from './pages/notificationSettings';  // 알림 설정 화면

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ title: '홈' }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: '회원가입' }} />
        <Stack.Screen name="Main" component={Main} options={{ title: '메인' }} />
        <Stack.Screen name="RoomDetail" component={RoomDetail} options={{ title: '방 상세 정보' }} />
        <Stack.Screen name="CreateRoom" component={CreateRoom} options={{ title: '방 만들기' }} />
        <Stack.Screen name="ChatRoom" component={ChatRoom} options={{ title: '채팅방' }} />
        <Stack.Screen name="MyPage" component={MyPage} options={{ title: '마이 페이지' }} />
        <Stack.Screen name="SettingPage" component={SettingPage} options={{ title: '설정 페이지' }} />
        <Stack.Screen name="ChatRoomList" component={ChatRoomList} options={{ title: '참여중인 채팅방' }} />
        <Stack.Screen name="NotificationSettings" component={NotificationSettings} options={{ title: '알림 설정' }} />
      </Stack.Navigator>  
    </NavigationContainer>
  );
}
