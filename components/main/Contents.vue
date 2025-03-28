<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
import { onMounted, ref } from 'vue';

const authStore = useAuthStore();
const isLoaded = ref(false);
const isTitleVisible = ref(false);
const isSubtitleVisible = ref(false);
const isButtonVisible = ref(false);

// 애니메이션 순차적으로 표시
onMounted(() => {
  // 로딩 완료 표시
  isLoaded.value = true;
  
  // 순차적으로 요소들 표시
  setTimeout(() => {
    isSubtitleVisible.value = true;
  }, 500);
  
  setTimeout(() => {
    isTitleVisible.value = true;
  }, 1000);
  
  setTimeout(() => {
    isButtonVisible.value = true;
  }, 1800);
});
</script>

<template>
    <div class="main-content">
        <!-- 배경 비디오 (항상 재생됨) -->
        <video class="background-video" playsinline loop muted preload="auto" autoplay>
            <source src="/image/main/video.mp4" type="video/mp4">
        </video>

        <!-- 오버레이 이미지 (비디오 위) -->
        <div class="overlay-wrapper">
            <v-img class="overlay-image" src="/image/main/img.png" cover></v-img>
            <div class="overlay-gradient"></div>
        </div>

        <!-- 타이틀 & 소개 -->
        <div class="content" :class="{ 'content-loaded': isLoaded }">
            <span class="content-sub" :class="{ 'visible': isSubtitleVisible }">
                3차원 공간정보 디지털트윈 전문기업, (주)이지스
            </span>
            <div class="title-container" :class="{ 'visible': isTitleVisible }">
                <span class="content-title">DIGITAL TWIN CLOUD</span>
                <span class="content-title">with <span class="highlight-text">EGIS</span></span>
            </div>
        </div>

        <!-- 바로가기 버튼 -->
        <div class="goMapBtn" :class="{ 'visible': isButtonVisible }">
          <v-btn v-if="authStore.accessToken" 
                 color="blue-darken-1" 
                 href="/map/"
                 class="map-button">
            <span>Click!</span>
            <span class="button-text">DIGITAL TWIN 바로가기</span>
          </v-btn>
        </div>
    </div>
</template>

<style scoped>
/* 메인 콘텐츠 컨테이너 */
.main-content {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 🎥 배경 비디오 (항상 재생됨) */
.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.05); /* 살짝 확대해서 경계선이 안 보이게 */
}

/* 오버레이 래퍼 (이미지 + 그라데이션) */
.overlay-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

/* 🖼️ 오버레이 이미지 (비디오 위) */
.overlay-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 그라데이션 오버레이 (이미지 위) */
.overlay-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%);
  z-index: 1;
}

/* 🏷️ 타이틀 & 설명 */
.content {
  position: relative;
  display: flex;
  flex-direction: column;  /* ✅ 세로 정렬 */
  align-items: flex-end;   /* ✅ 우측 정렬 */
  text-align: right;
  color: white;
  padding: 0 10%;
  margin-right: 5%;
  z-index: 2;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  top: -190px;
  left: 450px;
}

.content-loaded {
  opacity: 1;
  transform: translateY(0);
}

.title-container {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.title-container.visible {
  opacity: 1;
  transform: translateY(0);
}

.content-title {
  font-size: 5rem;   /* ✅ 크기 조정 */
  font-weight: 800;
  line-height: 1.2;
  text-shadow: 0 2px 5px rgba(0,0,0,0.5);
  display: block;
}

.content-sub {
  font-size: 1.5rem;
  opacity: 0;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.content-sub.visible {
  opacity: 0.9;
  transform: translateY(0);
}

.highlight-text {
  color: #4ADEDE;
  position: relative;
  display: inline-block;
}

/* 맵 이동 버튼 */
.goMapBtn {
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%) translateY(30px);
  z-index: 2;
  opacity: 0;
  transition: opacity 1s ease, transform 1s ease;
}

.goMapBtn.visible {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.map-button {
  padding: 12px 30px !important;
  border-radius: 50px !important;
  font-weight: 500 !important;
  letter-spacing: 0.5px;
  font-size: 1.1rem !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25) !important;
  transition: all 0.3s ease !important;
}

.map-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 7px 25px rgba(0, 0, 0, 0.3) !important;
}

.button-text {
  position: relative;
  z-index: 1;
}

.ml-2 {
  margin-left: 8px;
}

/* 반응형 스타일 */
@media (max-width: 1200px) {
  .content-title {
    font-size: 4rem;
  }
  
  .content-sub {
    font-size: 1.3rem;
  }
}

@media (max-width: 768px) {
  .content {
    align-items: center;
    text-align: center;
    margin-right: 0;
    padding: 0 20px;
  }
  
  .content-title {
    font-size: 3rem;
  }
  
  .content-sub {
    font-size: 1.1rem;
  }
  
  .goMapBtn {
    bottom: 15%;
  }
}

@media (max-width: 480px) {
  .content-title {
    font-size: 2.5rem;
  }
  
  .content-sub {
    font-size: 1rem;
  }
  
  .map-button {
    padding: 10px 20px !important;
    font-size: 1rem !important;
  }
}


/* 12 */
.map-button{
  position: relative;
  right: 20px;
  bottom: 20px;
  border:none;
  box-shadow: none;
  width: 0px;
  height: 0px;
  line-height: 50px;
  -webkit-perspective: 230px;
  perspective: 230px;
}
.map-button span {
  background: rgb(0,172,238);
background: linear-gradient(0deg, rgba(0,172,238,1) 0%, rgba(2,126,251,1) 100%);
  display: block;
  position: absolute;
  width: 230px;
  height: 50px;
  box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
  border-radius: 5px;
  margin:0;
  text-align: center;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all .3s;
  transition: all .3s;
}
.map-button span:nth-child(1) {
  box-shadow:
   -7px -7px 20px 0px #fff9,
   -4px -4px 5px 0px #fff9,
   7px 7px 20px 0px #0002,
   4px 4px 5px 0px #0001;
  -webkit-transform: rotateX(90deg);
  -moz-transform: rotateX(90deg);
  transform: rotateX(90deg);
  -webkit-transform-origin: 50% 50% -20px;
  -moz-transform-origin: 50% 50% -20px;
  transform-origin: 50% 50% -20px;
}
.map-button span:nth-child(2) {
  -webkit-transform: rotateX(0deg);
  -moz-transform: rotateX(0deg);
  transform: rotateX(0deg);
  -webkit-transform-origin: 50% 50% -20px;
  -moz-transform-origin: 50% 50% -20px;
  transform-origin: 50% 50% -20px;
}
.map-button:hover span:nth-child(1) {
  box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
  -webkit-transform: rotateX(0deg);
  -moz-transform: rotateX(0deg);
  transform: rotateX(0deg);
}
.map-button:hover span:nth-child(2) {
  box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
 color: transparent;
  -webkit-transform: rotateX(-90deg);
  -moz-transform: rotateX(-90deg);
  transform: rotateX(-90deg);
}

</style>