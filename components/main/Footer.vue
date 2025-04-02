<template>
  <v-footer class="custom-footer pa-10" color="grey-darken-4">
    <v-container>
      <!-- 상단 정보 영역 -->
      <v-row class="mb-6" dense>
        <v-col cols="12" md="4">
          <div>
            사업자등록번호 : 503-81-49156<br />
            통신판매업신고 : 제 2016-대구남구-0324 호
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div>Our Contacts</div>
          <div>
            <strong>대구</strong>
            대구광역시 수성구 알파시티1로 31길 2, 4층<br />
            <strong>서울</strong>
            서울특별시 구로구 디지털로26길 111 (제이앤케이디지털타워) 1501호
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div>연락처</div>
          <div>
            <strong>Tel</strong> : 053.476.2395 / 053.576.2395<br />
            <strong>Fax</strong> : 053.474.2396 / 053.574.2396
          </div>
        </v-col>
      </v-row>

      <v-divider color="grey-lighten-1"></v-divider>

      <!-- 하단 링크 및 저작권 -->
      <v-row align="center" justify="space-between">
        <v-col cols="12" md="6">
          <v-btn variant="text">개인정보정책</v-btn>
          <v-btn variant="text">이용약관</v-btn>
        </v-col>
        <v-col cols="12" md="6">
          © 2023 copyright EGIS
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
// 별도의 스크립트 로직이 필요하다면 추가합니다.
</script>

<style scoped>
.custom-footer {
  height: 200px !important;
  min-height: 200px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
</style>
