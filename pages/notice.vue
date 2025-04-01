<template>
  <v-app>
    <!-- 헤더 컴포넌트 -->
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

      <!-- 공지사항 테이블 -->
      <div class="table-container">
        
        <!-- 검색 박스와 게시물 수를 표시할 박스 -->
        <div v-if="!isLoading" class="search-box-container">
          <!-- 게시물 수 표시 -->
          <div class="notice-count">
            총 {{ filteredNotice.length }} 건의 게시물이 있습니다.
          </div>

          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="제목으로 검색" 
            @input="filterNotices"
          />
        </div>

        <!-- 공지사항 테이블 본문 -->
        <div v-if="filteredNotice.length">
          <table class="styled-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>등록일</th>
                <th>조회</th>
                <th></th> <!-- 새로 추가된 열 -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in sortedNotice" :key="item.id">
                <td>{{ sortedNotice.length - index }}</td> <!-- 번호 내림차순 -->
                <td @click="toggleContent(index)" style="cursor: pointer;">
                  {{ item.title }}
                </td>
                <td>{{ formatDate(item.regDate) }}</td>
                <td>{{ item.viewCnt }}</td>
                <td>
                  <button @click="toggleContent(index)">
                    <img 
                      :src="isOpen[index] ? '/image/notice/right-arrow.png' : '/image/notice/right-arrow.png'" 
                      alt="아이콘" 
                      class="icon" 
                      :class="{'rotate': isOpen[index]}" />
                  </button>
                </td>
              </tr>

              <!-- 내용이 펼쳐질 부분 (클릭한 제목 바로 아래에 위치) -->
              <tr v-if="isOpen[index]" :key="'content-' + index">
                <td colspan="5" class="content-row">
                  <div class="content">{{ item.content }}</div> <!-- 게시물 내용 -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 페이지네이션 -->
      <div class="pagination" v-if="filteredNotice.length">
        <v-pagination v-model="page" :length="totalPages" @input="fetchNoticeList" />
      </div>
    </div>

    <!-- 푸터 -->
    <Footer class="footer-fixed" />
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useAuthFetch } from '~/composables/useAuthFetch'; // 커스텀 훅
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
const noticeError = ref<Error | null>(null);
const page = ref<number>(1);
const totalPages = ref<number>(0);
const isLoading = ref<boolean>(true); // 로딩 상태 변수
const isOpen = ref<boolean[]>([]); // 게시물 열기/닫기 상태를 관리하는 배열


const isPlatformActive = ref(false);  // 초기값 설정
const toggleMarketPlace = ref(false); // 초기값 설정
const toggleGuide = ref(false); // 초기값 설정
const isMarketPlaceActive = ref(false); // 초기값 설정
const isGuideActive = ref(false); // 초기값 설정


const goHome = () => {
  isMarketPlaceActive.value = false;
  isGuideActive.value = false;
  isPlatformActive.value = false;

  window.scrollTo({ top: 0, behavior: "smooth" })
};

// 날짜 포맷팅 함수
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};

// 공지사항 API 호출
const fetchNoticeList = async () => {
  try {
    const { data, error } = await useAuthFetch("http://192.168.1.215:9090/api/v1/board/list/notice", { 
      method: 'GET',
      params: { page: page.value } // 페이지 번호를 파라미터로 전달
    });

    if (data) {
      notice.value = data;
      filteredNotice.value = data; // 처음에는 필터된 리스트가 공지사항 전체가 됨
      totalPages.value = Math.ceil(data.length / 10); // 페이지 수 계산
      isOpen.value = Array(data.length).fill(false); // 각 게시물에 대해 열기/닫기 상태 초기화
    } else {
      noticeError.value = error;
    }
  } catch (error) {
    noticeError.value = error;
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
.notice-content {
  padding: 20px;
  padding-top: 120px;
  text-align: center;
}

.notice-content h1 {
  margin-bottom: 20px; /* 아래쪽 여백 */
}

.table-container {
  margin-bottom: 30px;
  background-color: #fff;
  padding: 20px 30px 50px 30px;
  margin: auto 15%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.search-box-container {
  padding: 10px;
  border-radius: 8px;
  text-align: right;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-box-container input {
  padding: 5px 8px;
  width: 200px;
  font-size: 13px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.notice-count {
  font-size: 14px;
  color: #333;
  margin-left: 20px;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed; /* 고정된 레이아웃 */
}

.styled-table th, .styled-table td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  word-wrap: break-word; /* 긴 단어 줄 바꿈 */
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
  width: 70%; /* 두 번째 열 고정 너비 */
}

.styled-table td:nth-child(3),
.styled-table th:nth-child(3) {
  width: 20%; /* 세 번째 열 고정 너비 */
}

.styled-table td:nth-child(4),
.styled-table th:nth-child(4) {
  width: 15%; /* 네 번째 열 고정 너비 */
}

.styled-table td:nth-child(5),
.styled-table th:nth-child(5) {
  width: 10%; /* 다섯 번째 열 고정 너비 */
}

.pagination {
  text-align: center;
  margin-top: 20px;
}

.loading-message, .error-message, .no-notice {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
}

.content-row {
  background-color: #f9f9f9;
  padding: 15px;
  font-size: 14px;
  transition: max-height 0.3s ease; /* 슬라이드 애니메이션 효과 */
  overflow: hidden; /* 내용이 넘치지 않게 숨기기 */
  max-height: 0; /* 기본적으로 내용을 숨김 */
}

.content-row.v-show {
  max-height: 500px; /* 펼쳐졌을 때의 최대 높이 */
}

.icon {
  width: 10px; /* 아이콘의 크기 */
  height: 10px;
  transition: transform 0.3s ease; /* 아이콘 회전 애니메이션 */
}

.icon.rotate {
  transform: rotate(180deg); /* 열기/닫기 버튼 클릭 시 180도 회전 */
}

.footer-fixed {
  width: 100%;
  background: #333;
  color: white;
  text-align: center;
  padding: 20px 0;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
