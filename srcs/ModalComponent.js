import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';

const API_KEY = '1140cf83c963d0f27c967b5dd3136a3c';

const ModalComponent = ({ modalVisible, setModalVisible, onSelectUniversity }) => {
  const [universities, setUniversities] = useState([]);

  // 검색창에 쓴 내가 찾는 대학
  const [searchQuery, setSearchQuery] = useState('');

  // 검색 조건에 맞는 대학 리스트
  const [filteredUniversities, setFilteredUniversities] = useState([]);

  useEffect(() => {
    async function getData() {
      const url = `http://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=${API_KEY}&svcType=api&svcCode=SCHOOL&contentType=json&gubun=univ_list&thisPage=1&perPage=500`;
      
      try {
        const response = await fetch(url);
        const jsonResponse = await response.json();
        const universityList = jsonResponse.dataSearch.content;

        setUniversities(universityList); // 대학 목록을 state에 저장
        setFilteredUniversities(universityList);
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
      }
    }

    getData();
  }, []);  // 첫 로드 시 API 호출

    // 검색어가 변경될 때마다 필터링을 업데이트
    useEffect(() => {
        const filteredData = universities.filter((univ) =>
          univ.schoolName.includes(searchQuery)
        );
        setFilteredUniversities(filteredData);
      }, [searchQuery, universities]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>대학교를 선택하세요</Text>
          
              {/* 검색창 */}
          <TextInput
            style={styles.searchInput}
            placeholder="대학교 검색"
            placeholderTextColor="#ccc"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />

          {/* 대학교 목록을 표시 */}
          <View style={styles.scrollContainer}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {universities
                    .filter((univ) =>
                        univ.schoolName.includes(searchQuery)
                    ) // 검색어와 부분 일치하는 대학만 필터링
                    .map((univ, index) => (
                        /* 누르면 대학이 회원가입 페이지의 대학교 선택에 들어가야 함 */
                        <TouchableOpacity 
                            style={styles.listBox}
                            onPress={() => onSelectUniversity(univ.schoolName)}
                        >
                            <Text key={index} style={styles.universityText}>
                                {univ.schoolName}
                            </Text>
                        </TouchableOpacity>
                ))}
            </ScrollView>
          </View>

          {/* 닫기 버튼 */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    height: '50%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  searchInput: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 20,
  },
  scrollContainer: {
    width: '100%',
    height: '65%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  scrollView: {
    height: '100%',
  },
  universityText: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  closeButton: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ffaa00',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: '#ffaa00',
    fontSize: 16,
  },
});

export default ModalComponent;
