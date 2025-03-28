<script setup lang="ts">
import { ref } from "vue";

const images = ref([
  "/image/main/main-cover-img-01.png",
  "/image/main/main-cover-img-02.png",
  "/image/main/main-cover-img-03.png",
]);
</script>

<template>
  <!-- ✅ 가로 전체를 채우는 슬라이더 -->
  <v-sheet class="slider-container" elevation="3">
    <v-slide-group class="pa-4" center-active show-arrows>
      <v-slide-group-item v-for="(image, index) in images" :key="index">
        <v-card class="slide-item ma-3">
          <v-img :src="image" class="slide-image"></v-img>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>
  
<style scoped>
/* ✅ 슬라이더 컨테이너 */
.slider-container {
  width: 100vw;
  height: 90vh; /* ✅ 세로도 꽉 차도록 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 0;
  overflow: hidden;
}

/* ✅ 슬라이드 아이템 */
.slide-item {
  width: 800px; /* ✅ 중앙 1개 + 양쪽 0.5개 보이도록 설정 */
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* ✅ 이미지 스타일 */
.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
