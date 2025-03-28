<template>
    <v-table class="notice-table">
      <thead>
        <tr>
          <th style="width: 60px;">NO</th>
          <th>제목</th>
          <th style="width: 120px;">등록일</th>
          <th style="width: 80px;">조회</th>
        </tr>
      </thead>
      <tbody>
        <!-- 나중에 v-for 돌릴 자리 -->
        <tr>
          <td colspan="4" style="text-align: center; color: #888;">
            공지사항을 불러오는 중입니다...
          </td>
        </tr>
      </tbody>
    </v-table>
  </template>
  
  <script setup lang="ts">
  // 여기서는 API 호출 없이 UI만 구성
  // 추후에 useFetch 또는 axios로 API 연결 예정
  </script>
  
  <style scoped>
  .notice-table {
    width: 100%;
    border: 1px solid #ddd;
    border-collapse: collapse;
    font-size: 14px;
  }
  .notice-table th,
  .notice-table td {
    padding: 0.75rem;
    border: 1px solid #ddd;
    text-align: left;
  }
  .notice-table th {
    background-color: #f7f7f7;
    font-weight: bold;
  }
  </style>
  