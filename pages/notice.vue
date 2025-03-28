<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">공지사항</h1>
      <NoticeList :notices="notices" />
    </div>
  </template>
  
  <script setup>
  import NoticeList from '@/components/notice/NoticeList.vue'
  
  // 임시 데이터 (나중에 API로 대체 가능)
  const notices = [
    { id: 1, title: '시스템 점검 안내', date: '2025-03-27' },
    { id: 2, title: '신규 기능 업데이트', date: '2025-03-20' },
  ]
  </script>