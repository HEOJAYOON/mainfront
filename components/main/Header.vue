<script setup lang="ts">
// import { useI18n } from 'vue-i18n'
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useAuthStore } from '~/store/auth';

const loginDialog = ref(false);
const pwDialog = ref(false);
const joinDialog = ref(false);
const idValue = ref("");
const pwValue = ref("");
const pwCheckValue = ref("");
const nameValue = ref("");
const mailValue = ref("");
const rememberCheck = ref(false);
const slaCheckValue = ref(false);
const agreeCheckValue = ref(false);

// const { locale } = useI18n()

const items = [
  { title: '한글', code: 'ko' },
  { title: 'English', code: 'en' }
]

// 현재 선택된 언어명 표시
// const currentLangName = computed(() => {
//   return items.find(item => item.code === locale.value)?.title || '언어'
// })

// 언어 변경 함수
// const changeLanguage = (lang) => {
//   locale.value = lang  // i18n의 locale 변경
// }
const isTablet = ref(false);

const isMobile = ref(false);
const menuOpen = ref(false);

// 화면 크기 체크 함수
const checkScreenSize = () => {
  const width = window.innerWidth;
  isMobile.value = width <= 1000;
  isTablet.value = width > 1000 && width <= 1550;
};

const isIconsLoaded = ref(false);

// 헤더 로딩 상태
const isLoaded = ref(false);

// ✅ 화면 크기 변경 감지
onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);

  // 실제 헤더 표시
  isLoaded.value = true;
  nextTick(() => {
    const observer = new MutationObserver(() => {
      const iconElement = document.querySelector(".va-icon");
      if (iconElement) {
        isIconsLoaded.value = true;
        iconElement.classList.add("loaded"); // ✅ 아이콘이 로드되면 클래스 추가
        observer.disconnect(); 
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });
});

// ✅ 컴포넌트 제거 시 이벤트 리스너 삭제
onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreenSize);
  isIconsLoaded.value = false;
});

const authStore = useAuthStore();

const handleAuthClick = () => {
  if (authStore.accessToken) {
    // ✅ 로그아웃 처리
    authStore.logout();
  } else {
    // ✅ 로그인 처리
    redirectToAuth();
  }
};


const redirectToAuth = () => {
  const clientId = 'egis-client';
  const redirectUri = encodeURIComponent(`${window.location.origin}/callback`);
  const authServerUrl = 'http://49.247.24.47:9000/oauth2/authorize';
  const scope = encodeURIComponent('openid profile'); 
  const state = Math.random().toString(36).substring(2, 15); 

  const authUrl = `${authServerUrl}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;

  window.location.href = authUrl;
};

defineProps(["toggleMarketPlace", "toggleGuide", "goHome", "scrollToPlatformSection", "isMarketPlaceActive", "isGuideActive", "isPlatformActive" ]);
</script>

<template>
   <ClientOnly>
  <header class="header">
    <!-- ✅ 🔥 로딩 중 (스켈레톤 UI) -->
    <div v-if="!isLoaded" class="skeleton-header">
      <div class="skeleton-left">
        <div class="skeleton-logo"></div>
      </div>
      <div class="skeleton-center">
        <div class="skeleton-menu"></div>
        <div class="skeleton-menu"></div>
        <div class="skeleton-menu"></div>
        <div class="skeleton-menu"></div>
        <div class="skeleton-menu"></div>
      </div>
      <div class="skeleton-right">
        <div class="skeleton-menu"></div>
        <div class="skeleton-menu"></div>
        <div class="skeleton-menu"></div>
        <div class="skeleton-menu"></div>
        <div class="skeleton-menu"></div>
      </div>
    </div>
    <v-app-bar v-if="isLoaded" class="navbar" elevation="0" style="height: 80px;">
      <div class="header-container">
        <!-- 왼쪽 (로고) -->
        <div class="logo-container">
          <a class="navbar-brand" href="/main">
            <v-img src="/image/main/main-logo-img.png" class="logo" alt="Logo" />
          </a>
        </div>

        <!-- 가운데 (메뉴) -->
        <div class="menu-container" v-if="!isMobile">
          <ul class="nav">
            <li>
              <a href="#" 
              :class="{ active: !isMarketPlaceActive && !isGuideActive && !isPlatformActive }"
              @click.prevent="goHome"
              >HOME
              </a>
            </li>
            <li>
              <a href="#"
              :class="{ active: isPlatformActive }" 
              @click.prevent="scrollToPlatformSection">
                플랫폼 소개
              </a>
            </li>
            <li><a href="#">주요기능</a></li>
            <li>
              <a href="#" 
              :class="{ active: isMarketPlaceActive }" 
              @click.prevent="toggleMarketPlace"
              >
              Market Place
              </a>
            </li>
            <li>
              <a href="#" 
              :class="{ active: isGuideActive  }" 
              @click.prevent="toggleGuide">
              가이드
              </a>
            </li>
          </ul>
        </div>

        <!-- 오른쪽 (로그인 버튼) -->
        <div class="actions-container" v-if="!isMobile && !isTablet">
          <v-btn
            class="action-btn"
            variant="text"
            color="#FFFFFF"
            @click="loginDialog = true; joinDialog = false; pwDialog = false; handleAuthClick()"
          >
            {{ authStore.accessToken ? '로그아웃' : '로그인' }}
          </v-btn>

          <!-- 비밀번호 창 시작 -->
          <v-dialog v-model="pwDialog" max-width="600" transition="dialog-bottom-transition">
            <v-card class="dialog-card">
              <v-card-title class="dialog-title">
                비밀번호 찾기
              </v-card-title>
              <v-card-text>
                <div class="login-container">
                  <div class="input-container">
                    <span class="custom-label">아이디</span>
                    <v-text-field
                      v-model="idValue"
                      placeholder="User ID"
                      class="input"
                      prepend-inner-icon="mdi-account-outline"
                      variant="outlined"
                      hide-details
                    />
                  </div>

                  <div class="input-container">
                    <span class="custom-label">이름</span>
                    <v-text-field
                      v-model="nameValue"
                      placeholder="User Name"
                      class="input"
                      prepend-inner-icon="mdi-account-outline"
                      variant="outlined"
                      hide-details
                    />
                  </div>

                  <div class="input-container">
                    <span class="custom-label">이메일</span>
                    <v-text-field
                      v-model="mailValue"
                      placeholder="User E-mail"
                      class="input"
                      prepend-inner-icon="mdi-email"
                      variant="outlined"
                      hide-details
                    />
                  </div>

                  <span class="helper-text">
                    * 비밀번호 찾기에 어려움이 있으신 분은 khaia@egiskorea.com로 문의하시기 바랍니다.
                  </span>
                </div>
              </v-card-text>

              <v-card-actions class="action-container">
                <v-btn class="action-btn primary-btn" color="#2371B0" @click="pwDialog = false">
                  비밀번호 찾기
                </v-btn>
                <v-btn class="action-btn" variant="outlined" @click="pwDialog = false">
                  닫기
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- 비밀번호 창 끝 -->

          <v-btn
            class="action-btn ml-2"
            variant="text"
            color="#FFFFFF"
            @click="joinDialog = true; loginDialog = false; pwDialog = false"
          >
            회원가입
          </v-btn>
          <!-- 회원가입 창 시작 -->
          <v-dialog v-model="joinDialog" max-width="600" transition="dialog-bottom-transition">
            <v-card class="dialog-card">
              <v-card-title class="dialog-title">
                회원가입
              </v-card-title>
              <v-card-text>
                <div class="login-container">
                  <div class="input-container">
                    <span class="custom-label">아이디</span>
                    <v-text-field
                      v-model="idValue"
                      placeholder="User ID"
                      class="input"
                      :rules="[v => v.length > 5 || 'ID must be at least 6 characters long.']"
                      prepend-inner-icon="mdi-account-outline"
                      variant="outlined"
                      hide-details
                    />
                  </div>

                  <div class="input-container">
                    <span class="custom-label">이름</span>
                    <v-text-field
                      v-model="nameValue"
                      placeholder="User Name"
                      class="input"
                      prepend-inner-icon="mdi-account-outline"
                      variant="outlined"
                      hide-details
                    />
                  </div>

                  <div class="input-container">
                    <span class="custom-label">이메일</span>
                    <v-text-field
                      v-model="mailValue"
                      placeholder="User E-mail"
                      class="input"
                      prepend-inner-icon="mdi-email"
                      variant="outlined"
                      hide-details
                    />
                  </div>

                  <div class="input-container">
                    <span class="custom-label">비밀번호</span>
                    <v-text-field
                      v-model="pwValue"
                      type="password"
                      placeholder="Password"
                      class="input"
                      :rules="[v => v.length > 5 || 'Invalid password format.']"
                      prepend-inner-icon="mdi-lock"
                      variant="outlined"
                      hide-details
                    />
                  </div>
                  <span class="helper-text password-hint">
                    * 비밀번호는 숫자, 영문, 특수문자를 각각 사용하여 9자리 이상을 권고합니다.
                  </span>

                  <div class="input-container">
                    <span class="custom-label">비밀번호 확인</span>
                    <v-text-field
                      v-model="pwCheckValue"
                      type="password"
                      placeholder="Password Confirmation"
                      class="input"
                      prepend-inner-icon="mdi-lock"
                      variant="outlined"
                      hide-details
                    />
                  </div>
                </div>
              </v-card-text>

              <div class="checkbox-container">
                <v-checkbox
                  v-model="slaCheckValue"
                  class="mb-2"
                  color="#2371B0"
                  label="이지스 클라우드 수준협약(SLA)에 동의 합니다."
                  hide-details
                />
                <v-checkbox
                  v-model="agreeCheckValue"
                  class="mb-2"
                  color="#2371B0"
                  label="개인정보 수집 및 이용에 동의 합니다."
                  hide-details
                />
                <div class="account-link">
                  이미 계정이 있으신가요?
                  <v-btn variant="text" class="text-btn" color="#2371B0" @click="joinDialog = false; loginDialog = true">
                    로그인
                  </v-btn>
                </div>
              </div>

              <v-card-actions class="action-container">
                <v-btn class="action-btn primary-btn" color="#2371B0" @click="joinDialog = false">
                  회원가입
                </v-btn>
                <v-btn class="action-btn" variant="outlined" @click="joinDialog = false">
                  닫기
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- 회원가입 창 끝 -->
          
          <v-btn
            class="action-btn ml-2"
            variant="text"
            color="#FFFFFF"
          >
            공지사항
          </v-btn>

          <v-btn
            class="action-btn ml-2"
            variant="text"
            color="#FFFFFF"
          >
            고객 센터
          </v-btn>
          
          <v-menu transition="scale-transition">
            <template v-slot:activator="{ props }">
              <v-btn 
                class="language-btn ml-2"
                variant="text"
                color="white"
                v-bind="props"
              >
              <v-icon class="lang-icon" color="white">
                mdi-language
              </v-icon>
              언어
              <v-icon class="chevron-icon" color="white">
                mdi-chevron-down
              </v-icon>
              </v-btn>
            </template>
            <v-list class="language-menu">
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                :value="index"
                @click="changeLanguage(item.code)"
                class="language-item"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <!-- 모바일/태블릿 메뉴 버튼 -->
        <div class="mobile-menu-button" v-if="isTablet || isMobile">
          <v-btn icon @click="menuOpen = !menuOpen" class="menu-toggle-btn">
            <v-icon size="28" color="white">mdi-menu</v-icon>
          </v-btn>
        </div>
      </div>
    </v-app-bar>

    <!-- ✅ 태블릿 메뉴 (드롭다운) -->
    <v-navigation-drawer
      v-model="menuOpen"
      location="right"
      temporary
      width="280"
      class="sidebar-menu"
      v-if="isTablet && menuOpen"
    >
      <v-list class="pa-4">
        <v-list-item class="menu-header">
          <v-list-item-title class="text-h6 mb-4">메뉴</v-list-item-title>
          <v-btn icon class="close-btn" @click="menuOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-list-item>
        <v-divider class="mb-4"></v-divider>
        <v-list-item>
          <v-btn block class="sidebar-btn mb-2" color="#2371B0" variant="elevated" @click="loginDialog = true, joinDialog = false, pwDialog = false; menuOpen = false">
            로그인
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn block class="sidebar-btn mb-2" variant="outlined" @click="joinDialog = true, loginDialog = false, pwDialog = false; menuOpen = false">
            회원가입
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn block class="sidebar-btn mb-2" variant="text">
            공지사항
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn block class="sidebar-btn mb-2" variant="text">
            고객 센터
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn block variant="text" class="language-select mb-2">
            <v-icon left>mdi-language</v-icon>
            언어 선택
          </v-btn>
          <div class="language-options pa-2">
            <v-btn 
              v-for="(item, index) in items" 
              :key="index"
              variant="text"
              block
              class="mb-1"
              @click="changeLanguage(item.code)"
            >
              {{ item.title }}
            </v-btn>
          </div>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- ✅ 모바일 메뉴 (드롭다운) -->
    <v-navigation-drawer
      v-model="menuOpen"
      location="right"
      temporary
      width="280"
      class="sidebar-menu"
      v-if="isMobile && menuOpen"
    >
      <v-list class="pa-4">
        <v-list-item class="menu-header">
          <v-list-item-title class="text-h6 mb-4">메뉴</v-list-item-title>
          <v-btn icon class="close-btn" @click="menuOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-list-item>
        <v-divider class="mb-4"></v-divider>
        <v-list-item class="menu-item" :class="{ 'active-item': !isMarketPlaceActive && !isGuideActive && !isPlatformActive }">
          <a href="#" @click.prevent="goHome; menuOpen = false">HOME</a>
        </v-list-item>
        <v-list-item class="menu-item" :class="{ 'active-item': isPlatformActive }">
          <a href="#" @click.prevent="scrollToPlatformSection; menuOpen = false">플랫폼 소개</a>
        </v-list-item>
        <v-list-item class="menu-item">
          <a href="#">주요기능</a>
        </v-list-item>
        <v-list-item class="menu-item" :class="{ 'active-item': isMarketPlaceActive }">
          <a href="#" @click.prevent="toggleMarketPlace; menuOpen = false">Market Place</a>
        </v-list-item>
        <v-list-item class="menu-item" :class="{ 'active-item': isGuideActive }">
          <a href="#" @click.prevent="toggleGuide; menuOpen = false">가이드</a>
        </v-list-item>
        <v-divider class="my-4"></v-divider>
        <v-list-item>
          <v-btn block class="sidebar-btn mb-2" color="#2371B0" variant="elevated" @click="loginDialog = true, joinDialog = false, pwDialog = false; menuOpen = false">
            로그인
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn block class="sidebar-btn mb-2" variant="outlined" @click="joinDialog = true, loginDialog = false, pwDialog = false; menuOpen = false">
            회원가입
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn block class="sidebar-btn mb-2" variant="text">
            공지사항
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn block class="sidebar-btn mb-2" variant="text">
            고객 센터
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn block variant="text" class="language-select mb-2">
            <v-icon left>mdi-language</v-icon>
            언어 선택
          </v-btn>
          <div class="language-options pa-2">
            <v-btn 
              v-for="(item, index) in items" 
              :key="index"
              variant="text"
              block
              class="mb-1"
              @click="changeLanguage(item.code)"
            >
              {{ item.title }}
            </v-btn>
          </div>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </header>
  </ClientOnly>
</template>

<style scoped>
/* ✅ 헤더 전체 스타일 */
.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  padding: 0;
}

/* 네비게이션 바 스타일 */
.navbar {
  background: rgba(0, 0, 0, 0.5) !important;
  backdrop-filter: blur(10px) !important;
  box-shadow: none !important;
  transition: all 0.3s ease;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  margin-top:10px;
}

/* 로고 스타일 */
.logo-container {
  flex: 1;
}

.logo {
  width: 150px;
  height: auto;
  max-width: 100%;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

/* 메뉴 스타일 */
.menu-container {
  flex: 2;
  display: flex;
  justify-content: end;
}

.nav {
  list-style: none;
  display: flex;
  gap: 30px;
  padding: 0;
  margin: 0;
}

.nav li {
  display: inline;
}

.nav a {
  color: white;
  text-decoration: none;
  font-size: 16px;
  padding: 10px 0;
  position: relative;
  transition: all 0.3s ease;
}

.nav a:hover {
  color: rgba(255, 255, 255, 0.8);
}

.nav a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: white;
  transition: width 0.3s ease;
}

.nav a:hover::after {
  width: 100%;
}

.nav a.active {
  font-weight: bold;
}

.nav a.active::after {
  width: 100%;
}

/* 액션 버튼 스타일 */
.actions-container {
  flex: 2;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.action-btn {
  text-transform: none;
  letter-spacing: 0.5px;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.action-btn:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

.ml-2 {
  margin-left: 8px;
}

.primary-btn {
  color: white !important;
}

/* 다이얼로그 스타일 */
.dialog-card {
  border-radius: 12px;
  overflow: hidden;
}

.dialog-title {
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  padding: 24px 0 16px;
  background-color: #f8f9fa;
  color: #2371B0;
}

.login-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px 16px;
}

.input-container {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.custom-label {
  min-width: 100px;
  font-size: 15px;
  font-weight: 500;
  color: #333;
}

.input {
  flex: 1;
}

.helper-text {
  font-size: 13px;
  color: #777;
  margin-top: 4px;
}

.password-hint {
  margin-left: 116px;
}

.checkbox-container {
  padding: 0 24px 16px;
}

.account-link {
  margin-top: 16px;
  font-size: 14px;
  color: #666;
}

.text-btn {
  margin-left: 8px;
  text-transform: none;
  font-weight: 500;
}

.action-container {
  padding: 16px 24px 24px;
  display: flex;
  justify-content: center;
  gap: 16px;
}

/* 언어 선택 메뉴 */
.language-btn {
  display: flex;
  align-items: center;
  gap: 4px;
}

.lang-icon, .chevron-icon {
  margin-right: 4px;
}

.language-menu {
  border-radius: 8px;
}

.language-item {
  min-height: 40px;
}

/* 모바일 메뉴 버튼 */
.mobile-menu-button {
  display: flex;
  align-items: center;
}

.menu-toggle-btn {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

/* 사이드바 메뉴 */
.sidebar-menu {
  background: white;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  margin-right: -8px;
}

.menu-item {
  padding: 12px 16px;
  margin-bottom: 4px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.menu-item:hover {
  background-color: rgba(35, 113, 176, 0.05);
}

.menu-item a {
  color: #333;
  text-decoration: none;
  font-size: 16px;
  display: block;
}

.active-item {
  background-color: rgba(35, 113, 176, 0.1);
}

.active-item a {
  color: #2371B0;
  font-weight: bold;
}

.sidebar-btn {
  width: 100%;
  text-transform: none;
  letter-spacing: 0.5px;
}

.language-select {
  text-align: left;
  justify-content: flex-start;
}

.language-options {
  margin-top: 8px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

/* 스켈레톤 헤더 (로딩 중) */
.skeleton-header {
  position: absolute;
  top: 0;
  width: 100%;
  height: 80px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  animation: fade-in 0.3s ease-out;
}

.skeleton-left {
  flex: 1;
  display: flex;
  align-items: center;
}

.skeleton-logo {
  width: 150px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  animation: skeleton-loading 1.5s infinite alternate;
}

.skeleton-center {
  flex: 2;
  display: flex;
  justify-content: center;
  gap: 30px;
}

.skeleton-menu {
  width: 80px;
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  animation: skeleton-loading 1.5s infinite alternate;
}

.skeleton-right {
  flex: 2;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}

/* 애니메이션 */
@keyframes skeleton-loading {
  from {
    opacity: 0.6;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1200px) {
  .nav {
    gap: 20px;
  }
  
  .action-btn {
    font-size: 14px;
  }
}

@media (max-width: 600px) {
  .header-container {
    padding: 0 16px;
  }
  
  .logo {
    width: 120px;
  }
}
</style>
