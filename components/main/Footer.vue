<template>
  <v-footer align="center">
    <!-- 중앙 정렬을 위해 justify="center" 추가 -->
    <v-row class="footer-container" align="center" justify="center">
      <!-- First Column for Logo and Registration Info -->
      <v-col cols="12" md="3" class="footer-logo">
        <img src="" alt="EGIS Logo" height="50" />
        <div>사업자등록번호 : 503-81-49156</div>
        <div>통신판매업신고 : 제 2016-대구남구-0324호</div>
      </v-col>

      <!-- Second Column for Contact Information -->
      <v-col cols="12" md="5" class="footer-contact">
        <div><strong>Our Contacts</strong></div>
        <div><strong>ADDRESS:</strong> 대구광역시 수성구 알파시티로 31길 2, 4층</div>
        <div>서울 서울특별시 구로구 디지털로26길 111 (구로동, 제이엘케이미디어타워) 1501호</div>
      </v-col>

      <!-- Third Column for TEL & FAX Information -->
      <v-col cols="12" md="4" class="footer-tel-fax">
        <div><strong>TEL & FAX</strong></div>
        <div>T 053.476.2395 F 053.474.2396</div>
        <div>T 053.576.2395 F 053.574.2396</div>
      </v-col>

      <!-- Footer Bottom for Privacy and Copyright -->
      <v-col cols="12" class="footer-bottom text-center">
        <div>
          <a href="/privacy-policy">개인정보보호정책</a> | 
          <a href="/terms-of-use">이용약관</a>
        </div>
        <div>© 2023 copyright EGIS</div>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup>
import { ref } from 'vue';
</script>

<style scoped>
.footer-container {
  background-color: #333;
  color: white;
  padding: 20px 0;
}

.footer-logo, .footer-contact, .footer-tel-fax {
  text-align: left; /* 텍스트 정렬을 왼쪽으로 유지 */
}

.footer-logo img {
  margin-bottom: 10px;
}

.footer-contact, .footer-tel-fax {
  margin-top: 10px;
}


.footer-bottom {
  margin-top: 10px;
}

.footer-bottom a {
  color: white;
  text-decoration: none;
  margin: 0 5px;
}

.footer-bottom a:hover {
  text-decoration: underline;
}
</style>
