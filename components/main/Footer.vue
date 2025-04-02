<template>
  <v-footer class="pa-10" color="grey-darken-4">
    <v-container>
      <!-- 상단 정보 영역 -->
      <v-row class="mb-6" dense>
        <v-col cols="12" md="4">
          <div class="text-h6 font-weight-bold mb-2 text-white">회사 정보</div>
          <div class="text-white text-body-2">
            사업자등록번호 : 503-81-49156<br />
            통신판매업신고 : 제 2016-대구남구-0324 호
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="text-h6 font-weight-bold mb-2 text-white">Our Contacts</div>
          <div class="text-white text-body-2">
            <strong>대구</strong><br />
            대구광역시 수성구 알파시티1로 31길 2, 4층<br /><br />
            <strong>서울</strong><br />
            서울특별시 구로구 디지털로26길 111 (제이앤케이디지털타워) 1501호
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="text-h6 font-weight-bold mb-2 text-white">연락처</div>
          <div class="text-white text-body-2">
            <strong>Tel</strong> : 053.476.2395 / 053.576.2395<br />
            <strong>Fax</strong> : 053.474.2396 / 053.574.2396
          </div>
        </v-col>
      </v-row>

      <v-divider class="mb-6" color="grey-lighten-1"></v-divider>

      <!-- 하단 링크 및 저작권 -->
      <v-row align="center" justify="space-between">
        <v-col cols="12" md="6" class="text-white text-body-2">
          <v-btn variant="text" class="text-white" to="/privacy">개인정보정책</v-btn>
          <v-btn variant="text" class="text-white" to="/terms">이용약관</v-btn>
        </v-col>
        <v-col cols="12" md="6" class="text-md-right text-white text-body-2">
          © 2023 copyright EGIS
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
