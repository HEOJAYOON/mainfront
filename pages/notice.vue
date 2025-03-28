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
        <!-- 로딩 중 -->
        <div v-if="!notice.length && !noticeError" class="loading-message">
          로딩 중...
        </div>
        
        <!-- 에러 발생 시 -->
        <div v-if="noticeError" class="error-message">
          공지사항 데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.
        </div>
        
        <!-- 공지사항 없음 -->
        <div v-if="!noticeError && !notice.length" class="no-notice">
          공지사항이 없습니다.
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
              <tr v-for="(item, index) in notice" :key="index">
                <td>{{ item.no }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.date }}</td>
                <td>{{ item.views }}</td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- 페이지네이션 -->
        <div class="pagination" v-if="notice.length">
          <v-pagination v-model="page" :length="totalPages" />
        </div>
      </div>
  
      <!-- 푸터 -->
      <Footer class="footer-fixed" />
    </v-app>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Header from '@/components/main/Header.vue';
  import Footer from '@/components/main/Footer.vue';
  import { useRouter } from 'vue-router';
  
  // API 호출을 위한 변수 설정
  const notice = ref([]);
  const noticeError = ref(null);
  const page = ref(1);
  const totalPages = ref(0);
  
  // `Header`에 전달할 props 정의
  const toggleMarketPlace = ref(false);
  const toggleGuide = ref(false);
  const goHome = () => {
    router.push('/');  // 홈 페이지로 이동
  };
  const scrollToPlatformSection = () => {
    // 특정 섹션으로 스크롤 이동하는 로직
  };
  const isMarketPlaceActive = ref(false);
  const isGuideActive = ref(false);
  const isPlatformActive = ref(false);
  
  // 공지사항 API 호출
  const fetchNoticeList = async () => {
    try {
            console.log("API 호출 시작");
            const { data, error } = await useAuthFetch("http://192.168.1.215:9090/api/v1/board/list/notice", { 
            method: 'GET'
        });

        console.log("API 응답 데이터:", data); // 데이터 확인
        console.log("API 오류:", error); // 오류 확인

        if (data) {
            notice.value = data; // 공지사항 데이터 저장
            totalPages.value = Math.ceil(data.length / 10); // 페이지 수 계산
        } else {
            noticeError.value = error; // 에러 처리
        }
        } catch (error) {
            noticeError.value = error;
            console.error("API 호출 오류:", error); // 오류 메시지 출력
        }
    };
  
  // 페이지가 로드되면 공지사항 불러오기
  onMounted(() => {
    fetchNoticeList();
  });
  </script>
  
  <style scoped>
  /* 공지사항 페이지 스타일 */
  .notice-content {
    padding: 20px;
    padding-top: 120px;
  }
  
  .table-container {
    margin-bottom: 30px;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .styled-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .styled-table th, .styled-table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .styled-table th {
    background-color: #f4f4f4;
  }
  
  .pagination {
    text-align: center;
    margin-top: 20px;
  }
  
  /* 로딩 중, 에러 메시지 스타일 */
  .loading-message, .error-message, .no-notice {
    text-align: center;
    margin-top: 20px;
    font-size: 18px;
  }
  
  /* 푸터 고정 스타일 */
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
  