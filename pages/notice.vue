<template>
  <v-app>
    <div class="background-container scrollable-theme">
      <Header 
      :toggleMarketPlace="toggleMarketPlace" 
      :toggleGuide="toggleGuide" 
      :goHome="goHome"
      :scrollToPlatformSection="scrollToPlatformSection"
      :isMarketPlaceActive="isMarketPlaceActive"
      :isGuideActive="isGuideActive"
      :isPlatformActive="isPlatformActive"
    />

    <!-- 공지사항 콘텐츠 -->
    <div class="notice-content">

      <h1>공지사항</h1>

      <div v-if="!isLoading" class="search-box-container">
        <!-- 게시물 수 표시 -->
        <div class="notice-count">
          총 {{ filteredNotice.length }} 건의 게시물이 있습니다.
        </div>
        <!-- 검색 박스 -->
        <v-text-field
          v-model="searchQuery" 
          label="제목으로 검색" 
          @input="filterNotices" 
          append-icon="mdi-magnify"
          clearable
        />
      </div>

      <!-- 공지사항 테이블 본문 -->
      <div>
        <table class="styled-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>등록일</th>
              <th>조회</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in sortedNotice" :key="item.id">
              <td>{{ sortedNotice.length - index }}</td> <!-- 번호 내림차순 -->
              <td @click="toggleContent(index)" style="cursor: pointer;">
                {{ item.title }}
                <!-- 여기서 각 게시물에 대한 v-expansion-panels 추가 -->
                <v-expansion-panels v-if="isOpen[index]" multiple>
                  <v-expansion-panel>
                    <v-expansion-panel-content>
                      <div class="content">{{ item.content }}</div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>                
              </td>
              <td>{{ formatDate(item.regDate) }}</td>
              <td>{{ item.viewCnt }}</td>
            </tr>
          </tbody>
        </table>
      </div>


    </div>

    <!-- 페이지네이션 -->
    <div class="pagination">
      <v-pagination v-model="page" :length="totalPages" @input="fetchNoticeList" />
    </div>

    <LazyFooter class="footer-fixed" />
    </div>
    
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useAuthFetch } from '~/composables/useAuthFetch';
import Header from '@/components/main/Header.vue';
import Footer from '@/components/main/Footer.vue';

interface NoticeItem {
  id: string;
  title: string;
  regDate: string;
  viewCnt: number;
  content: string;
}

const notice = ref<NoticeItem[]>([]);
const filteredNotice = ref<NoticeItem[]>([]);
const searchQuery = ref<string>(''); // 검색어 관리
const isLoading = ref<boolean>(true); // 로딩 상태 변수
const isOpen = ref<boolean[]>([]); // 게시물 열기/닫기 상태를 관리하는 배열
const page = ref<number>(1);
const totalPages = ref<number>(0);


const isPlatformActive = ref(false);
const toggleMarketPlace = ref(false);
const toggleGuide = ref(false);
const isMarketPlaceActive = ref(false);
const isGuideActive = ref(false);
const scrollToPlatformSection = ref(false);


const goHome = () => {
  isMarketPlaceActive.value = false;
  isGuideActive.value = false;
}
  
// 공지사항 API 호출
const fetchNoticeList = async () => {
  try {
    const { data, error } = await useAuthFetch("http://192.168.1.215:9090/api/v1/board/list/notice", { 
      method: 'GET',
    });

    if (data) {
      notice.value = data;
      filteredNotice.value = data; // 처음에는 필터된 리스트가 공지사항 전체가 됨
      totalPages.value = Math.ceil(data.length / 10); // 페이지 수 계산
    } else {
      console.error(error);
    }
  } catch (error) {
    console.error("API 호출 오류:", error);
  } finally {
    isLoading.value = false; // 데이터 로딩 완료 후 isLoading을 false로 변경
  }
};

// 검색 필터링 함수
const filterNotices = () => {
  if (searchQuery.value.trim() === '') {
    filteredNotice.value = notice.value; // 검색어가 없으면 전체 목록 표시
  } else {
    filteredNotice.value = notice.value.filter(item =>
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
};

// 날짜 포맷팅 함수
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};

// 날짜 기준으로 내림차순 정렬된 공지사항
const sortedNotice = computed(() => {
  return [...filteredNotice.value].sort((a, b) => {
    const dateA = new Date(a.regDate).getTime();
    const dateB = new Date(b.regDate).getTime();

    // 내림차순 정렬
    return dateB - dateA;
  });
});

// 게시물 열기/닫기 함수
const toggleContent = (index: number) => {
  isOpen.value[index] = !isOpen.value[index]; // 해당 인덱스의 게시물 열기/닫기 상태를 반전
};

// 페이지가 로드되면 공지사항 불러오기
onMounted(() => {
  fetchNoticeList();
});
</script>

<style scoped>

/* 🌟 전체 컨테이너 */
.background-container {
  /* position: relative;
  width: 100%; */
  /* height: 100vh; */
  /* height: auto;
  min-height: 100vh; */
  /* overflow: hidden !important; */
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: auto;
}
.notice-content {
  padding: 20px;
  padding-top: 120px;
  text-align: center;
  overflow: auto;
}

.notice-content h1 {
  margin-bottom: 20px;
}


.content{
  box-shadow: none;
  margin: 20px 0;
  padding: 20px;
  background-color: #F6F6F6;
}

.search-box-container {
  padding: 10px;
  border-radius: 8px;
  text-align: right;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 15%;
}

.search-box-container input {
  padding: 5px 8px;
  width: 200px;
  font-size: 13px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.notice-count {
  margin-bottom: 30px;
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
}

.styled-table {
  padding: 20px 30px 50px 30px;
  margin: 0 15%;
  border-collapse: collapse;
  table-layout: fixed; 
  width: 70%;
}

.styled-table th, .styled-table td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  word-wrap: break-word; 
}

.styled-table th {
  padding: 10px;
  text-align: center;
  background-color: #fff;
  font-weight: normal;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

.styled-table td:nth-child(2) {
  text-align: left;
}

.styled-table td:nth-child(1),
.styled-table th:nth-child(1) {
  width: 10%; /* 첫 번째 열 고정 너비 */
}

.styled-table td:nth-child(2),
.styled-table th:nth-child(2) {
  width: 60%; /* 두 번째 열 고정 너비 */
}

.styled-table td:nth-child(3),
.styled-table th:nth-child(3) {
  width: 15%; /* 세 번째 열 고정 너비 */
}

.styled-table td:nth-child(4),
.styled-table th:nth-child(4) {
  width: 15%; /* 네 번째 열 고정 너비 */
}


.pagination {
  margin-top: 20px;
}

.footer-fixed {
  width: 100%;
  background: #333;
  color: white;
  text-align: center;
  padding: 20px 0;
  bottom: 0;
}
</style>
