<script setup>
import Header from '@/components/main/Header.vue';
import Contents from '@/components/main/Contents.vue';

// ✅ Market Place 활성화 상태
const isMarketPlaceActive = ref(false);
const isGuideActive = ref(false);
const isPlatformActive = ref(false);

// ✅ Market Place 버튼 클릭 시 토글
const toggleMarketPlace = () => {
  isMarketPlaceActive.value = true;
  isGuideActive.value = false;
  isPlatformActive.value = false;
};

const toggleGuide = () => {
  isGuideActive.value = true;
  isMarketPlaceActive.value = false;
  isPlatformActive.value = false;
};

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

// ✅ "플랫폼 소개" 영역 감지 (스크롤하면 자동으로 active 설정)
onMounted(() => {
  const platformObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isPlatformActive.value = true;
      }
    },
    { threshold: 0.6 } // ✅ 50% 이상 보이면 감지
  );

  const homeObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isPlatformActive.value = false;
        isMarketPlaceActive.value = false;
        isGuideActive.value = false;
      }
    },
    { threshold: 0.6 } // ✅ 홈 화면이 50% 이상 보이면 감지 안됨 수정할 것!!!!!!!!!!!!!!!!!!
  );

  const platformSection = document.getElementById("platform-section");
  const homeSection = document.getElementById("home-section");

  if (platformSection) {
    platformObserver.observe(platformSection);
  }

  if (homeSection) {
    homeObserver.observe(homeSection);
  }

  onUnmounted(() => {
    if (platformSection) {
      platformObserver.unobserve(platformSection);
    }
    if (homeSection) {
      homeObserver.unobserve(homeSection);
    }
  });
});

</script>

<template>
      <v-app>
  <div class="background-container scrollable-theme">
    <!-- 헤더 컴포넌트 불러오기 -->
    <Header
    :toggleMarketPlace="toggleMarketPlace" 
    :toggleGuide="toggleGuide" 
    :goHome="goHome"
    :scrollToPlatformSection="scrollToPlatformSection"
    :isMarketPlaceActive="isMarketPlaceActive"
    :isGuideActive="isGuideActive"
    :isPlatformActive="isPlatformActive"
    />

    <div v-if="!isMarketPlaceActive && !isGuideActive" class="back-container">
      <div class="main-container">
        <Contents />
      </div>

      <!-- ✅ 플랫폼 소개 섹션들 -->
      <div class="info-container">
        <LazyAppInfo />
      </div>

      <div class="else-container">
        <LazyEgisInfo />
        <LazyPlatform id="platform-section"/>
      </div>

      <div class="function-container">
        <LazyFunction />
      </div>

      <LazyFooter class="footer-fixed" />
    </div>

    <!-- ✅ Market Place 클릭 시 해당 컴포넌트 표시 -->
    <LazyMarketPlace v-if="isMarketPlaceActive" />
    <LazyGuide v-if="isGuideActive" />
  </div>
  <NuxtPage />
</v-app>
</template>

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

.neon {
  color: #00ffcc;
  text-shadow: 0 0 10px #00ffcc;
}

.main-intro {
  font-size: 20px;
  margin-top: 10px;
  margin-top: 60vh;
}

/* 🎯 버튼 */
.main-button {
  margin-top: 20px;
  padding: 10px 20px;
  background: #00ffcc;
  color: black;
  border: none;
  font-size: 18px;
  cursor: pointer;
  transition: 0.3s;
}

.main-button:hover {
  background: #009977;
}

.info-container {
  width: 100%;
  height: 90vh; /* 화면 아래에 가득 차도록 설정 */
  background: #f4f4f4;
  display: flex;
}

/* ✅ 추가된 섹션들 */
.else-container {
  width: 100%;
  background: #ffffff;
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.function-container {
  width: 100%;
  background: #eaeaea;
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ✅ Footer를 항상 바닥에 고정 */
.footer-fixed {
  width: 100%;
  background: #333;
  color: white;
  text-align: center;
  padding: 20px 0;
  position: relative;
  bottom: 0;
}
</style>