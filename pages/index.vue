<script setup lang="ts">

definePageMeta({
  layout:'main'
})
</script>

<template>
  <ClientOnly>
    
  </ClientOnly>
</template>

<style>
html, body {
  overflow: hidden !important;
}

.scrollable-theme::-webkit-scrollbar {
  width: 3px; /* 스크롤 바 너비 */
}

.scrollable-theme::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1); /* 트랙 배경 */
  border-radius: 10px;
}

.scrollable-theme::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3); /* 스크롤 바 색상 */
  border-radius: 10px;
}

.scrollable-theme::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5); /* 마우스 호버 시 색상 변경 */
}

</style>
