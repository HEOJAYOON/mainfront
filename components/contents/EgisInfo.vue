<script setup lang="ts"></script>

<template>
    <v-container>
        <v-row no-gutters>
            <v-col>
            <v-card
                variant="outlined"
                class="custom-card mx-auto"
                color="surface-variant"
                max-width="344"
            >
                <template v-slot:title>
                <div class="d-flex align-center custom-title">
                    <v-icon class="icon" color="white">mdi-layers</v-icon>
                </div>
                </template>
                <template v-slot:subtitle class="custom-subtitle">
                <span class="custom-subtitle-span">국산 3D GIS Engine</span>
                </template>
                <template v-slot:actions class="custom-actions">
                <span>20여년 간 축적된 기술과 노하우가 담긴 자사 3D GIS 엔진(XDWorld)기반 디지털트윈 플랫폼</span>
                </template>
            </v-card>
            </v-col>
            <v-col>
            <v-card
                variant="outlined"
                class="custom-card mx-auto"
                color="surface-variant"
                max-width="344"
            >
                <template v-slot:title>
                <div class="d-flex align-center custom-title">
                    <v-icon class="icon" color="white">mdi-cube-scan</v-icon>
                </div>
                </template>
                <template v-slot:subtitle class="custom-subtitle">
                <span class="custom-subtitle-span">다양한 공간정보 포맷지원</span>
                </template>
                <template v-slot:actions class="custom-actions">
                <span>ERDAS Image, glTF, GeoTiff, ECW, 3DS, CityGML, 3DTiles, CSV, LAS, BIM, OGC 표준</span>
                </template>
            </v-card>
            </v-col>
            <v-col>
            <v-card
                variant="outlined"
                class="custom-card mx-auto"
                color="surface-variant"
                max-width="344"
            >
                <template v-slot:title>
                <div class="d-flex align-center custom-title">
                    <v-icon class="icon" color="white">mdi-cog</v-icon>
                </div>
                </template>
                <template v-slot:subtitle class="custom-subtitle">
                <span class="custom-subtitle-span">개발자도구</span>
                </template>
                <template v-slot:actions class="custom-actions">
                <span>XDWorld 엔진 API 를 활용하여 자신만의 디지털트윈 앱을 개발하고 마켓 플레이스에 공유</span>
                </template>
            </v-card>
            </v-col>
            <v-col>
            <v-card
                variant="outlined"
                class="custom-card mx-auto"
                color="surface-variant"
                max-width="344"
            >
                <template v-slot:title>
                <div class="d-flex align-center custom-title">
                    <v-icon class="icon" color="white">mdi-cart</v-icon>
                </div>
                </template>
                <template v-slot:subtitle class="custom-subtitle">
                <span class="custom-subtitle-span">마켓플레이스</span>
                </template>
                <template v-slot:actions class="custom-actions">
                <span>디지털트윈 플랫폼 개발자 도구를 활용하여 개발된 다양한 애플리케이션을 구독하거나 판매</span>
                </template>
            </v-card>
            </v-col>
        </v-row>

        <v-row no-gutters>
            <v-col>
            <v-card
                variant="outlined"
                class="custom-card mx-auto"
                color="surface-variant"
                max-width="344"
            >
                <template v-slot:title>
                <div class="d-flex align-center custom-title">
                    <v-icon class="icon" color="white">mdi-map-marker</v-icon>
                </div>
                </template>
                <template v-slot:subtitle class="custom-subtitle">
                <span class="custom-subtitle-span">QGIS 플러그인 지원</span>
                </template>
                <template v-slot:actions class="custom-actions">
                <span>디지털트윈 플랫폼, QGIS 양방향 레이어 활용으로 지오프로세싱, 공간분석, 데이터 편집 활용</span>
                </template>
            </v-card>
            </v-col>
            <v-col>
            <v-card
                variant="outlined"
                class="custom-card mx-auto"
                color="surface-variant"
                max-width="344"
            >
                <template v-slot:title>
                <div class="d-flex align-center custom-title">
                    <v-icon class="icon" color="white">mdi-chart-bar</v-icon>
                </div>
                </template>
                <template v-slot:subtitle class="custom-subtitle">
                <span class="custom-subtitle-span">공간 분석 및 시각화</span>
                </template>
                <template v-slot:actions class="custom-actions">
                <span>분석 데이터의 이해력을 높이는 N차원 분석과 시각화 활용</span>
                </template>
            </v-card>
            </v-col>
            <v-col>
            <v-card
                variant="outlined"
                class="custom-card mx-auto"
                color="surface-variant"
                max-width="344"
            >
                <template v-slot:title>
                <div class="d-flex align-center custom-title">
                    <v-icon class="icon" color="white">mdi-monitor</v-icon>
                </div>
                </template>
                <template v-slot:subtitle class="custom-subtitle">
                <span class="custom-subtitle-span">IoT 활용 연계</span>
                </template>
                <template v-slot:actions class="custom-actions">
                <span>실시간으로 수집되는 대규모의 데이터를 처리하고 GIS와 연계하여 실시간 분석 및 모니터링</span>
                </template>
            </v-card>
            </v-col>
            <v-col>
            <v-card
                variant="outlined"
                class="custom-card mx-auto"
                color="surface-variant"
                max-width="344"
            >
                <template v-slot:title>
                <div class="d-flex align-center custom-title">
                    <v-icon class="icon" color="white">mdi-cloud</v-icon>
                </div>
                </template>
                <template v-slot:subtitle class="custom-subtitle">
                <span class="custom-subtitle-span">디지털트윈 SaaS 서비스</span>
                </template>
                <template v-slot:actions class="custom-actions">
                <span>국내최초 공간정보 기반 3D 디지털트윈 클라우드 SaaS 플랫폼 (CSAP 클라우드 보안인증 포함)</span>
                </template>
            </v-card>
            </v-col>
        </v-row>
        </v-container>

  </template>

<style scoped>
.custom-card {
    margin-bottom: 10%;
    height: 250px;
    border-color: #eee;
}

.custom-title {
    width: 80px;
    height: 80px;
    background-color: #2371B0;
    border-radius: 10%;
    margin-bottom: 4%;
}

.icon {
    font-size: 50px !important;
    margin-left: 15px;
    color: white;
}

.custom-subtitle {
}

.custom-subtitle-span {
    font-size: 24px;
    color: rgba(0, 0, 0, 1);
    font-weight: bolder;
}

.custom-actions {

}
</style>