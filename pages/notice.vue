<template>
    <div>
        <Header />
        <div class="notice-page">
            <h1>공지사항</h1>
            <NoticeList />
        </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import Header from '~/components/main/Header.vue'
  import NoticeList from '~/components/notice/NoticeList.vue'
  </script>
  
  <style scoped>
  .notice-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
  .notice-list {
    list-style: none;
    padding: 0;
  }
  .notice-item {
    display: block;
    padding: 1rem;
    border-bottom: 1px solid #ddd;
    color: #2371B0;
    text-decoration: none;
  }
  .notice-item:hover {
    background: #f7f7f7;
  }
  </style>
  