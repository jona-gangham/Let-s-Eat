import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Main({ navigation }) {
  const [rooms, setRooms] = useState([]);
  const [originalRooms, setOriginalRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState('createdAt');
  const [sortValue, setSortValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const addRoom = (newRoom) => {
    newRoom.people = isNaN(parseInt(newRoom.people)) ? 0 : parseInt(newRoom.people);
    setRooms((prevRooms) => [...prevRooms, newRoom]);
    setOriginalRooms((prevRooms) => [...prevRooms, newRoom]);
  };

  const handleSearchAndSort = () => {
    let filteredRooms = originalRooms;

    // 검색 적용
    if (searchQuery.trim() !== '') {
      filteredRooms = filteredRooms.filter((room) =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 정렬 적용
    if (sortCriteria === 'createdAt') {
      filteredRooms.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortCriteria === 'people') {
      filteredRooms.sort((a, b) => a.people - b.people);
    } else if (sortCriteria === 'menuCategory') {
      filteredRooms.sort((a, b) => (a.menuCategory || '').localeCompare(b.menuCategory || ''));
    } else if (sortCriteria === 'location') {
      filteredRooms.sort((a, b) => (a.location || '').localeCompare(b.location || ''));
    }

    // 필터링 값 적용
    if (sortValue.trim() !== '') {
      filteredRooms = filteredRooms.filter((room) => {
        const roomValue = room[sortCriteria]?.toString() || '';
        return roomValue.includes(sortValue);
      });
    }

    setRooms(filteredRooms);
  };

  // searchQuery, sortCriteria, sortValue가 변경될 때마다 자동으로 필터링 및 정렬 적용
  useEffect(() => {
    handleSearchAndSort();
  }, [searchQuery, sortCriteria, sortValue, originalRooms]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.createRoomButton}
          onPress={() => navigation.navigate('CreateRoom', { addRoom })}
        >
          <Text style={styles.buttonText}>방 만들기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.myPageButton} onPress={() => navigation.navigate('MyPage')}>
          <Text style={styles.buttonText}>마이페이지</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="방 이름 검색"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={handleSearchAndSort}>
          <Ionicons name="search" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>정렬 기준:</Text>
        <TouchableOpacity
          style={styles.pickerContainer}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.pickerText}>{sortCriteria}</Text>
          <Ionicons name="chevron-down" size={20} color="black" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="값 입력"
          value={sortValue}
          onChangeText={setSortValue}
        />
        <TouchableOpacity style={styles.sortButton} onPress={handleSearchAndSort}>
          <Text style={styles.buttonText}>정렬</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>방 목록</Text>

      <FlatList
        data={rooms}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('RoomDetail', { room: item })}>
            <View style={styles.roomContainer}>
              <Text style={styles.roomName}>{item.name}</Text>
              <Text style={styles.roomDetails}>인원: {Number(item.people) || 0}명</Text>
              <Text style={styles.roomDetails}>장소: {item.location}</Text>
              <Text style={styles.roomDetails}>메뉴: {item.menuCategory} - {item.specificMenu}</Text>
              <Text style={styles.roomDetails}>약속 시간: {item.meetingTime}</Text>
            </View>
          </TouchableOpacity>
        )}
        style={styles.list}
      />

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalBackground} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => {
                setSortCriteria('createdAt');
                setModalVisible(false);
              }}
            >
              <Text>약속 시간</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => {
                setSortCriteria('people');
                setModalVisible(false);
              }}
            >
              <Text>인원 수</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => {
                setSortCriteria('location');
                setModalVisible(false);
              }}
            >
              <Text>장소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => {
                setSortCriteria('menuCategory');
                setModalVisible(false);
              }}
            >
              <Text>메뉴</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  createRoomButton: {
    backgroundColor: '#ffaa00',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  myPageButton: {
    backgroundColor: '#ffaa00',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  title: {
    fontSize: 20,
    marginTop: 15,
    textAlign: 'center',
  },
  roomContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 8,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ffaa00',
  },
  roomName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  roomDetails: {
    fontSize: 13,
    color: '#666',
  },
  list: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  sortLabel: {
    fontSize: 14,
    marginRight: 10,
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
    height: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: 120, // 크기를 줄였음
  },
  pickerText: {
    fontSize: 14,
    color: 'black',
    marginRight: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
    width: 100,
    marginLeft: 8,
  },
  sortButton: {
    backgroundColor: '#ffaa00',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginLeft: 10, // 버튼 간격을 위해 추가
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: 250,
    borderRadius: 5,
    paddingVertical: 20,
  },
  modalItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
});
