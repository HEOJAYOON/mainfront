<template>
  <div class="login-page">
    <!-- 로고 및 헤더 영역 -->
    <div class="text-center">
      <img src="/image/main/main-logo-img.png" alt="EGIS DIGITAL TWIN CLOUD" height="50" class="mb-4" />
      <h1 class="text-h5 font-weight-bold mb-4">DIGITAL TWIN CLOUD</h1>
    </div>
    
    <!-- 로그인 폼 / 로딩 상태에 따라 표시 -->
    <v-card class="login-card mx-auto" max-width="420" elevation="3">
      <v-card-text>
        <!-- 인증 처리 중일 때 -->
        <div v-if="isAuthenticating" class="text-center py-8">
          <h2 class="text-h6 font-weight-regular mb-5">{{ statusMessage }}</h2>
          
          <transition name="fade-scale" mode="out-in">
            <v-progress-circular
              v-if="status === 'loading'"
              key="loading"
              indeterminate
              color="#1976D2"
              size="65"
              width="4"
              class="mb-5"
            ></v-progress-circular>
            
            <v-icon
              v-else-if="status === 'success'" 
              key="success"
              color="success"
              size="65"
              class="mb-5 check-animation"
            >
              mdi-check-circle
            </v-icon>
          </transition>
          
          <p class="text-body-2 text-medium-emphasis">
            {{ subMessage }}
          </p>
        </div>
        
        <!-- 일반 로그인 폼 (인증 처리 중이 아닐 때) -->
        <div v-else>
          <!-- 여기에 기존 로그인 폼 내용 -->
          <v-form @submit.prevent="handleLogin">
            <!-- 폼 내용 (생략) -->
          </v-form>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '~/store/auth';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

// 인증 상태 관리
const isAuthenticating = ref(false);
const status = ref('loading');
const statusMessage = ref('인증 처리 중');
const subMessage = ref('로그인 정보를 확인하는 중입니다...');

// 로그인 처리 시작 (기존 로그인 폼에서 호출)
const handleLogin = async (formData) => {
  isAuthenticating.value = true;
  status.value = 'loading';
  // 로그인 로직...
};

// URL 쿼리 파라미터에서 인증 코드 확인
onMounted(async () => {
  const code = route.query.code;
  
  // 인증 코드가 있으면 인증 처리 진행
  if (code) {
    isAuthenticating.value = true;
    
    try {
      // ⬇️ 액세스 토큰 요청
      const response = await fetch('/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          code, 
          redirectUri: `${window.location.origin}/callback`
        }),
        credentials: 'include' // 쿠키 설정을 위해 필수
      });

      const result = await response.json();
      //console.log('토큰 응답:', result);

      if (!response.ok) {
        throw new Error('토큰 요청 실패');
      }

      const accessToken = result.access_token; 
      const refreshToken = result.refresh_token || null;
      const expiresIn = result.expires_in || 3600; // 기본값 1시간 

      // ⬇️ UserInfo 요청
      const userInfoResponse = await fetch('/api/userinfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken })
      });

      const userInfo = await userInfoResponse.json();
      //console.log("🟢 사용자 정보:", userInfo);

      if (userInfo.error) {
        throw new Error('사용자 정보 조회 실패');
      }
      
      localStorage.setItem('user_info', JSON.stringify(userInfo));
      
      // ⬇️ Pinia 상태 업데이트 (로그인 성공)
      authStore.setUser(userInfo, accessToken, refreshToken, expiresIn);
      
      // 인증 성공 표시
      status.value = 'success';
      statusMessage.value = '인증 성공';
      subMessage.value = '잠시 후 메인 페이지로 이동합니다...';

      // 잠시 후 메인 페이지로 이동
      setTimeout(() => {
        router.push('/');
      }, 1500);

    } catch (error) {
      console.error('API 요청 중 오류 발생:', error);
      
      // 오류 처리 후 로그인 폼으로 돌아가기
      isAuthenticating.value = false;
      
      // 필요하다면 에러 메시지 표시
      // errorMessage.value = error.message;
    }
  }
});
</script>

<style scoped>
.login-page {
  max-width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f5f7fa;
}

.login-card {
  width: 100%;
  border-radius: 8px;
}

/* 체크 아이콘 애니메이션 */
.check-animation {
  animation: pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes pop-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  70% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 트랜지션 애니메이션 */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>