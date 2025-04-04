<template>
  <ClientOnly>
    <v-footer class="custom-footer" color="grey-darken-4">
      <v-container class="custom-container">
        <!-- 상단 정보 영역: 세 개의 컬럼으로 구성 -->
        <v-row dense class="container">
          <!-- 1. 로고 & 사업자 등록 정보 영역 -->
          <v-col cols="12" md="4" class="text-left">
            <div class="left-col-container">
              <img
                src="/image/footer/footer_logo_img.png" 
                alt="EGIS Logo"
                height="30px"
              />
              <!-- 로고 하단에 사업자 등록 정보 추가 -->
              <div class="info-group">
                <div class="info-row">
                  <div class="info-label-long"><strong>사업자등록번호</strong></div>
                  <div class="info-text">503-81-49156</div>
                </div>
                <div class="info-row">
                  <div class="info-label-long"><strong>통신판매업신고</strong></div>
                  <div class="info-text">제 2016-대구남구-0324 호</div>
                </div>
              </div>
            </div>
          </v-col>

          <!-- 2. 주소 및 연락처 영역 (수직 space-between 적용) -->
          <v-col cols="12" md="6" class="text-left">
            <div class="middle-col-container">
              <!-- 주소 영역 -->
              <div class="info-group">
                <div class="info-row">
                  <div class="info-label"><strong>대구</strong></div>
                  <div class="info-text">대구광역시 수성구 알파시티1로 31길 2, 4층</div>
                </div>
                <div class="info-row">
                  <div class="info-label"><strong>서울</strong></div>
                  <div class="info-text">서울특별시 구로구 디지털로26길 111 (제이앤케이디지털타워) 1501호</div>
                </div>
              </div>
              <!-- 연락처 영역 -->
              <div class="info-group">
                <div class="info-row">
                  <div class="info-label"><strong>Tel</strong></div>
                  <div class="info-text">053.476.2395 / 053.576.2395</div>
                </div>
                <div class="info-row">
                  <div class="info-label"><strong>Fax</strong></div>
                  <div class="info-text">053.474.2396 / 053.574.2396</div>
                </div>
              </div>
            </div>
          </v-col>

          <!-- 3. CSAP 인증 로고 영역 -->
          <v-col cols="12" md="2" class="csap-logo-col d-flex align-center justify-center">
            <a href="https://isms.kisa.or.kr/main/csap/intro/index.jsp" target="_blank">
              <img
                src="/image/footer/csap-badge.png"
                alt="CSAP 인증"
                height="60px"
              />
  </a>
          </v-col>
        </v-row>

        <v-divider color="grey-lighten-1"></v-divider>

        <!-- 하단 링크 및 저작권 -->
        <v-row align="center" justify="space-between">
          <v-col cols="12" md="6" class="text-left">
            <v-btn variant="text">개인정보정책</v-btn>
            <v-btn variant="text">이용약관</v-btn>
            <v-btn variant="text">서비스수준협약</v-btn>
          </v-col>
          <v-col cols="12" md="6" class="text-right">
            © 2023 copyright EGIS
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </ClientOnly>
</template>

<script setup lang="ts">
</script>

<style scoped>
.custom-footer {
  height: 200px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-size: 12px;
}

.custom-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.left-col-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.left-col-container img {
  align-self: flex-start;
  width: auto;
  height: 30px;
}

.middle-col-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.info-group {
  margin: 10px 0;
}

.info-row {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.info-label {
  width: 35px;
}

.info-label-long {
  width: 90px;
}

.info-text {
  flex: 1;
}

/* 반응형 조정 */
@media (max-width: 600px) {
  .custom-footer {
    height: auto; /* 모바일에서는 높이를 내용에 맞게 */
    padding: 20px 0;
  }
  /* 모바일에서는 내부 컨테이너의 flex 방향을 column으로 변경해서 수직 배치를 기본으로 할 수 있습니다. */
  .left-col-container,
  .middle-col-container {
    flex-direction: column;
    justify-content: flex-start;
  }
  /* 필요에 따라 폰트 사이즈나 간격 조정 */
  .info-group {
    margin: 5px 0;
  }
  .csap-logo-col {
    justify-content: flex-end !important;
  }  
}
</style>
