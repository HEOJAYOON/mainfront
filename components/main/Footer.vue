<template>
  <v-footer align="center">
    <v-row class="footer-container" align="center" justify="center">
      <v-col cols="12" md="3" class="footer-logo">
        <img src="/image/footer/footer-logo-img.png" alt="EGIS Logo" height="50" />
        <div>사업자등록번호 : 503-81-49156</div>
        <div>통신판매업신고 : 제 2016-대구남구-0324호</div>
      </v-col>

      <v-col cols="12" md="5" class="footer-contact">
        <div><strong>Our Contacts</strong></div>
        <div><strong>ADDRESS:</strong> 대구광역시 수성구 알파시티로 31길 2, 4층</div>
        <div>서울 서울특별시 구로구 디지털로26길 111 (구로동, 제이엘케이미디어타워) 1501호</div>
      </v-col>

      <v-col cols="12" md="4" class="footer-tel-fax">
        <div><strong>TEL & FAX</strong></div>
        <div>T 053.476.2395 F 053.474.2396</div>
        <div>T 053.576.2395 F 053.574.2396</div>
      </v-col>

      <v-col cols="12" class="footer-bottom text-center">
        <div>
          <a href="/privacy-policy" aria-label="Privacy Policy">개인정보보호정책</a> | 
          <a href="/terms-of-use" aria-label="Terms of Use">이용약관</a>
        </div>
        <div>© 2023 copyright EGIS</div>
      </v-col>
    </v-row>
  </v-footer>
</template>


<style scoped>
.footer-container {
  background-color: #3B3B3B;
  color: white;
  display: flex;
  justify-content: space-between; /* 양옆으로 요소들 배치 */
  padding: 0 20px; /* 좌우 여백 20px */
}

.footer-logo, .footer-contact, .footer-tel-fax {
  text-align: left;
  font-size: 0.75em;
}

.footer-logo img {
  margin-bottom: 10px;
}

.footer-contact, .footer-tel-fax {
  margin-top: 10px;
}

.footer-bottom {
  margin-top: 10px;
  font-size: 0.75em;
  text-align: center;
}

.footer-bottom a {
  color: white;
  text-decoration: none;
  margin: 0 10px;
  font-size: 0.75em;
}

.footer-bottom a:hover {
  text-decoration: underline;
}



</style>
