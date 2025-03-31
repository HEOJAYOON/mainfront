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
      
      <!-- 에러 발생 시 -->
      <div v-if="noticeError" class="error-message">
        공지사항 데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.
      </div>
      
      <!-- 공지사항 없음 -->
      <div v-if="!noticeError && !notice.length" class="no-notice">
        공지사항이 없습니다.
      </div>

      <!-- 정렬 토글 버튼 -->
      <div class="sort-toggle" v-if="notice.length">
        <button @click="toggleSortOrder">
          {{ isDescending ? '오름차순 정렬' : '내림차순 정렬' }}
        </button>
      </div>

      <!-- 공지사항 테이블 -->
      <div v-if="notice.length" class="table-container">
        <table class="styled-table">
          <thead>
            <tr>
              <th>NO</th>
              <th>제목</th>
              <th>등록일</th>
              <th>조회</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in sortedNotice" :key="index">
              <td>{{ index + 1 }}</td> <!-- 정렬된 배열을 기준으로 1번부터 번호 매기기 -->
              <td>{{ item.title }}</td>
              <td>{{ formatDate(item.regDate) }}</td> <!-- 날짜 포맷팅 -->
              <td>{{ item.viewCnt }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 페이지네이션 -->
      <div class="pagination" v-if="notice.length">
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

const notice = ref<any[]>([]);
const noticeError = ref<Error | null>(null);
const page = ref<number>(1);
const totalPages = ref<number>(0);

const isPlatformActive = ref(false);  // 초기값 설정
const toggleMarketPlace = ref(false); // 초기값 설정
const toggleGuide = ref(false); // 초기값 설정
const isMarketPlaceActive = ref(false); // 초기값 설정
const isGuideActive = ref(false); // 초기값 설정

const isDescending = ref(true); // 내림차순 정렬 기본값

const goHome = () => {
  isMarketPlaceActive.value = false;
  isGuideActive.value = false;
  isPlatformActive.value = false;

  window.scrollTo({ top: 0, behavior: "smooth" })
};

// "플랫폼 소개" 클릭 시 스크롤 이동 + 상태 초기화
const scrollToPlatformSection = () => {
  isMarketPlaceActive.value = false;
  isGuideActive.value = false;
  isPlatformActive.value = false;
  
  // ✅ `platform-section`으로 스크롤 이동
  setTimeout(() => {
    isPlatformActive.value = true;
    const section = document.getElementById("platform-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, 100);
};

// 날짜 포맷팅 함수
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
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
      totalPages.value = Math.ceil(data.length / 10); // 페이지 수 계산
    } else {
      noticeError.value = error;
    }
  } catch (error) {
    noticeError.value = error;
    console.error("API 호출 오류:", error);
  }
};

// 날짜 내림차순/오름차순 정렬 토글
const toggleSortOrder = () => {
  isDescending.value = !isDescending.value;
};

// 날짜 기준으로 정렬된 공지사항
const sortedNotice = computed(() => {
  return [...notice.value].sort((a, b) => {
    const dateA = new Date(a.regDate).getTime();
    const dateB = new Date(b.regDate).getTime();

    return isDescending.value ? dateB - dateA : dateA - dateB;
  });
});

// 페이지가 로드되면 공지사항 불러오기
onMounted(() => {
  fetchNoticeList();
});
</script>

<style scoped>
.notice-content {
  padding: 20px;
  padding-top: 120px;
}

.table-container {
  margin-bottom: 30px;
  background-color: #fff;
  padding: 20px;
  margin: auto 15%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
}

.styled-table th, .styled-table td {
  padding: 10px;
  text-align: center; /* 기본적으로 가운데 정렬 */
  border-bottom: 1px solid #ddd;
}

.styled-table th {
  background-color: #f4f4f4;
}

.styled-table td:nth-child(2) {
  text-align: left; /* 첫 번째 항목인 제목은 왼쪽 정렬 */
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

.sort-toggle {
  text-align: center;
  margin-top: 20px;
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
